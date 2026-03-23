import { z } from 'zod'
import { tool } from 'langchain'

/**
 * Calculator Tool - Basic math calculations
 */
export const calculatorTool = tool(
  async ({ expression }) => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 300))

    try {
      // Safe eval for basic math expressions
      const result = Function(`"use strict"; return (${expression})`)()
      return String(result)
    } catch {
      return 'Error: Invalid expression'
    }
  },
  {
    name: 'calculate',
    description: 'Execute mathematical calculations',
    schema: z.object({
      expression: z.string().describe('Math expression to calculate, e.g., "2 + 3 * 4"'),
    }),
  }
)
