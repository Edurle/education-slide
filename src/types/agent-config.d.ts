/** Agent 组件类型 */
export type AgentComponentType =
  | 'input'      // 输入节点
  | 'output'     // 输出节点
  | 'llm'        // LLM 节点
  | 'tool'       // 工具节点
  | 'router'     // 路由节点
  | 'memory'     // 记忆节点
  | 'custom'     // 自定义节点

/** Agent 组件定义 */
export interface AgentComponent {
  id: string
  type: AgentComponentType
  label?: string           // 显示名称，默认使用 type
  description?: string     // 描述信息
}

/** 组件间的连接 */
export interface AgentConnection {
  from: string             // 源组件 ID
  to: string               // 目标组件 ID
  label?: string           // 连接标签
  bidirectional?: boolean  // 是否双向（用于工具调用返回）
}

/** 执行步骤 - 定义动画序列 */
export interface AgentExecutionStep {
  nodeId: string           // 激活的节点 ID
  action: string           // 动作描述（显示在状态栏）
  activateEdges?: string[] // 激活的边 ID（from-to 格式）
}

/** Agent 架构配置 */
export interface AgentArchitectureConfig {
  /** 架构名称 */
  name: string
  /** 布局方式 */
  layout?: 'horizontal' | 'vertical' | 'tree' | 'center'
  /** 组件列表 */
  components: AgentComponent[]
  /** 组件连接 */
  connections: AgentConnection[]
  /** 执行步骤序列（用于演示动画） */
  executionSteps?: AgentExecutionStep[]
  /** 默认输入 */
  defaultInput?: string
}
