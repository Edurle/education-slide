import { z } from 'zod'
import { tool } from 'langchain'

/**
 * Weather Tool - Simulated weather information
 */
export const weatherTool = tool(
  async ({ city }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    return JSON.stringify({
      city,
      temperature: Math.floor(Math.random() * 20 + 10),
      condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
      humidity: Math.floor(Math.random() * 40 + 40)
    })
  },
  {
    name: 'get_weather',
    description: 'Get weather information for a city',
    schema: z.object({
      city: z.string().describe('City name'),
    }),
  }
)
