import { BaseAgent } from './BaseAgent.js'
import { allTools } from './tools/index.js'

/**
 * LangChainAgent - Uses official LangChain createAgent() with middleware
 *
 * This agent uses the modern LangChain API:
 * - createAgent() for agent creation
 * - createMiddleware() for SSE tracing
 * - tool() for tool definitions
 *
 * Flow: Input -> LLM -> Tools (via middleware) -> LLM -> Output
 */

// Dynamic imports for LangChain (to handle cases where it might not be available)
let createAgent: any = null
let createMiddleware: any = null
let ChatOpenAI: any = null

async function loadLangChain() {
  try {
    const langchain = await import('langchain')
    createAgent = langchain.createAgent
    createMiddleware = langchain.createMiddleware

    const openai = await import('@langchain/openai')
    ChatOpenAI = openai.ChatOpenAI

    return true
  } catch (error) {
    console.warn('LangChainAgent: Failed to load LangChain modules:', error)
    return false
  }
}

export class LangChainAgent extends BaseAgent {
  private agent: any = null
  private apiKey: string
  private apiBase: string
  private modelName: string
  private langchainLoaded: boolean = false

  constructor() {
    super()
    this.apiKey = process.env.OPENAI_API_KEY || ''
    this.apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1'
    this.modelName = process.env.MODEL || 'gpt-3.5-turbo'

    if (!this.apiKey) {
      console.warn('LangChainAgent: No OpenAI API key provided - running in demo mode')
    }
  }

  private async initAgent() {
    if (this.agent) return

    this.langchainLoaded = await loadLangChain()
    if (!this.langchainLoaded || !this.apiKey) {
      console.log('LangChainAgent: Running in demo mode')
      return
    }

    try {
      // Create SSE middleware for tracing
      const sseMiddleware = this.createSSEMiddleware()

      // Create model instance with proper configuration
      const model = new ChatOpenAI({
        model: this.modelName,
        temperature: 0.1,
        apiKey: this.apiKey,
        configuration: {
          baseURL: this.apiBase,
        },
      })

      console.log('LangChainAgent: Creating agent with tools:', allTools.map((t: any) => t.name))

      // Create agent with middleware
      this.agent = createAgent({
        model,
        tools: allTools,
        middleware: [sseMiddleware],
        systemPrompt: 'You are a helpful AI assistant. Use the available tools to help answer questions. Be concise and accurate.',
      })

      console.log('LangChainAgent: Agent created successfully')
    } catch (error) {
      console.error('LangChainAgent: Failed to create agent:', error)
      this.agent = null
    }
  }

  private createSSEMiddleware() {
    const self = this // Capture SSE callback via closure

    return createMiddleware({
      name: 'sse-tracing',

      // Wrap model calls
      wrapModelCall: async (request: any, handler: (req: any) => Promise<any>) => {
        self.sendNodeStatus('llm', 'running')
        self.sendAction('LLM 正在思考...')

        try {
          const result = await handler(request)
          self.sendNodeStatus('llm', 'done')
          return result
        } catch (error) {
          self.sendNodeStatus('llm', 'done')
          throw error
        }
      },

      // Wrap tool calls - this is where we intercept tool execution
      wrapToolCall: async (request: any, handler: (req: any) => Promise<any>) => {
        const toolName = request.toolCall?.name || 'unknown'

        self.sendNodeStatus('tools', 'running')
        self.sendEdgeActivate('e2')
        self.sendAction(`执行工具: ${toolName}`)

        try {
          const result = await handler(request)

          self.sendNodeStatus('tools', 'done')
          self.sendEdgeDeactivate('e2')
          self.sendAction(`工具 ${toolName} 执行完成`)

          return result
        } catch (error) {
          self.sendNodeStatus('tools', 'done')
          self.sendEdgeDeactivate('e2')
          throw error
        }
      },
    })
  }

  async run(input: string): Promise<string> {
    try {
      // Initialize agent if needed
      await this.initAgent()

      // Step 1: Input processing
      this.sendNodeStatus('input', 'running')
      this.sendAction(`接收用户输入: "${input}"`)
      await this.delay(500)
      this.sendEdgeActivate('e1') // input -> llm
      this.sendNodeStatus('input', 'done')

      let finalResult: string

      if (this.agent) {
        console.log('LangChainAgent: Invoking agent with input:', input)

        // Real LangChain agent execution
        const result = await this.agent.invoke({
          messages: [{ role: 'user', content: input }],
        })

        console.log('LangChainAgent: Agent result:', result)

        // Extract final message content
        const lastMessage = result.messages?.[result.messages.length - 1]
        finalResult = typeof lastMessage?.content === 'string'
          ? lastMessage.content
          : JSON.stringify(lastMessage?.content) || 'No response generated'

        this.sendEdgeDeactivate('e1')
      } else {
        // Demo mode - simulate agent behavior
        finalResult = await this.runDemoMode(input)
      }

      // Step: Output
      this.sendEdgeActivate('e3') // llm -> output
      this.sendNodeStatus('output', 'running')
      this.sendAction('生成最终回答')
      await this.delay(300)
      this.sendNodeStatus('output', 'done')
      this.sendEdgeDeactivate('e3')

      this.sendResult(finalResult)
      return finalResult

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('LangChainAgent error:', error)
      this.sendError(errorMsg)
      throw error
    }
  }

  private async runDemoMode(input: string): Promise<string> {
    this.sendNodeStatus('llm', 'running')
    this.sendAction('LLM 分析用户意图（演示模式）...')
    await this.delay(800)

    // Simulate tool decision based on input
    const lowerInput = input.toLowerCase()
    let toolResult = ''

    this.sendEdgeDeactivate('e1')

    if (lowerInput.includes('天气') || lowerInput.includes('weather')) {
      this.sendEdgeActivate('e2')
      this.sendNodeStatus('tools', 'running')
      this.sendAction('执行工具: get_weather (模拟)')

      const cityMatch = input.match(/(\w+)[的市]?天气/)
      const city = cityMatch ? cityMatch[1] : 'Beijing'
      await this.delay(800)

      const weatherData = {
        city,
        temperature: Math.floor(Math.random() * 20 + 10),
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 40 + 40)
      }
      toolResult = JSON.stringify(weatherData)

      this.sendAction(`工具返回: ${toolResult}`)
      this.sendNodeStatus('tools', 'done')
      this.sendEdgeDeactivate('e2')

      // LLM processes result
      this.sendEdgeActivate('e2-reverse')
      this.sendNodeStatus('llm', 'running')
      this.sendAction('LLM 处理工具返回结果...')
      await this.delay(600)

      toolResult = `${weatherData.city}的天气是${weatherData.condition}，温度${weatherData.temperature}°C，湿度${weatherData.humidity}%。`
    } else if (lowerInput.includes('计算') || /[\d+\-*/()]+/.test(input)) {
      this.sendEdgeActivate('e2')
      this.sendNodeStatus('tools', 'running')
      this.sendAction('执行工具: calculate (模拟)')

      const exprMatch = input.match(/[\d+\-*/().]+/)
      const expression = exprMatch ? exprMatch[0] : '1+1'
      await this.delay(300)

      try {
        const calcResult = Function(`"use strict"; return (${expression})`)()
        toolResult = `计算结果: ${calcResult}`
      } catch {
        toolResult = '计算错误: 无效表达式'
      }

      this.sendAction(`工具返回: ${toolResult}`)
      this.sendNodeStatus('tools', 'done')
      this.sendEdgeDeactivate('e2')

      this.sendEdgeActivate('e2-reverse')
      this.sendNodeStatus('llm', 'running')
      this.sendAction('LLM 处理工具返回结果...')
      await this.delay(600)
    } else {
      // Default response
      this.sendEdgeActivate('e2')
      this.sendNodeStatus('tools', 'running')
      this.sendAction('执行工具: search (模拟)')
      await this.delay(1000)

      toolResult = `关于"${input}"的搜索结果...`
      this.sendAction(`工具返回: ${toolResult}`)
      this.sendNodeStatus('tools', 'done')
      this.sendEdgeDeactivate('e2')

      this.sendEdgeActivate('e2-reverse')
      this.sendNodeStatus('llm', 'running')
      this.sendAction('LLM 处理工具返回结果...')
      await this.delay(600)
    }

    this.sendNodeStatus('llm', 'done')
    this.sendEdgeDeactivate('e2-reverse')

    return `${toolResult}\n\n(演示模式 - 配置 OPENAI_API_KEY 可获取真实 LLM 回答)`
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
