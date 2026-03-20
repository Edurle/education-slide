# 阶段 1：基础课件渲染

## 目标

* 完成 **MarkdownRenderer** 和 **Slide** 抽象
* 支持在同一页 Slide 中展示多个 MarkdownRenderer

## 任务清单

| 步骤  | 做什么                    | 怎么做                                               | 规范/约束                                        |
| --- | ---------------------- | ------------------------------------------------- | -------------------------------------------- |
| 1.1 | 设计 MarkdownRenderer 组件 | 使用 markdown-it + markdown-it-katex + highlight.js | 接收 `content: string`，只渲染内容                   |
| 1.2 | 设计 Slide 组件            | 接收 `SlideContent`，渲染多个 MarkdownRenderer           | 每页可包含任意数量 MarkdownRenderer、Diagram、AgentDemo |
| 1.3 | 布局设计                   | Slide 支持多种布局方式 | vertical / horizontal / split-right |
| 1.4 | 集成公式渲染                 | markdown-it-katex                                 | 支持行内 `$...$` 与块级 `$$...$$`                   |
| 1.5 | 集成代码高亮                 | highlight.js                                      | 支持多语言自动识别                                    |

## 约束

* Slide 是最小页面单位，保证课件分页清晰
* MarkdownRenderer 只负责渲染内容，不处理布局
* Diagram 和 AgentDemo 通过 props 或事件与 Slide 联动

## 布局类型

| 布局 | 说明 |
|------|------|
| `vertical` | 垂直堆叠（默认） |
| `horizontal` | 水平排列 |
| `split-right` | 左右分栏，第一项左侧，其余右侧垂直堆叠 |
