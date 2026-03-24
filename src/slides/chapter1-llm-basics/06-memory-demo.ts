import type { SlideContent } from '@/types'

export default {
  title: '记忆能力演示',
  items: [
    {
      type: 'markdown',
      content: `# 记忆能力演示

下面是一个具有记忆能力的对话演示。尝试在多轮对话中提及你的名字或偏好，然后询问模型是否能记住。
`,
    },
    {
      type: 'configurable-agent',
      config: {
        name: '记忆对话 Agent',
        layout: 'center',
        components: [
          { id: 'input', type: 'input', label: '用户输入' },
          { id: 'memory', type: 'tool', label: '记忆' },
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
