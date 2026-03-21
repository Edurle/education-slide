import { Router, type Request, type Response } from 'express'
import type { AgentEvent, RunAgentRequest } from '../types/index.js'
import { QAAgent } from '../agents/QAAgent.js'
import { ToolAgent } from '../agents/ToolAgent.js'

export const agentRouter = Router()

// POST /api/agent/run - SSE endpoint for running agents
agentRouter.post('/run', async (req: Request, res: Response) => {
  const { agentType, input } = req.body as RunAgentRequest

  if (!agentType || !input) {
    res.status(400).json({ error: 'Missing agentType or input' })
    return
  }

  if (agentType !== 'qa' && agentType !== 'tool') {
    res.status(400).json({ error: 'Invalid agentType. Must be "qa" or "tool"' })
    return
  }

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no') // Disable nginx buffering

  // Helper to send SSE events
  const sendEvent = (event: AgentEvent) => {
    res.write(`event: ${event.type}\n`)
    res.write(`data: ${JSON.stringify(event.data)}\n\n`)
  }

  // Create SSE callback
  const sseCallback = {
    sendNodeStatus: (nodeId: string, status: 'idle' | 'running' | 'done') => {
      sendEvent({ type: 'node_status', data: { nodeId, status } })
    },
    sendEdgeActivate: (edgeId: string) => {
      sendEvent({ type: 'edge_activate', data: { edgeId } })
    },
    sendEdgeDeactivate: (edgeId: string) => {
      sendEvent({ type: 'edge_deactivate', data: { edgeId } })
    },
    sendAction: (action: string) => {
      sendEvent({ type: 'action', data: { action } })
    },
    sendResult: (result: string) => {
      sendEvent({ type: 'result', data: { result } })
    },
    sendError: (error: string) => {
      sendEvent({ type: 'error', data: { error } })
    }
  }

  // Create agent based on type
  const agent = agentType === 'qa' ? new QAAgent() : new ToolAgent()
  agent.setSSECallback(sseCallback)

  // Handle client disconnect
  req.on('close', () => {
    console.log('Client disconnected')
  })

  try {
    await agent.run(input)
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error'
    sendEvent({ type: 'error', data: { error: errorMsg } })
  } finally {
    res.end()
  }
})

// GET /api/agent/tools - List available tools
agentRouter.get('/tools', (_req: Request, res: Response) => {
  res.json({
    tools: [
      { name: 'get_weather', description: '获取指定城市的天气信息' },
      { name: 'calculate', description: '执行数学计算' },
      { name: 'search', description: '搜索信息' }
    ]
  })
})
