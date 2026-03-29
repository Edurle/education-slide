import type { SlideContent } from '@/types'

export default {
  title: '智能体如何感知世界',
  items: [
    {
      type: 'markdown',
      content: `# 智能体如何感知世界？

## 存在的问题

1. **世界并不是由纯文本构成的**
   - 图像、音频、视频、传感器数据...

2. **传统大模型无法理解多模态数据**
   - 只能处理文本输入输出
`,
    },
    {
      type: 'markdown',
      content: `## 解决方案

### 方案一：模型端 — 原生多模态模型

直接使用支持多模态的模型（如 GPT-4V、Claude Vision）

\`\`\`
图像/音频 → 多模态模型 → 理解并生成
\`\`\`

### 方案二：智能体端 — 多模态转文本

将非文本信息转换为文本描述
`,
    },
    {
      type: 'table',
      headers: ['转换方式', '说明'],
      rows: [
        ['**预先转换**', '图片通过 OCR 提取文字'],
        ['**工具调用**', '调用专门的图像分析工具'],
        ['**描述生成**', '用视觉模型生成文本描述'],
      ],
    },
  ],
} satisfies SlideContent
