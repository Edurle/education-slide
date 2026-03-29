import type { SlideContent } from '@/types'

export default {
  title: '课程封面',
  items: [
    {
      type: 'hero',
      config: {
        subtitle: 'AI AGENT 入门教程',
        orbIcon: '🤖',
        title: '从大模型到智能体',
        tagline: '探索 AI 的感知、思考与行动',
        chapters: [
          { id: '01', label: 'CHAPTER 01', title: '大模型基础' },
          { id: '02', label: 'CHAPTER 02', title: '智能体基础' },
        ],
      },
    },
  ],
} satisfies SlideContent
