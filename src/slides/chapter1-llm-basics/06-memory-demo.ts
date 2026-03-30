import type { SlideContent } from '@/types'

export default {
  title: '记忆能力演示',
  items: [
    {
      type: 'markdown',
      content: `# 记忆能力演示

下面演示多轮对话中，模型如何通过历史消息实现"记忆"。试试告诉模型你的名字，然后问它是否记得。

> 下方的 **Context Window** 会实时记录你与模型的每一轮对话 — 这就是每次调用时发送给模型的完整历史。`,
    },
    {
      type: 'configurable-agent',
      config: {
        name: '记忆对话 Agent',
        layout: 'horizontal',
        components: [
          { id: 'input', type: 'input', label: '用户输入' },
          { id: 'memory', type: 'memory', label: '记忆' },
          { id: 'llm', type: 'llm', label: 'LLM' },
          { id: 'output', type: 'output', label: '回复' },
        ],
        connections: [
          { from: 'input', to: 'memory', label: '存储' },
          { from: 'memory', to: 'llm', label: '历史' },
          { from: 'llm', to: 'output', label: '生成' },
        ],
        defaultInput: '你好，我叫张三，我喜欢编程。',
      },
      agentType: 'qa',
    },
    {
      type: 'markdown',
      content: `### 测试建议

1. 先告诉模型你的名字和爱好
2. 问几个其他问题
3. 最后问"你还记得我的名字/爱好吗？"
`,
    },
  ],
} satisfies SlideContent
