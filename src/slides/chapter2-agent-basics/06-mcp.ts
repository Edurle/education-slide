import type { SlideContent } from '@/types'

export default {
  title: 'MCP 协议',
  items: [
    {
      type: 'markdown',
      content: `# 规范化工具调用 — MCP

## Model Context Protocol

MCP (Model Context Protocol) 是一个开放标准，旨在让不同的智能体、不同的框架遵循同一种工具调用的方式和格式。

## 为什么需要 MCP？
`,
    },
    {
      type: 'table',
      headers: ['问题', 'MCP 的解决方案'],
      rows: [
        ['工具定义格式不统一', '标准化的工具 Schema'],
        ['不同框架无法共享工具', '一次定义，到处使用'],
        ['调试和监控困难', '统一的可观测性接口'],
      ],
    },
    {
      type: 'markdown',
      content: `## MCP 架构

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │ ←→  │   Server    │ ←→  │   Tools     │
│  (Claude)   │     │   (MCP)     │     │  (外部服务)  │
└─────────────┘     └─────────────┘     └─────────────┘
\`\`\`

## 核心概念

- **Resources** - 可读取的数据源
- **Prompts** - 预定义的提示模板
- **Tools** - 可执行的函数

## 更多信息

- 官方文档: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- GitHub: [modelcontextprotocol](https://github.com/modelcontextprotocol)
`,
    },
  ],
} satisfies SlideContent
