export { weatherTool } from './weatherTool.js'
export { calculatorTool } from './calculatorTool.js'
export { searchTool } from './searchTool.js'

import { weatherTool } from './weatherTool.js'
import { calculatorTool } from './calculatorTool.js'
import { searchTool } from './searchTool.js'

// Export as array for createAgent
export const allTools = [weatherTool, calculatorTool, searchTool]
