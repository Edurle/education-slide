# 阶段 0-3 开发规范总结

## 1. 模块化

* MarkdownRenderer、Diagram、AgentDemo、Slide 分离
* Agent 逻辑在服务端执行，通过 SSE 与前端通信
* 前端 API 层 (`src/api/agent.ts`) 封装 SSE 通信

## 2. 接口清晰

* SSE 事件 → Diagram 动画
* Slide 管理 MarkdownRenderer、Diagram、AgentDemo 的组合和顺序
* 服务端 Agent 通过 SSE callback 推送状态

## 3. 可扩展性

* Node/Edge 可扩展属性
* Agent 可扩展类型（QA、Tool、Chain 等）
* Slide 可包含多个 MarkdownRenderer/Diagram/AgentDemo
* 服务端可添加新的 Agent 类型和工具

## 4. 可维护性

* Slide 是最小页面单位
* Diagram 动画方法统一接口
* MarkdownRenderer 只负责渲染，不处理业务逻辑
* 服务端独立目录 (`server/`)，独立依赖和构建

## 5. 安全性

* API Key 保存在服务端，不暴露给前端
* 通过 Vite proxy 代理 API 请求

## 6. 约束

* 阶段 0-3 不涉及动态代码编辑
* 所有动画可控、可触发
* 所有组件使用 TypeScript 严格模式
* 服务端端口固定为 3001
