import type { SlideContent } from '@/types'

export default {
  title: 'Agent 特性',
  layout: 'horizontal',
  items: [
    {
      type: 'markdown',
      content: `## 特性一

**自主性**

Agent 能够独立运行，不需要人类持续干预。
`,
    },
    {
      type: 'markdown',
      content: `## 特性二

**反应性**

Agent 能够感知环境变化并及时响应。
`,
    },
    {
      type: 'markdown',
      content: `## 特性三

**主动性**

Agent 能够主动采取行动实现目标。
`,
    },
  ],
} satisfies SlideContent
