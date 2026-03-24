---
name: slide-creator
description: |
  为 agent_education 项目创建交互式课件 slides。支持两种模式：
  1. 交互模式 - 通过问答逐步构建 slide 内容
  2. 教案模式 - 从用户提供的教案/大纲自动生成完整 slide

  触发场景：用户提到"创建 slide"、"生成课件"、"新建幻灯片"、"添加课程内容"、"帮我写一个slide"等
---

# Slide Creator 技能

为 agent_education 项目创建符合 `SlideContent` 类型的课件 slides。

## 工作流程决策

```
用户请求创建 slide
    ↓
有完整的教案/大纲？
    ├─ 是 → 教案模式（自动批量生成）
    └─ 否 → 交互模式（问答构建）
```

## 模式一：交互模式

当用户只想创建单个 slide 或没有完整教案时使用。

### 步骤

1. **确定主题和目标**
   - slide 主题是什么？
   - 目标受众是谁？（初学者/进阶者）

2. **选择布局方式**
   - `vertical` - 垂直排列（默认）
   - `horizontal` - 水平排列
   - `split-right` - 左侧内容，右侧图表

3. **选择内容类型**（可多选）
   - `markdown` - 文本、公式、代码
   - `diagram` - 静态架构图
   - `configurable-agent` - 可交互 Agent 演示
   - `svg` - 纯 SVG 图像

4. **收集内容**
   - 根据选择的内容类型收集必要信息
   - 参见 `references/slide-types.md` 了解各类型字段

5. **生成文件**
   - 文件命名：`src/slides/{chapter}/{序号}-{主题}.ts`
   - 自动更新 `src/slides/index.ts`

## 模式二：教案模式（批量生成）

当用户提供完整教案/大纲时使用。

### 步骤

1. **分析教案结构**
   - 识别标题、章节、小节
   - 提取关键概念和代码示例

2. **智能拆分**
   - 每个小节生成 1-2 个 slide
   - 概念介绍 → markdown slide
   - 架构说明 → diagram 或 split-right slide
   - 演示示例 → configurable-agent slide

3. **批量生成**
   - 创建目录 `src/slides/chapter{N}/`
   - 生成所有 slide 文件
   - 自动更新 `src/slides/index.ts` 注册

4. **输出生成报告**
   ```
   ✓ 创建了 5 个 slides:
     - src/slides/chapter2/01-intro.ts
     - src/slides/chapter2/02-concept.ts
     - src/slides/chapter2/03-architecture.ts
     - src/slides/chapter2/04-demo.ts
     - src/slides/chapter2/05-summary.ts

   ✓ 已更新 src/slides/index.ts
   ```

## 文件生成规范

### 文件位置
```
src/slides/
├── example/
│   ├── 01-what-is-agent.ts
│   ├── 02-architecture.ts
│   └── ...
├── chapter2/
│   └── ...
└── index.ts
```

### 命名规则
- 文件名：`{序号}-{kebab-case-主题}.ts`
- 序号：两位数字，如 `01`, `02`
- 主题：英文短名称，kebab-case

### 类型约束
必须满足 `SlideContent` 类型：
```typescript
interface SlideContent {
  title?: string
  layout?: 'vertical' | 'horizontal' | 'split-right'
  items: SlideItem[]
}
```

## 内容类型指南

### Markdown Item
适合：文字说明、公式、代码示例
```typescript
{
  type: 'markdown',
  content: `# 标题
内容支持 **Markdown** 和 $公式$
\`\`\`typescript
// 代码示例
\`\`\`
`
}
```

### Diagram Item
适合：静态架构图展示
```typescript
{
  type: 'diagram',
  nodes: [
    { id: 'input', label: 'Input', x: 10, y: 25, status: 'idle' },
    { id: 'llm', label: 'LLM', x: 40, y: 25, status: 'idle' },
  ],
  edges: [
    { from: 'input', to: 'llm', label: '数据' },
  ]
}
```

### Configurable Agent Item
适合：可交互的 Agent 演示
```typescript
{
  type: 'configurable-agent',
  config: {
    name: 'Agent 名称',
    layout: 'horizontal',
    components: [...],
    connections: [...],
    executionSteps: [...],
    defaultInput: '默认输入'
  },
  agentType: 'qa' | 'tool' | 'langchain'
}
```

详细配置见 `references/agent-config-guide.md`

### SVG Item
适合：纯 SVG 图像展示
```typescript
{
  type: 'svg',
  content: `<svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="blue"/>
  </svg>`
}
```

## 更新 index.ts

生成 slide 后必须更新 `src/slides/index.ts`：

```typescript
export const courseConfig = {
  title: 'AI Agent 入门教程',
  chapters: [
    {
      id: 'example',
      title: '示例章节',
      slides: [
        { id: '01-what-is-agent', title: '什么是 Agent' },
        // 新增的 slides...
      ]
    },
    // 新增的章节...
  ]
}
```

## 参考文件

- `references/slide-types.md` - 完整类型定义
- `references/agent-config-guide.md` - Agent 配置详解
- `references/examples.md` - 完整示例
- `assets/templates/slide-template.ts` - 文件模板
