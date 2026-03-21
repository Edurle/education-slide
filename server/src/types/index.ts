// SSE event types
export type AgentEventType =
  | 'node_status'
  | 'edge_activate'
  | 'edge_deactivate'
  | 'action'
  | 'result'
  | 'error'

// SSE event data
export interface AgentEvent {
  type: AgentEventType
  data: {
    nodeId?: string
    status?: 'idle' | 'running' | 'done'
    edgeId?: string
    action?: string
    result?: string
    error?: string
  }
}

// Request body for /api/agent/run
export interface RunAgentRequest {
  agentType: 'qa' | 'tool'
  input: string
  sessionId?: string
}

// Node status type
export type NodeStatus = 'idle' | 'running' | 'done'

// SSE callback interface
export interface SSECallback {
  sendNodeStatus(nodeId: string, status: NodeStatus): void
  sendEdgeActivate(edgeId: string): void
  sendEdgeDeactivate(edgeId: string): void
  sendAction(action: string): void
  sendResult(result: string): void
  sendError(error: string): void
}
