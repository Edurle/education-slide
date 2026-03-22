import type { SlideContent } from '@/types'

export default {
  title: 'Agent 演示',
  items: [
    {
      type: 'markdown',
      content: `# Agent 演示

## 实时交互

下面是一个 Agent 实时运行的示例：
`,
    },
    {
      type: 'agent',
      agentType: 'tool',
      input: '今天北京的天气如何？',
    },
    {
      type: 'markdown',
      content: `### 运行流程

Agent 会自动：
1. 解析用户意图
2. 选择合适的工具
3. 执行并返回结果
`,
    },
  ],
} satisfies SlideContent
