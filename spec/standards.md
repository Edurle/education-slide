# 阶段 0-3 开发规范总结

## 1. 模块化

* MarkdownRenderer、Diagram、AgentDemo、Slide 分离
* Agent 逻辑与动画逻辑解耦

## 2. 接口清晰

* Agent 回调 → Diagram 动画
* Slide 管理 MarkdownRenderer、Diagram、AgentDemo 的组合和顺序

## 3. 可扩展性

* Node/Edge 可扩展属性
* Agent 可扩展类型（QA、Tool、Chain 等）
* Slide 可包含多个 MarkdownRenderer/Diagram/AgentDemo

## 4. 可维护性

* Slide 是最小页面单位
* Diagram 动画方法统一接口
* MarkdownRenderer 只负责渲染，不处理业务逻辑

## 5. 约束

* 阶段 0-3 不涉及动态代码编辑
* 所有动画可控、可触发
* 所有组件使用 TypeScript 严格模式
