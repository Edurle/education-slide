import type { SSECallback, NodeStatus } from '../types/index.js'

export abstract class BaseAgent {
  protected sseCallback: SSECallback | null = null

  setSSECallback(callback: SSECallback) {
    this.sseCallback = callback
  }

  protected sendNodeStatus(nodeId: string, status: NodeStatus) {
    this.sseCallback?.sendNodeStatus(nodeId, status)
  }

  protected sendEdgeActivate(edgeId: string) {
    this.sseCallback?.sendEdgeActivate(edgeId)
  }

  protected sendEdgeDeactivate(edgeId: string) {
    this.sseCallback?.sendEdgeDeactivate(edgeId)
  }

  protected sendAction(action: string) {
    this.sseCallback?.sendAction(action)
  }

  protected sendResult(result: string) {
    this.sseCallback?.sendResult(result)
  }

  protected sendError(error: string) {
    this.sseCallback?.sendError(error)
  }

  abstract run(input: string): Promise<string>
}
