// Global type declarations

// 布局类型
export type LayoutType = 'vertical' | 'horizontal' | 'split-right'

export interface AgentCallback {
  handleAgentAction?(action: string): void
  handleAgentEnd?(result: string): void
}

export interface DiagramNode {
  id: string
  label: string
  x: number
  y: number
  status: 'idle' | 'running' | 'done'
}

export type LineType = 'straight' | 'polyline' | 'curve'

export interface DiagramEdge {
  id?: string  // 可选的边 ID，用于精确控制
  from: string
  to: string
  label?: string
  lineType?: LineType
}

// Slide 内容类型定义
export interface MarkdownItem {
  type: 'markdown'
  content: string
}

export interface DiagramItem {
  type: 'diagram'
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}

export interface AgentItem {
  type: 'agent'
  agentType: 'qa' | 'tool'
  input?: string
}

export type SlideItem = MarkdownItem | DiagramItem | AgentItem

export interface SlideContent {
  layout?: LayoutType  // 默认 'vertical'
  items: SlideItem[]
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
