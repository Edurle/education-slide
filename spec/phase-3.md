# 阶段 3：Agent 示例与动画联动

## 目标

* 构建 AgentDemo.vue
* 执行 LangChain Agent 示例
* 回调触发 Diagram 动画显示执行状态
* 可嵌入 Slide，与 MarkdownRenderer 协同显示内容

## 任务清单

| 步骤  | 做什么                  | 怎么做                                                  | 规范/约束                       |
| --- | -------------------- | ---------------------------------------------------- | --------------------------- |
| 3.1 | 封装 BaseAgent.ts      | 提供 `run(input: string, callbacks?: AgentCallback[])` | 保证接口统一，方便继承                 |
| 3.2 | 创建 QAAgent/ToolAgent | 继承 BaseAgent                                         | 逻辑清晰，工具调用可独立测试              |
| 3.3 | AgentDemo.vue        | 执行 Agent 并传入 Diagram 回调                              | Agent 状态变化 → Diagram 节点状态动画 |
| 3.4 | 定义回调接口               | handleAgentAction、handleAgentEnd                     | 回调仅触发 Diagram 动画，不修改业务逻辑    |
| 3.5 | 集成 MarkdownRenderer  | 展示课件 + 代码示例                                          | 只展示内容，运行结果通过 Diagram 动画体现   |
| 3.6 | 测试联动                 | 输入任务，确认 Agent 执行流程可视化                                | 每个节点状态变化正确显示，箭头流向清晰         |
| 3.7 | 多 AgentDemo 支持       | Slide 可包含多个 AgentDemo                                | 每个 AgentDemo 独立执行，动画不冲突     |

## 约束

* AgentDemo 不修改 MarkdownRenderer 内容
* Diagram 动画必须与 Agent callback 完全同步
* 所有 Agent 示例保持最小可复现逻辑，避免复杂业务依赖
