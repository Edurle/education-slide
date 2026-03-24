import type { SlideContent } from '@/types'

export default {
  title: '工具调用演示',
  items: [
    {
      type: 'markdown',
      content: `# 工具调用

## 核心洞察

**工具调用的本质是输出一段特殊格式的文本**

模型并不是真的"调用"工具，而是输出一个结构化的 JSON，由智能体框架解析并执行。

\`\`\`json
{"name": "weather_search", "arguments": {"location": "北京"}}
\`\`\`
`,
    },
    {
      type: 'configurable-agent',
      config: {
        name: '天气查询 Agent',
        layout: 'center',
        components: [
          { id: 'input', type: 'input', label: '用户输入' },
          { id: 'llm', type: 'llm', label: 'LLM' },
          { id: 'tools', type: 'tool', label: 'Weather Tool' },
          { id: 'output', type: 'output', label: '回复' },
        ],
        connections: [
          { from: 'input', to: 'llm', label: '问题' },
          { from: 'llm', to: 'tools', label: '调用工具' },
          { from: 'tools', to: 'llm', label: '结果返回', bidirectional: true },
          { from: 'llm', to: 'output', label: '最终回答' },
        ],
        defaultInput: '今天北京的天气怎么样？',
      },
      agentType: 'tool',
    },
  ],
} satisfies SlideContent
