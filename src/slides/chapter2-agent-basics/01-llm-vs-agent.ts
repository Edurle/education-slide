import type { SlideContent } from '@/types'

export default {
  title: '大模型 vs 智能体',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# 大模型与智能体

## 简单比喻
`,
    },
    {
      type: 'table',
      headers: ['大模型 (LLM)', '智能体 (Agent)'],
      rows: [
        ['**大脑** — 负责思考和生成', '**完整的人** — 负责感知、规划、行动'],
        ['只能处理文本', '可以感知多模态信息'],
        ['被动响应', '主动完成任务'],
        ['无外部能力', '可调用工具与环境交互'],
      ],
    },
    {
      type: 'diagram',
      nodes: [
        { id: 'llm', label: 'LLM\n(大脑)', x: 20, y: 50, status: 'idle' },
        { id: 'perception', label: '感知', x: 50, y: 20, status: 'idle' },
        { id: 'planning', label: '规划', x: 80, y: 50, status: 'idle' },
        { id: 'action', label: '行动', x: 50, y: 80, status: 'idle' },
      ],
      edges: [
        { from: 'perception', to: 'llm', label: '输入' },
        { from: 'llm', to: 'planning', label: '思考' },
        { from: 'planning', to: 'action', label: '决策' },
        { from: 'action', to: 'perception', label: '观察结果' },
      ],
    },
  ],
} satisfies SlideContent
