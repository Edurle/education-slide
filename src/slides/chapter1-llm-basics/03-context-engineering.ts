import type { SlideContent } from '@/types'

export default {
  title: '上下文工程',
  items: [
    {
      type: 'markdown',
      content: `# 上下文工程

## 什么是上下文？

上下文是大模型生成内容时所依赖的所有信息。
`,
    },
    {
      type: 'markdown',
      content: `### 狭义上下文
`,
    },
    {
      type: 'table',
      headers: ['类型', '说明'],
      rows: [
        ['**提示词 (Prompt)**', '用户直接输入的指令或问题'],
        ['**会话窗口**', '当前对话中可见的历史消息'],
      ],
    },
    {
      type: 'markdown',
      content: `### 广义上下文
`,
    },
    {
      type: 'table',
      headers: ['类型', '说明'],
      rows: [
        ['**工具调用**', '让模型能够执行外部操作'],
        ['**MCP**', '标准化的工具调用协议'],
        ['**Skill**', '封装的特定能力模块'],
        ['**RAG**', '检索增强生成的知识库'],
      ],
    },
  ],
} satisfies SlideContent
