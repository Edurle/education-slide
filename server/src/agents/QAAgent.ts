import { BaseAgent } from './BaseAgent.js'

/**
 * QAAgent - Simple Question-Answer Agent
 *
 * This agent demonstrates a basic LLM interaction pattern:
 * 1. Receive user question
 * 2. Process through LLM
 * 3. Return answer
 *
 * Flow: Input -> LLM -> Output
 */
export class QAAgent extends BaseAgent {
  private apiKey: string
  private apiBase: string
  private model: string

  constructor(apiKey?: string) {
    super()
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || ''
    this.apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1'
    this.model = process.env.MODEL || 'gpt-3.5-turbo'
    if (!this.apiKey) {
      console.warn('QAAgent: No OpenAI API key provided')
    }
  }

  async run(input: string): Promise<string> {
    try {
      // Step 1: Input processing
      this.sendNodeStatus('input', 'running')
      this.sendAction(`接收用户输入: "${input}"`)
      await this.delay(500)
      this.sendEdgeActivate('e1') // input -> llm
      this.sendNodeStatus('input', 'done')

      // Step 2: LLM processing
      this.sendNodeStatus('llm', 'running')
      this.sendAction('正在调用 LLM 进行推理...')

      let result: string

      if (this.apiKey) {
        // Real LLM call
        const response = await fetch(`${this.apiBase}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: this.model,
            messages: [
              { role: 'system', content: '你是一个有帮助的AI助手，请用简洁的语言回答问题。' },
              { role: 'user', content: input }
            ],
            max_tokens: 500
          })
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`API error ${response.status}: ${errorText}`)
        }

        const data = await response.json()
        result = data.choices[0]?.message?.content || '无法获取回复'
      } else {
        // Demo mode - simulate response
        await this.delay(1500)
        result = this.getDemoResponse(input)
      }

      this.sendEdgeDeactivate('e1')
      this.sendEdgeActivate('e3') // llm -> output
      this.sendNodeStatus('llm', 'done')

      // Step 3: Output
      this.sendNodeStatus('output', 'running')
      this.sendAction('生成最终回答')
      await this.delay(300)
      this.sendNodeStatus('output', 'done')
      this.sendEdgeDeactivate('e3')

      this.sendResult(result)
      return result

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      this.sendError(errorMsg)
      throw error
    }
  }

  private getDemoResponse(input: string): string {
    const responses: Record<string, string> = {
      'hello': '你好！我是AI助手，有什么可以帮助你的吗？',
      '什么是agent': 'Agent（智能体）是一个能够感知环境并采取行动以实现目标的自主系统。它具有自主性、反应性、主动性和社交性等特征。',
      'default': `这是一个模拟的AI回答。您的问题是："${input}"\n\n在实际运行中，这里会显示LLM生成的真实回答。请配置OPENAI_API_KEY环境变量以启用真实的LLM调用。`
    }

    const lowerInput = input.toLowerCase()
    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return value
      }
    }
    return responses.default
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
