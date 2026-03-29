import type { SlideContent } from '@/types'

export default {
  title: '单次模型调用',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# 单次模型调用发生了什么？

## 代码示例

\`\`\`python
llm.invoke("你好，告诉我今天的日期")
\`\`\`

## 实际发送的内容

\`\`\`
<|im_start|>user
你好，告诉我今天的日期
<|im_end|>
<|im_start|>assistant
\`\`\`

模型只看到用户输入的文本，然后开始预测下一个词。
`,
    },
    {
      type: 'diagram',
      nodes: [
        { id: 'prompt', label: 'Prompt', x: 5, y: 40, status: 'idle' },
        { id: 'llm', label: 'LLM', x: 45, y: 40, status: 'idle' },
        { id: 'output', label: 'Output', x: 80, y: 40, status: 'idle' },
      ],
      edges: [
        { from: 'prompt', to: 'llm', label: '文本' },
        { from: 'llm', to: 'output', label: '预测' },
      ],
    },
  ],
} satisfies SlideContent
