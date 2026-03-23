import type { SlideContent } from '@/types'

export default {
  title: 'LangChain Agent 演示',
  items: [
    {
      type: 'markdown',
      content: `# LangChain Agent 演示

## 实时交互

下面是一个基于 LangChain 框架的 Agent 实时运行示例：
`,
    },
    {
      type: 'configurable-agent',
      config: {
        name: 'LangChain 工具调用 Agent',
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
      agentType: 'langchain',
    },
    {
      type: 'markdown',
      content: `### 运行流程

LangChain Agent 会自动：
1. 解析用户意图
2. 通过 LangChain 框架选择合适的工具
3. 执行并返回结果
`,
    },
  ],
} satisfies SlideContent
