# Slide 类型参考

## 核心类型定义

### SlideContent

```typescript
interface SlideContent {
  title?: string           // 可选：幻灯片标题
  layout?: LayoutType      // 布局方式，默认 'vertical'
  items: SlideItem[]       // 内容项数组
}
```

### LayoutType

```typescript
type LayoutType = 'vertical' | 'horizontal' | 'split-right'
```

| 值 | 说明 | 适用场景 |
|---|------|---------|
| `vertical` | 垂直排列，从上到下 | 大部分情况（默认） |
| `horizontal` | 水平排列，从左到右 | 并排比较内容 |
| `split-right` | 左侧内容，右侧图表 | 图文并排 |

### SlideItem

```typescript
type SlideItem = MarkdownItem | DiagramItem | ConfigurableAgentItem | SvgItem
```

---

## MarkdownItem

纯文本内容，支持 Markdown、LaTeX 公式、代码高亮。

```typescript
interface MarkdownItem {
  type: 'markdown'
  content: string
}
```

### content 支持的语法

- **Markdown**：标题、列表、粗体、斜体、链接
- **LaTeX 公式**：行内 `$公式$`，块级 `$$公式$$`
- **代码块**：使用 ```language 语法

### 示例

```typescript
{
  type: 'markdown',
  content: `# 什么是 Agent？

## 定义

Agent 是一个能够**感知环境**并**采取行动**的系统。

核心特征：
- 自主性 (Autonomy)
- 反应性 (Reactivity)

## 数学表示

$$
Agent: S \\times A \\rightarrow S
$$

## 代码示例

\`\`\`typescript
interface Agent<State, Action> {
  perceive(): State
  decide(state: State): Action
  act(action: Action): void
}
\`\`\`
`
}
```

---

## DiagramItem

静态架构图，用于展示系统结构。

```typescript
interface DiagramItem {
  type: 'diagram'
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}
```

### DiagramNode

```typescript
interface DiagramNode {
  id: string        // 唯一标识
  label: string     // 显示名称
  x: number         // X 坐标 (0-100 百分比)
  y: number         // Y 坐标 (0-100 百分比)
  status: 'idle' | 'running' | 'done'  // 节点状态
}
```

### DiagramEdge

```typescript
interface DiagramEdge {
  id?: string           // 可选：边 ID，用于精确控制
  from: string          // 源节点 ID
  to: string            // 目标节点 ID
  label?: string        // 连接标签
  lineType?: LineType   // 线条类型
}

type LineType = 'straight' | 'polyline' | 'curve'
```

### 坐标系统

- 使用百分比坐标 (0-100)
- 左上角为 (0, 0)
- 建议布局间距均匀

### 示例

```typescript
{
  type: 'diagram',
  nodes: [
    { id: 'input', label: 'Input', x: 10, y: 25, status: 'idle' },
    { id: 'llm', label: 'LLM', x: 40, y: 25, status: 'idle' },
    { id: 'tools', label: 'Tools', x: 40, y: 65, status: 'idle' },
    { id: 'output', label: 'Output', x: 75, y: 25, status: 'idle' },
  ],
  edges: [
    { from: 'input', to: 'llm' },
    { from: 'llm', to: 'tools' },
    { from: 'tools', to: 'llm' },
    { from: 'llm', to: 'output' },
  ]
}
```

---

## SvgItem

纯 SVG 图像展示，用于嵌入 SVG 代码。

```typescript
interface SvgItem {
  type: 'svg'
  content: string  // SVG 字符串，如 '<svg>...</svg>'
}
```

### content 格式

- 必须是完整的 SVG 字符串
- 以 `<svg>` 开头，`</svg>` 结尾
- 支持内联样式和属性

### 示例

```typescript
{
  type: 'svg',
  content: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="blue"/>
  </svg>`
}
```

---

## ConfigurableAgentItem

可交互的 Agent 架构演示，支持动画和真实后端连接。

```typescript
interface ConfigurableAgentItem {
  type: 'configurable-agent'
  config: AgentArchitectureConfig
  agentType?: 'qa' | 'tool' | 'langchain'  // 可选：连接真实后端
}
```

### AgentArchitectureConfig

详见 `agent-config-guide.md`

### agentType 说明

| 值 | 说明 |
|---|------|
| 不设置 | 仅展示动画，不连接后端 |
| `'qa'` | 连接 QA Agent 后端 |
| `'tool'` | 连接工具调用 Agent 后端 |
| `'langchain'` | 连接 LangChain Agent 后端 |

### 示例

```typescript
{
  type: 'configurable-agent',
  config: {
    name: '工具调用 Agent',
    layout: 'center',
    components: [
      { id: 'input', type: 'input', label: 'Input' },
      { id: 'llm', type: 'llm', label: 'LLM' },
      { id: 'tools', type: 'tool', label: 'Tools' },
      { id: 'output', type: 'output', label: 'Output' },
    ],
    connections: [
      { from: 'input', to: 'llm', label: '问题' },
      { from: 'llm', to: 'tools', label: '调用' },
      { from: 'tools', to: 'llm', label: '结果', bidirectional: true },
      { from: 'llm', to: 'output', label: '回答' },
    ],
    defaultInput: '今天北京的天气如何？',
  },
  agentType: 'tool',
}
```
