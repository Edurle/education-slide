import type { SlideContent } from '@/types'

export default {
  title: '多轮对话与记忆',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# 大模型如何实现多轮对话？

## 关键洞察

**模型自身不带记忆！**

为了实现多轮对话，需要存储每次的会话历史，并在每次调用时传递给模型。

## 消息格式

\`\`\`python
messages = [
    SystemMessage("你是一个有用的助手"),
    HumanMessage("你好，我叫李明"),
    AIMessage("你好李明！有什么可以帮你的？"),
    HumanMessage("请问我叫什么名字？"),
]
llm.invoke(messages)
\`\`\`
`,
    },
    {
      type: 'diagram',
      nodes: [
        { id: 'user1', label: 'User: 你好，我叫李明', x: 10, y: 15, status: 'idle' },
        { id: 'ai1', label: 'AI: 你好李明！', x: 10, y: 35, status: 'idle' },
        { id: 'user2', label: 'User: 我叫什么？', x: 10, y: 55, status: 'idle' },
        { id: 'llm', label: 'LLM', x: 50, y: 35, status: 'idle' },
        { id: 'ai2', label: 'AI: 你叫李明', x: 85, y: 35, status: 'idle' },
      ],
      edges: [
        { from: 'user1', to: 'llm' },
        { from: 'ai1', to: 'llm' },
        { from: 'user2', to: 'llm' },
        { from: 'llm', to: 'ai2', label: '基于历史回答' },
      ],
    },
  ],
} satisfies SlideContent
