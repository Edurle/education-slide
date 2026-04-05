# agent_education 项目指南

## 项目概述

交互式课件系统，用于教授 AI Agent 概念。核心功能：
- Markdown 课件渲染（支持公式、代码高亮）
- 架构图动画展示（使用 anime.js）
- Agent 演示动画（预设步骤驱动）

## 技术栈

| 类型 | 技术 |
|------|------|
| 前端框架 | Vue 3 + TypeScript (Composition API) |
| 构建工具 | Vite |
| Markdown | markdown-it + markdown-it-katex + highlight.js |
| 动画 | anime.js |

## 常用命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 清理端口
npm run clean

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
│   ├── ConfigurableAgent.vue # Agent 演示（预设步骤动画）
│   └── Slide.vue             # 最小页面单位
├── slides/            # 课件内容
├── utils/             # 工具函数
└── types/             # TypeScript 类型定义
```

## 架构设计

### 核心组件

1. **Slide** - 最小页面单位，管理内容组合和布局
2. **MarkdownRenderer** - 纯渲染组件，接收 `content: string`
3. **Diagram** - 架构图动画，提供 `updateNodeStatus(id, status)`、`activateEdge(id)`、`deactivateEdge(id)` 接口
4. **ConfigurableAgent** - Agent 演示组件，通过预设 `executionSteps` 驱动 Diagram 动画

### 数据流

```
用户输入 → ConfigurableAgent.vue → runPresetDemo(executionSteps)
                                        ↓
                              Diagram 动画更新（节点状态 + 边激活）
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

### 阶段 3：Agent 演示动画
- ConfigurableAgent 组件（预设步骤驱动）
- Agent 执行与 Diagram 动画同步

## 设计约束

1. **模块化** - MarkdownRenderer、Diagram、ConfigurableAgent、Slide 分离
2. **纯前端** - 无后端依赖，所有演示通过预设步骤在前端运行
3. **TypeScript 严格模式** - `"strict": true`
4. **所有动画可控、可停止**
