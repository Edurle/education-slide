import type { SlideContent } from '@/types'

export default {
  title: 'Agent 架构',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# Agent 架构

## 基本组件

一个典型的 Agent 系统包含以下组件：

1. **Input** - 用户输入
2. **LLM** - 大语言模型
3. **Tools** - 外部工具
4. **Output** - 响应输出
`,
    },
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
      ],
    },
    {
      type: 'markdown',
      content: `### 数据流

1. **Input** - 用户输入或环境感知
2. **LLM** - 大语言模型进行推理
3. **Tools** - 调用外部工具
4. **Output** - 生成响应
`,
    },
  ],
} satisfies SlideContent
