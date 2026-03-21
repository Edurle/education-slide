import type { NodeStatus } from '@/types'

// SSE event types
export type AgentEventType =
  | 'node_status'
  | 'edge_activate'
  | 'edge_deactivate'
  | 'action'
  | 'result'
  | 'error'

export interface AgentEvent {
  type: AgentEventType
  data: {
    nodeId?: string
    status?: NodeStatus
    edgeId?: string
    action?: string
    result?: string
    error?: string
  }
}

export interface RunAgentOptions {
  agentType: 'qa' | 'tool'
  input: string
  onNodeStatus?: (nodeId: string, status: NodeStatus) => void
  onEdgeActivate?: (edgeId: string) => void
  onEdgeDeactivate?: (edgeId: string) => void
  onAction?: (action: string) => void
  onResult?: (result: string) => void
  onError?: (error: string) => void
  onComplete?: () => void
}

// API base URL (uses Vite proxy in development)
const API_BASE = '/api'

/**
 * Run an agent with SSE event streaming
 */
export async function runAgent(options: RunAgentOptions): Promise<void> {
  const {
    agentType,
    input,
    onNodeStatus,
    onEdgeActivate,
    onEdgeDeactivate,
    onAction,
    onResult,
    onError,
    onComplete
  } = options

  // Use fetch with POST to initiate the request
  // Then use EventSource-like parsing for the response
  const response = await fetch(`${API_BASE}/agent/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ agentType, input })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
    onError?.(errorData.error || `HTTP ${response.status}`)
    return
  }

  if (!response.body) {
    onError?.('No response body')
    return
  }

  // Parse SSE stream
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })

      // Process complete SSE events
      const events = buffer.split('\n\n')
      buffer = events.pop() || '' // Keep incomplete event in buffer

      let currentEventType: AgentEventType | null = null

      for (const eventStr of events) {
        const lines = eventStr.split('\n')

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEventType = line.slice(7) as AgentEventType
          } else if (line.startsWith('data: ') && currentEventType) {
            try {
              const data = JSON.parse(line.slice(6))
              handleEvent(currentEventType, data, {
                onNodeStatus,
                onEdgeActivate,
                onEdgeDeactivate,
                onAction,
                onResult,
                onError
              })
            } catch (e) {
              console.error('Failed to parse SSE data:', line, e)
            }
          }
        }
      }
    }

    onComplete?.()
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    onError?.(errorMsg)
  }
}

function handleEvent(
  type: AgentEventType,
  data: AgentEvent['data'],
  handlers: {
    onNodeStatus?: (nodeId: string, status: NodeStatus) => void
    onEdgeActivate?: (edgeId: string) => void
    onEdgeDeactivate?: (edgeId: string) => void
    onAction?: (action: string) => void
    onResult?: (result: string) => void
    onError?: (error: string) => void
  }
) {
  switch (type) {
    case 'node_status':
      if (data.nodeId && data.status) {
        handlers.onNodeStatus?.(data.nodeId, data.status)
      }
      break
    case 'edge_activate':
      if (data.edgeId) {
        handlers.onEdgeActivate?.(data.edgeId)
      }
      break
    case 'edge_deactivate':
      if (data.edgeId) {
        handlers.onEdgeDeactivate?.(data.edgeId)
      }
      break
    case 'action':
      if (data.action) {
        handlers.onAction?.(data.action)
      }
      break
    case 'result':
      if (data.result) {
        handlers.onResult?.(data.result)
      }
      break
    case 'error':
      if (data.error) {
        handlers.onError?.(data.error)
      }
      break
  }
}

/**
 * Fetch available tools
 */
export async function getTools(): Promise<{ name: string; description: string }[]> {
  const response = await fetch(`${API_BASE}/agent/tools`)
  if (!response.ok) {
    throw new Error(`Failed to fetch tools: ${response.status}`)
  }
  const data = await response.json()
  return data.tools
}
