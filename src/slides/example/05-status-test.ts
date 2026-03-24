import type { SlideContent } from '@/types'

export default {
  title: 'Diagram 状态测试',
  layout: 'vertical',
  items: [
    {
      type: 'markdown',
      content: `# Diagram 状态测试

测试三种状态：idle（蓝灰）、running（黄色脉冲）、done（绿色）
`,
    },
    {
      type: 'diagram',
      nodes: [
        { id: 'idle1', label: 'Idle', x: 20, y: 30, status: 'idle' },
        { id: 'running1', label: 'Running', x: 50, y: 30, status: 'running' },
        { id: 'done1', label: 'Done', x: 80, y: 30, status: 'done' },
      ],
      edges: [
        { from: 'idle1', to: 'running1', label: 'start' },
        { from: 'running1', to: 'done1', label: 'complete' },
      ],
    },
  ],
} satisfies SlideContent
