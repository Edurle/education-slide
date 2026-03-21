import { BaseAgent } from './BaseAgent.js'

/**
 * ToolAgent - Tool-calling Agent
 *
 * This agent demonstrates the ReAct pattern:
 * 1. Analyze user request
 * 2. Decide which tool to use
 * 3. Execute tool
 * 4. Process result through LLM
 * 5. Return final answer
 *
 * Flow: Input -> LLM -> Tools -> LLM -> Output
 */

interface Tool {
  name: string
  description: string
  execute: (params: Record<string, unknown>) => Promise<string>
}

export class ToolAgent extends BaseAgent {
  private apiKey: string
  private apiBase: string
  private model: string
  private tools: Map<string, Tool>

  constructor(apiKey?: string) {
    super()
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || ''
    this.apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1'
    this.model = process.env.MODEL || 'gpt-3.5-turbo'
    this.tools = this.initTools()
    if (!this.apiKey) {
      console.warn('ToolAgent: No OpenAI API key provided - running in demo mode')
    }
  }

  private initTools(): Map<string, Tool> {
    const tools = new Map<string, Tool>()

    // Weather tool (simulated)
    tools.set('get_weather', {
      name: 'get_weather',
      description: '获取指定城市的天气信息',
      execute: async (params) => {
        const city = params.city as string || '北京'
        await this.delay(800)
        return JSON.stringify({
          city,
          temperature: Math.floor(Math.random() * 20 + 10),
          condition: ['晴天', '多云', '小雨'][Math.floor(Math.random() * 3)],
          humidity: Math.floor(Math.random() * 40 + 40)
        })
      }
    })

    // Calculator tool
    tools.set('calculate', {
      name: 'calculate',
      description: '执行数学计算',
      execute: async (params) => {
        const expression = params.expression as string
        await this.delay(300)
        try {
          // Safe eval for basic math
          const result = Function(`"use strict"; return (${expression})`)()
          return String(result)
        } catch {
          return 'Error: Invalid expression'
        }
      }
    })

    // Search tool (simulated)
    tools.set('search', {
      name: 'search',
      description: '搜索信息',
      execute: async (params) => {
        const query = params.query as string
        await this.delay(1000)
        return `搜索结果: 关于"${query}"的相关信息...`
      }
    })

    return tools
  }

  async run(input: string): Promise<string> {
    try {
      // Step 1: Input processing
      this.sendNodeStatus('input', 'running')
      this.sendAction(`接收用户输入: "${input}"`)
      await this.delay(500)
      this.sendEdgeActivate('e1') // input -> llm
      this.sendNodeStatus('input', 'done')

      // Step 2: LLM decides which tool to use
      this.sendNodeStatus('llm', 'running')
      this.sendAction('LLM 分析用户意图，决定使用哪个工具...')

      const toolDecision = await this.decideTool(input)
      await this.delay(800)

      this.sendEdgeDeactivate('e1')

      // Step 3: Tool execution
      this.sendEdgeActivate('e2') // llm -> tools
      this.sendNodeStatus('tools', 'running')
      this.sendAction(`执行工具: ${toolDecision.toolName}`)

      const tool = this.tools.get(toolDecision.toolName)
      let toolResult = ''

      if (tool) {
        toolResult = await tool.execute(toolDecision.params)
        this.sendAction(`工具返回: ${toolResult}`)
      } else {
        toolResult = '未找到合适的工具'
      }

      this.sendNodeStatus('tools', 'done')
      this.sendEdgeDeactivate('e2')

      // Step 4: LLM processes tool result
      this.sendEdgeActivate('e2-reverse') // tools -> llm (feedback loop)
      this.sendNodeStatus('llm', 'running')
      this.sendAction('LLM 处理工具返回结果...')

      let finalResult: string

      if (this.apiKey) {
        // Real LLM call to format the response
        finalResult = await this.callLLMForFinalResult(input, toolResult)
      } else {
        // Demo mode
        await this.delay(600)
        finalResult = this.formatDemoResult(input, toolDecision.toolName, toolResult)
      }

      this.sendNodeStatus('llm', 'done')
      this.sendEdgeDeactivate('e2-reverse')
      this.sendEdgeActivate('e3') // llm -> output

      // Step 5: Output
      this.sendNodeStatus('output', 'running')
      this.sendAction('生成最终回答')
      await this.delay(300)
      this.sendNodeStatus('output', 'done')
      this.sendEdgeDeactivate('e3')

      this.sendResult(finalResult)
      return finalResult

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.sendError(errorMsg)
      throw error
    }
  }

  private async decideTool(input: string): Promise<{ toolName: string; params: Record<string, unknown> }> {
    const lowerInput = input.toLowerCase()

    // Weather keywords
    if (lowerInput.includes('天气') || lowerInput.includes('temperature') || lowerInput.includes('weather')) {
      const cityMatch = input.match(/(\w+)[的市]?天气/)
      return {
        toolName: 'get_weather',
        params: { city: cityMatch ? cityMatch[1] : '北京' }
      }
    }

    // Calculator keywords
    if (lowerInput.includes('计算') || /[\d+\-*/()]+/.test(input)) {
      const exprMatch = input.match(/[\d+\-*/().]+/)
      return {
        toolName: 'calculate',
        params: { expression: exprMatch ? exprMatch[0] : '1+1' }
      }
    }

    // Default to search
    return {
      toolName: 'search',
      params: { query: input }
    }
  }

  private async callLLMForFinalResult(originalInput: string, toolResult: string): Promise<string> {
    const response = await fetch(`${this.apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: '你是一个有帮助的AI助手。根据工具返回的结果，用自然的语言回答用户的问题。'
          },
          {
            role: 'user',
            content: `用户问题: ${originalInput}\n\n工具返回结果: ${toolResult}\n\n请基于这个结果给出回答。`
          }
        ],
        max_tokens: 500
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || '无法获取回复'
  }

  private formatDemoResult(input: string, toolName: string, toolResult: string): string {
    if (toolName === 'get_weather') {
      try {
        const weather = JSON.parse(toolResult)
        return `${weather.city}今天的天气是${weather.condition}，温度${weather.temperature}°C，湿度${weather.humidity}%。\n\n(这是模拟数据，配置OPENAI_API_KEY可获取真实LLM回答)`
      } catch {
        return toolResult
      }
    }

    if (toolName === 'calculate') {
      return `计算结果是: ${toolResult}\n\n(配置OPENAI_API_KEY可获取真实LLM回答)`
    }

    return `${toolResult}\n\n(配置OPENAI_API_KEY可获取真实LLM回答)`
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
