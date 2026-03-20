# agent_education 项目指南

## 项目概述

交互式课件系统，用于教授 AI Agent 概念。核心功能：
- Markdown 课件渲染（支持公式、代码高亮）
- 架构图动画展示（使用 anime.js）
- Agent 实时演示与动画联动（LangChain）

## 技术栈

| 类型 | 技术 |
|------|------|
| 框架 | Vue 3 + TypeScript (Composition API) |
| 构建工具 | Vite |
| Markdown | markdown-it + markdown-it-katex + highlight.js |
| 动画 | anime.js |
| Agent | LangChain 1.2 TS + @langchain/openai |

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
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
│   ├── AgentDemo.vue         # Agent 演示
│   └── Slide.vue             # 最小页面单位
├── agents/            # Agent 实现
│   ├── BaseAgent.ts          # 基类
│   ├── QAAgent.ts            # 问答 Agent
│   └── ToolAgent.ts          # 工具调用 Agent
├── slides/            # 课件内容
├── utils/             # 工具函数
└── types/             # TypeScript 类型定义
```

## 架构设计

### 核心组件

1. **Slide** - 最小页面单位，管理内容组合和布局
2. **MarkdownRenderer** - 纯渲染组件，接收 `content: string`
3. **Diagram** - 架构图动画，提供 `highlightNode(id)`、`updateNodeStatus(id, status)` 接口
4. **AgentDemo** - 执行 Agent，通过回调触发 Diagram 动画

### Agent 层

```typescript
// BaseAgent 接口
interface AgentCallback {
  handleAgentAction?(action: string): void;
  handleAgentEnd?(result: string): void;
}

abstract class BaseAgent {
  abstract run(input: string, callbacks?: AgentCallback[]): Promise<string>;
}
```

### 数据流

```
Agent 执行 → 回调触发 → Diagram 动画更新节点状态
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
  from: string;
  to: string;
}
```

## 开发阶段

### 阶段 0：环境搭建
- 创建 Vue 3 + TS 项目
- 安装 markdown-it、highlight.js、KaTeX、anime.js、LangChain

### 阶段 1：基础课件渲染
- MarkdownRenderer 组件
- Slide 组件抽象
- 公式和代码高亮集成

### 阶段 2：架构图动画展示
- Diagram 组件
- 节点/箭头绘制
- 状态动画（idle → running → done）

### 阶段 3：Agent 示例与动画联动
- BaseAgent、QAAgent、ToolAgent
- AgentDemo 组件
- Agent 执行与 Diagram 动画同步

## 设计约束

1. **模块化** - MarkdownRenderer、Diagram、AgentDemo、Slide 分离
2. **接口清晰** - Agent 回调仅触发动画，不修改业务逻辑
3. **TypeScript 严格模式** - `"strict": true`
4. **阶段 0-3 不涉及动态代码编辑**
5. **所有动画可控、可停止**
