# 阶段 0-3 开发规范总结

## 1. 模块化

* MarkdownRenderer、Diagram、ConfigurableAgent、Slide 分离
* 前端纯静态应用，通过预设步骤驱动 Agent 动画

## 2. 接口清晰

* 预设 executionSteps → Diagram 动画
* Slide 管理 MarkdownRenderer、Diagram、ConfigurableAgent 的组合和顺序

## 3. 可扩展性

* Node/Edge 可扩展属性
* Agent 可扩展类型（通过不同的 executionSteps）
* Slide 可包含多个 MarkdownRenderer/Diagram/ConfigurableAgent

## 4. 可维护性

* Slide 是最小页面单位
* Diagram 动画方法统一接口
* MarkdownRenderer 只负责渲染，不处理业务逻辑

## 5. 约束

* 阶段 0-3 不涉及动态代码编辑
* 所有动画可控、可触发
* 所有组件使用 TypeScript 严格模式
