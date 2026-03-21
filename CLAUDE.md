# agent_education 项目指南

## 项目概述

交互式课件系统，用于教授 AI Agent 概念。核心功能：
- Markdown 课件渲染（支持公式、代码高亮）
- 架构图动画展示（使用 anime.js）
- Agent 实时演示与动画联动（服务端 LangChain + SSE）

## 技术栈

| 类型 | 技术 |
|------|------|
| 前端框架 | Vue 3 + TypeScript (Composition API) |
| 构建工具 | Vite |
| Markdown | markdown-it + markdown-it-katex + highlight.js |
| 动画 | anime.js |
| 服务端框架 | Express |
| Agent | LangChain 1.2 TS + @langchain/openai |
| 通信 | SSE (Server-Sent Events) |

## 常用命令

```bash
# 安装依赖
npm install                    # 前端依赖
cd server && npm install       # 服务端依赖

# 启动开发服务器（同时启动前后端）
npm run dev

# 单独启动
npm run dev:client             # 仅前端 (Vite)
npm run dev:server             # 仅服务端 (Express)

# 清理端口
npm run clean                  # 清理所有端口 (5173, 5174, 3001)

# 构建
npm run build

# 类型检查
npm run type-check
```

## 项目结构

```
src/
├── components/        # Vue 组件
│   ├── MarkdownRenderer.vue  # Markdown 渲染
│   ├── Diagram.vue           # 架构图动画
│   ├── AgentDemo.vue         # Agent 演示（调用服务端 API）
│   └── Slide.vue             # 最小页面单位
├── api/               # API 封装
│   └── agent.ts              # SSE 客户端
├── slides/            # 课件内容
├── utils/             # 工具函数
└── types/             # TypeScript 类型定义

server/
├── src/
│   ├── index.ts              # Express 入口 (端口 3001)
│   ├── routes/
│   │   └── agent.ts          # Agent API 路由
│   ├── agents/
│   │   ├── BaseAgent.ts      # Agent 基类
│   │   ├── QAAgent.ts        # 问答 Agent
│   │   └── ToolAgent.ts      # 工具调用 Agent
│   └── types/
│       └── index.ts          # 服务端类型定义
├── package.json
└── tsconfig.json
```

## 架构设计

### 核心组件

1. **Slide** - 最小页面单位，管理内容组合和布局
2. **MarkdownRenderer** - 纯渲染组件，接收 `content: string`
3. **Diagram** - 架构图动画，提供 `updateNodeStatus(id, status)`、`activateEdge(id)`、`deactivateEdge(id)` 接口
4. **AgentDemo** - 调用服务端 API，通过 SSE 事件触发 Diagram 动画

### 数据流

```
用户输入 → AgentDemo.vue → POST /api/agent/run
                                ↓
Server (Express) → Agent 执行 → SSE Events
                                ↓
AgentDemo.vue → 解析 SSE → Diagram 动画更新
```

### SSE 事件类型

```typescript
type AgentEventType =
  | 'node_status'      // 节点状态变化
  | 'edge_activate'    // 边激活
  | 'edge_deactivate'  // 边停用
  | 'action'           // Agent 动作说明
  | 'result'           // 最终结果
  | 'error'            // 错误
```

### Diagram 数据结构

```typescript
interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  status: 'idle' | 'running' | 'done';
}

interface Edge {
  id?: string;
  from: string;
  to: string;
  label?: string;
}
```

## 开发阶段

### 阶段 0：环境搭建
- 创建 Vue 3 + TS 项目
- 安装 markdown-it、highlight.js、KaTeX、anime.js

### 阶段 1：基础课件渲染
- MarkdownRenderer 组件
- Slide 组件抽象
- 公式和代码高亮集成

### 阶段 2：架构图动画展示
- Diagram 组件
- 节点/箭头绘制
- 状态动画（idle → running → done）
- 边流动动画

### 阶段 3：服务端 Agent + SSE 动画联动
- 服务端 Express 框架 (端口 3001)
- BaseAgent、QAAgent、ToolAgent
- SSE 事件流 `/api/agent/run`
- 前端 API 层封装
- AgentDemo 组件
- Agent 执行与 Diagram 动画同步

## 设计约束

1. **模块化** - MarkdownRenderer、Diagram、AgentDemo、Slide 分离
2. **服务端执行** - Agent 在服务端执行，API Key 不暴露给前端
3. **SSE 通信** - 通过 SSE 实现实时状态推送
4. **TypeScript 严格模式** - `"strict": true`
5. **阶段 0-3 不涉及动态代码编辑**
6. **所有动画可控、可停止**

## 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | 否（不配置则使用演示模式）|
