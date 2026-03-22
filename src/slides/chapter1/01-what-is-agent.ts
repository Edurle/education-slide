import type { SlideContent } from '@/types'

export default {
  title: '什么是 Agent',
  layout: 'vertical',
  items: [
    {
      type: 'markdown',
      content: `# 第一章：什么是 Agent？

## 定义

Agent（智能体）是一个能够**感知环境**并**采取行动**以实现目标的系统。

核心特征：
- 自主性 (Autonomy)
- 反应性 (Reactivity)
- 主动性 (Pro-activeness)
- 社交性 (Social ability)

## 数学表示

Agent 可以形式化为：

$$
Agent: S \times A \rightarrow S
$$

其中 $S$ 是状态空间，$A$ 是动作空间。
`,
    },
    {
      type: 'markdown',
      content: `## 代码示例

\`\`\`typescript
interface Agent<State, Action> {
  // 感知当前状态
  perceive(): State

  // 决策下一步行动
  decide(state: State): Action

  // 执行行动
  act(action: Action): void
}
\`\`\`
`,
    },
  ],
} satisfies SlideContent
