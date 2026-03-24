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
