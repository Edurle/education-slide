# Agent 配置指南

## AgentArchitectureConfig

```typescript
interface AgentArchitectureConfig {
  name: string                    // 架构名称
  layout?: 'horizontal' | 'vertical' | 'tree' | 'center'  // 布局方式
  components: AgentComponent[]    // 组件列表
  connections: AgentConnection[]  // 组件连接
  executionSteps?: AgentExecutionStep[]  // 执行动画序列
  defaultInput?: string           // 默认输入文本
}
```

---

## AgentComponent

### AgentComponentType

```typescript
type AgentComponentType =
  | 'input'      // 输入节点
  | 'output'     // 输出节点
  | 'llm'        // LLM 节点
  | 'tool'       // 工具节点
  | 'router'     // 路由节点
  | 'memory'     // 记忆节点
  | 'custom'     // 自定义节点
```

### AgentComponent 定义

```typescript
interface AgentComponent {
  id: string                   // 唯一标识
  type: AgentComponentType     // 组件类型
  label?: string               // 显示名称（默认使用 type）
  description?: string         // 描述信息
}
```

### 常用组件组合

#### 基础问答 Agent
```typescript
components: [
  { id: 'input', type: 'input' },
  { id: 'llm', type: 'llm' },
  { id: 'output', type: 'output' }
]
```

#### 工具调用 Agent
```typescript
components: [
  { id: 'input', type: 'input' },
  { id: 'llm', type: 'llm' },
  { id: 'tools', type: 'tool' },
  { id: 'output', type: 'output' }
]
```

#### 多工具路由 Agent
```typescript
components: [
  { id: 'input', type: 'input' },
  { id: 'router', type: 'router', label: '路由器' },
  { id: 'search', type: 'tool', label: '搜索工具' },
  { id: 'calc', type: 'tool', label: '计算工具' },
  { id: 'llm', type: 'llm' },
  { id: 'output', type: 'output' }
]
```

#### 带记忆的 Agent
```typescript
components: [
  { id: 'input', type: 'input' },
  { id: 'memory', type: 'memory', label: '记忆' },
  { id: 'llm', type: 'llm' },
  { id: 'output', type: 'output' }
]
```

---

## AgentConnection

```typescript
interface AgentConnection {
  from: string              // 源组件 ID
  to: string                // 目标组件 ID
  label?: string            // 连接标签
  bidirectional?: boolean   // 是否双向（用于工具返回）
}
```

### 连接模式

#### 单向连接
```typescript
{ from: 'input', to: 'llm', label: '问题' }
```

#### 双向连接（工具调用返回）
```typescript
{ from: 'llm', to: 'tools', label: '调用', bidirectional: true }
```

### 完整连接示例

```typescript
connections: [
  { from: 'input', to: 'llm', label: '问题' },
  { from: 'llm', to: 'tools', label: '调用' },
  { from: 'tools', to: 'llm', label: '结果', bidirectional: true },
  { from: 'llm', to: 'output', label: '回答' }
]
```

---

## AgentExecutionStep

定义动画执行序列，用于演示 Agent 工作流程。

```typescript
interface AgentExecutionStep {
  nodeId: string            // 激活的节点 ID
  action: string            // 动作描述（显示在状态栏）
  activateEdges?: string[]  // 激活的边 ID（格式：from-to）
}
```

### 边 ID 格式

边 ID 使用 `{from}-{to}` 格式：
- `{ from: 'input', to: 'llm' }` → ID 为 `'input-llm'`

### 执行步骤示例

```typescript
executionSteps: [
  { nodeId: 'input', action: '接收用户输入', activateEdges: ['input-router'] },
  { nodeId: 'router', action: '分析任务，选择工具', activateEdges: ['router-search'] },
  { nodeId: 'search', action: '执行搜索...', activateEdges: ['search-llm'] },
  { nodeId: 'llm', action: 'LLM 处理结果', activateEdges: ['llm-output'] },
  { nodeId: 'output', action: '输出最终答案' }
]
```

---

## 布局方式

| 布局 | 说明 | 适用场景 |
|------|------|---------|
| `horizontal` | 水平排列 | 线性流程 |
| `vertical` | 垂直排列 | 层级结构 |
| `tree` | 树形布局 | 多分支决策 |
| `center` | 中心辐射 | 工具围绕 LLM |

---

## 完整配置示例

### 简单问答 Agent

```typescript
{
  name: '简单问答 Agent',
  layout: 'horizontal',
  components: [
    { id: 'input', type: 'input' },
    { id: 'llm', type: 'llm' },
    { id: 'output', type: 'output' }
  ],
  connections: [
    { from: 'input', to: 'llm', label: '问题' },
    { from: 'llm', to: 'output', label: '回答' }
  ],
  executionSteps: [
    { nodeId: 'input', action: '接收问题', activateEdges: ['input-llm'] },
    { nodeId: 'llm', action: 'LLM 生成回答...', activateEdges: ['llm-output'] },
    { nodeId: 'output', action: '输出答案' }
  ],
  defaultInput: '什么是机器学习？'
}
```

### 工具调用 Agent

```typescript
{
  name: '工具调用 Agent',
  layout: 'center',
  components: [
    { id: 'input', type: 'input', label: 'Input' },
    { id: 'llm', type: 'llm', label: 'LLM' },
    { id: 'tools', type: 'tool', label: 'Tools' },
    { id: 'output', type: 'output', label: 'Output' }
  ],
  connections: [
    { from: 'input', to: 'llm', label: '问题' },
    { from: 'llm', to: 'tools', label: '调用' },
    { from: 'tools', to: 'llm', label: '结果', bidirectional: true },
    { from: 'llm', to: 'output', label: '回答' }
  ],
  defaultInput: '今天北京的天气如何？'
}
```

### 多工具协作 Agent

```typescript
{
  name: '多工具协作 Agent',
  layout: 'horizontal',
  components: [
    { id: 'input', type: 'input' },
    { id: 'router', type: 'router', label: '路由器' },
    { id: 'search', type: 'tool', label: '搜索工具' },
    { id: 'llm', type: 'llm' },
    { id: 'output', type: 'output' }
  ],
  connections: [
    { from: 'input', to: 'router' },
    { from: 'router', to: 'search', label: '搜索' },
    { from: 'search', to: 'llm', label: '结果' },
    { from: 'llm', to: 'output', label: '回答' }
  ],
  executionSteps: [
    { nodeId: 'input', action: '接收用户输入', activateEdges: ['input-router'] },
    { nodeId: 'router', action: '分析任务，选择工具', activateEdges: ['router-search'] },
    { nodeId: 'search', action: '执行搜索...', activateEdges: ['search-llm'] },
    { nodeId: 'llm', action: 'LLM 处理结果', activateEdges: ['llm-output'] },
    { nodeId: 'output', action: '输出最终答案' }
  ],
  defaultInput: '帮我搜索最新的 AI 新闻'
}
```
