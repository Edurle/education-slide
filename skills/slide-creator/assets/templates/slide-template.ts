import type { SlideContent } from '@/types'

/**
 * Slide 模板文件
 *
 * 使用方法：
 * 1. 复制此文件到 src/slides/{chapter}/ 目录
 * 2. 重命名为 {序号}-{主题}.ts（如 01-intro.ts）
 * 3. 替换 {{PLACEHOLDER}} 为实际内容
 * 4. 在 src/slides/index.ts 中注册
 */

export default {
  title: '{{TITLE}}',
  layout: '{{LAYOUT}}', // 'vertical' | 'horizontal' | 'split-right'
  items: [
    // ========== Markdown Item ==========
    // {
    //   type: 'markdown',
    //   content: `# 标题
    //
    // 内容支持 **Markdown** 和 $公式$
    //
    // \`\`\`typescript
    // // 代码示例
    // \`\`\`
    // `,
    // },

    // ========== Diagram Item ==========
    // {
    //   type: 'diagram',
    //   nodes: [
    //     { id: 'input', label: 'Input', x: 10, y: 25, status: 'idle' },
    //     { id: 'llm', label: 'LLM', x: 40, y: 25, status: 'idle' },
    //     { id: 'output', label: 'Output', x: 75, y: 25, status: 'idle' },
    //   ],
    //   edges: [
    //     { from: 'input', to: 'llm' },
    //     { from: 'llm', to: 'output' },
    //   ],
    // },

    // ========== Configurable Agent Item ==========
    // {
    //   type: 'configurable-agent',
    //   config: {
    //     name: 'Agent 名称',
    //     layout: 'horizontal', // 'horizontal' | 'vertical' | 'tree' | 'center'
    //     components: [
    //       { id: 'input', type: 'input' },
    //       { id: 'llm', type: 'llm' },
    //       { id: 'tools', type: 'tool' },
    //       { id: 'output', type: 'output' },
    //     ],
    //     connections: [
    //       { from: 'input', to: 'llm', label: '问题' },
    //       { from: 'llm', to: 'tools', label: '调用' },
    //       { from: 'tools', to: 'llm', label: '结果', bidirectional: true },
    //       { from: 'llm', to: 'output', label: '回答' },
    //     ],
    //     executionSteps: [
    //       { nodeId: 'input', action: '接收输入', activateEdges: ['input-llm'] },
    //       { nodeId: 'llm', action: 'LLM 处理...', activateEdges: ['llm-tools'] },
    //       { nodeId: 'tools', action: '执行工具...', activateEdges: ['tools-llm'] },
    //       { nodeId: 'llm', action: '生成回答', activateEdges: ['llm-output'] },
    //       { nodeId: 'output', action: '输出结果' },
    //     ],
    //     defaultInput: '默认输入文本',
    //   },
    //   agentType: 'tool', // 'qa' | 'tool' | 'langchain'（可选）
    // },
  ],
} satisfies SlideContent
