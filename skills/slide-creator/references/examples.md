# Slide 完整示例

## 示例 1：纯 Markdown Slide

最简单的 slide 类型，适合文字说明、公式、代码。

```typescript
// src/slides/chapter1/01-what-is-agent.ts
import type { SlideContent } from '@/types'

export default {
  title: '什么是 Agent',
  layout: 'vertical',
  items: [
    {
      type: 'markdown',
      content: `# 第一章：什么是 Agent？

## 定义

Agent（智能体）是一个能够**感知环境**并**采取行动**以实现目标的系统。

核心特征：
- 自主性 (Autonomy)
- 反应性 (Reactivity)
- 主动性 (Pro-activeness)
- 社交性 (Social ability)

## 数学表示

$$
Agent: S \\times A \\rightarrow S
$$

其中 $S$ 是状态空间，$A$ 是动作空间。
`,
    },
    {
      type: 'markdown',
      content: `## 代码示例

\`\`\`typescript
interface Agent<State, Action> {
  // 感知当前状态
  perceive(): State

  // 决策下一步行动
  decide(state: State): Action

  // 执行行动
  act(action: Action): void
}
\`\`\`
`,
    },
  ],
} satisfies SlideContent
```

---

## 示例 2：Split-Right 布局（左文右图）

适合图文并排展示。

```typescript
// src/slides/chapter1/02-architecture.ts
import type { SlideContent } from '@/types'

export default {
  title: 'Agent 架构',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# Agent 架构

## 基本组件

一个典型的 Agent 系统包含以下组件：

1. **Input** - 用户输入
2. **LLM** - 大语言模型
3. **Tools** - 外部工具
4. **Output** - 响应输出
`,
    },
    {
      type: 'diagram',
      nodes: [
        { id: 'input', label: 'Input', x: 10, y: 25, status: 'idle' },
        { id: 'llm', label: 'LLM', x: 40, y: 25, status: 'idle' },
        { id: 'tools', label: 'Tools', x: 40, y: 65, status: 'idle' },
        { id: 'output', label: 'Output', x: 75, y: 25, status: 'idle' },
      ],
      edges: [
        { from: 'input', to: 'llm' },
        { from: 'llm', to: 'tools' },
        { from: 'tools', to: 'llm' },
        { from: 'llm', to: 'output' },
      ],
    },
    {
      type: 'markdown',
      content: `### 数据流

1. **Input** - 用户输入或环境感知
2. **LLM** - 大语言模型进行推理
3. **Tools** - 调用外部工具
4. **Output** - 生成响应
`,
    },
  ],
} satisfies SlideContent
```

---

## 示例 3：Configurable Agent（可交互演示）

适合需要用户交互和动画演示的场景。

```typescript
// src/slides/chapter1/03-agent-demo.ts
import type { SlideContent } from '@/types'

export default {
  title: 'Agent 演示',
  items: [
    {
      type: 'markdown',
      content: `# Agent 演示

## 实时交互

下面是一个 Agent 实时运行的示例：
`,
    },
    {
      type: 'configurable-agent',
      config: {
        name: '工具调用 Agent',
        layout: 'center',
        components: [
          { id: 'input', type: 'input', label: 'Input' },
          { id: 'llm', type: 'llm', label: 'LLM' },
          { id: 'tools', type: 'tool', label: 'Tools' },
          { id: 'output', type: 'output', label: 'Output' },
        ],
        connections: [
          { from: 'input', to: 'llm', label: '问题' },
          { from: 'llm', to: 'tools', label: '调用' },
          { from: 'tools', to: 'llm', label: '结果', bidirectional: true },
          { from: 'llm', to: 'output', label: '回答' },
        ],
        defaultInput: '今天北京的天气如何？',
      },
      agentType: 'tool',
    },
    {
      type: 'markdown',
      content: `### 运行流程

Agent 会自动：
1. 解析用户意图
2. 选择合适的工具
3. 执行并返回结果
`,
    },
  ],
} satisfies SlideContent
```

---

## 示例 4：多工具 Agent（复杂架构）

展示更复杂的 Agent 架构。

```typescript
// src/slides/chapter1/06-custom-agent.ts
import type { SlideContent } from '@/types'

export default {
  title: '多工具 Agent 架构',
  items: [
    {
      type: 'configurable-agent',
      config: {
        name: '多工具协作 Agent',
        layout: 'horizontal',
        components: [
          { id: 'input', type: 'input' },
          { id: 'router', type: 'router', label: '路由器' },
          { id: 'search', type: 'tool', label: '搜索工具' },
          { id: 'llm', type: 'llm' },
          { id: 'output', type: 'output' }
        ],
        connections: [
          { from: 'input', to: 'router' },
          { from: 'router', to: 'search', label: '搜索' },
          { from: 'search', to: 'llm', label: '结果' },
          { from: 'llm', to: 'output', label: '回答' }
        ],
        executionSteps: [
          { nodeId: 'input', action: '接收用户输入', activateEdges: ['input-router'] },
          { nodeId: 'router', action: '分析任务，选择工具', activateEdges: ['router-search'] },
          { nodeId: 'search', action: '执行搜索...', activateEdges: ['search-llm'] },
          { nodeId: 'llm', action: 'LLM 处理结果', activateEdges: ['llm-output'] },
          { nodeId: 'output', action: '输出最终答案' }
        ],
        defaultInput: '帮我搜索最新的 AI 新闻'
      }
    }
  ]
} satisfies SlideContent
```

---

## 示例 5：纯 Diagram Slide

只展示架构图，无文字说明。

```typescript
// src/slides/chapter1/05-diagram-only.ts
import type { SlideContent } from '@/types'

export default {
  title: 'Agent 数据流',
  layout: 'horizontal',
  items: [
    {
      type: 'diagram',
      nodes: [
        { id: 'user', label: 'User', x: 5, y: 50, status: 'idle' },
        { id: 'input', label: 'Input', x: 20, y: 50, status: 'idle' },
        { id: 'llm', label: 'LLM', x: 50, y: 50, status: 'idle' },
        { id: 'memory', label: 'Memory', x: 50, y: 20, status: 'idle' },
        { id: 'tools', label: 'Tools', x: 50, y: 80, status: 'idle' },
        { id: 'output', label: 'Output', x: 80, y: 50, status: 'idle' },
      ],
      edges: [
        { from: 'user', to: 'input', label: '请求' },
        { from: 'input', to: 'llm' },
        { from: 'llm', to: 'memory', label: '存取' },
        { from: 'llm', to: 'tools', label: '调用' },
        { from: 'tools', to: 'llm', label: '结果' },
        { from: 'llm', to: 'output' },
        { from: 'output', to: 'user', label: '响应' },
      ],
    },
  ],
} satisfies SlideContent
```

---

## 批量生成示例

当从教案生成多个 slides 时，index.ts 更新如下：

```typescript
// src/slides/index.ts
import type { SlideContent } from '@/types'

const slideModules = import.meta.glob<SlideContent>('./**/*.ts', {
  eager: true,
  import: 'default'
})

export const courseConfig = {
  title: 'AI Agent 入门教程',
  chapters: [
    {
      id: 'chapter1',
      title: '第一章：Agent 基础',
      slides: [
        { id: '01-what-is-agent', title: '什么是 Agent' },
        { id: '02-architecture', title: 'Agent 架构' },
        { id: '03-agent-demo', title: 'Agent 演示' },
      ]
    },
    // 新增章节
    {
      id: 'chapter2',
      title: '第二章：Agent 进阶',
      slides: [
        { id: '01-tools', title: '工具调用' },
        { id: '02-memory', title: '记忆系统' },
        { id: '03-planning', title: '规划能力' },
      ]
    }
  ]
}

export function getSlide(chapterId: string, slideId: string): SlideContent | undefined {
  const key = `./${chapterId}/${slideId}.ts`
  return slideModules[key]
}

export function getAllSlides(): { chapterId: string; slideId: string; content: SlideContent }[] {
  const slides: { chapterId: string; slideId: string; content: SlideContent }[] = []

  for (const chapter of courseConfig.chapters) {
    for (const slide of chapter.slides) {
      const content = getSlide(chapter.id, slide.id)
      if (content) {
        slides.push({ chapterId: chapter.id, slideId: slide.id, content })
      }
    }
  }

  return slides
}
```
