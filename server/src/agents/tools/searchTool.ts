import { z } from 'zod'
import { tool } from 'langchain'

/**
 * Search Tool - Simulated search functionality
 */
export const searchTool = tool(
  async ({ query }) => {
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return `Search results: Information about "${query}"...`
  },
  {
    name: 'search',
    description: 'Search for information on the internet',
    schema: z.object({
      query: z.string().describe('Search query'),
    }),
  }
)
