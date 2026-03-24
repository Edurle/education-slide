import type { SlideContent } from '@/types'

export default {
  title: '思考-行动循环',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# 智能体如何规划和行动？

## Think → Act → Observe 循环

智能体通过持续的循环来完成复杂任务：

1. **Think (思考)** - 分析当前状态，决定下一步
2. **Act (行动)** - 执行工具调用或生成回复
3. **Observe (观察)** - 获取行动结果，更新状态
4. **重复...** 直到任务完成

\`\`\`python
while not task_complete:
    thought = think(current_state)
    action = decide_action(thought)
    result = execute(action)
    observe(result)
\`\`\`
`,
    },
    {
      type: 'diagram',
      nodes: [
        { id: 'think', label: 'Think\n思考', x: 50, y: 15, status: 'idle' },
        { id: 'act', label: 'Act\n行动', x: 85, y: 50, status: 'idle' },
        { id: 'observe', label: 'Observe\n观察', x: 50, y: 85, status: 'idle' },
        { id: 'llm', label: 'LLM', x: 15, y: 50, status: 'idle' },
      ],
      edges: [
        { from: 'llm', to: 'think', label: '分析' },
        { from: 'think', to: 'act', label: '决策' },
        { from: 'act', to: 'observe', label: '执行' },
        { from: 'observe', to: 'llm', label: '反馈' },
      ],
    },
  ],
} satisfies SlideContent
