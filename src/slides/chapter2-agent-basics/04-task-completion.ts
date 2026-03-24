import type { SlideContent } from '@/types'

export default {
  title: '任务结束判定',
  items: [
    {
      type: 'markdown',
      content: `# 任务结束的判定

## 核心规则

当智能体 **不再触发工具调用** 时，视为任务结束。

## 代码示例

\`\`\`python
while True:
    # 调用模型，绑定可用工具
    output = llm.bind_tools(tools).invoke(messages)

    # 如果没有工具调用，任务完成
    if not output.tool_calls:
        break

    # 执行工具调用
    for tool_call in output.tool_calls:
        obs = tools[tool_call['name']].invoke(tool_call['args'])
        messages += [output, ToolMessage(content=obs)]
\`\`\`

## 工作流程

1. 模型生成回复（可能包含工具调用）
2. 检查是否有 \`tool_calls\`
3. 如果有，执行工具并将结果加入对话
4. 如果没有，返回最终答案
`,
    },
  ],
} satisfies SlideContent
