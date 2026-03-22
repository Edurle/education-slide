import type { DiagramNode, DiagramEdge } from '@/types'
import type { AgentArchitectureConfig, AgentComponent, AgentComponentType } from '@/types/agent-config'

/** 组件类型到默认标签的映射 */
const DEFAULT_LABELS: Record<AgentComponentType, string> = {
  input: 'Input',
  output: 'Output',
  llm: 'LLM',
  tool: 'Tools',
  router: 'Router',
  memory: 'Memory',
  custom: 'Node'
}

/** 组件类型到颜色的映射 */
export const COMPONENT_COLORS: Record<AgentComponentType, { bg: string; border: string }> = {
  input: { bg: '#e3f2fd', border: '#2196f3' },
  output: { bg: '#e8f5e9', border: '#4caf50' },
  llm: { bg: '#fff3e0', border: '#ff9800' },
  tool: { bg: '#fce4ec', border: '#e91e63' },
  router: { bg: '#f3e5f5', border: '#9c27b0' },
  memory: { bg: '#e0f7fa', border: '#00bcd4' },
  custom: { bg: '#f5f5f5', border: '#9e9e9e' }
}

/**
 * 计算组件的水平布局位置
 */
function calculateHorizontalLayout(
  components: AgentComponent[]
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()
  const n = components.length

  if (n === 0) return positions

  // 计算间距，使组件均匀分布在 10-90% 范围内
  const spacing = n === 1 ? 0 : 80 / (n - 1)

  components.forEach((comp, index) => {
    positions.set(comp.id, {
      x: 10 + (n === 1 ? 40 : index * spacing),
      y: 50
    })
  })

  return positions
}

/**
 * 计算组件的垂直布局位置
 */
function calculateVerticalLayout(
  components: AgentComponent[]
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()
  const n = components.length

  if (n === 0) return positions

  const spacing = n === 1 ? 0 : 70 / (n - 1)

  components.forEach((comp, index) => {
    positions.set(comp.id, {
      x: 50,
      y: 15 + (n === 1 ? 35 : index * spacing)
    })
  })

  return positions
}

/**
 * 简单树形布局（用于有层级关系的组件）
 * 假设第一个是 input，最后一个是 output
 */
function calculateTreeLayout(
  components: AgentComponent[]
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()
  const n = components.length

  if (n === 0) return positions

  // 将组件按层级分组
  const inputIdx = components.findIndex(c => c.type === 'input')
  const outputIdx = components.findIndex(c => c.type === 'output')

  // 其他组件放在中间层
  const middleComponents = components.filter((_, i) => i !== inputIdx && i !== outputIdx)
  const middleCount = middleComponents.length

  // Input 在左侧中间
  if (inputIdx >= 0) {
    positions.set(components[inputIdx].id, { x: 10, y: 50 })
  }

  // Output 在右侧中间
  if (outputIdx >= 0) {
    positions.set(components[outputIdx].id, { x: 85, y: 50 })
  }

  // 中间组件均匀分布
  if (middleCount > 0) {
    const ySpacing = middleCount === 1 ? 0 : 60 / (middleCount - 1)
    middleComponents.forEach((comp, index) => {
      positions.set(comp.id, {
        x: 50,
        y: 20 + (middleCount === 1 ? 30 : index * ySpacing)
      })
    })
  }

  // 处理未分配位置的组件
  components.forEach(comp => {
    if (!positions.has(comp.id)) {
      const idx = components.findIndex(c => c.id === comp.id)
      positions.set(comp.id, {
        x: 30 + (idx * 15),
        y: 30 + (idx * 10)
      })
    }
  })

  return positions
}

/**
 * 将配置转换为 DiagramNode 数组
 */
export function convertToNodes(
  config: AgentArchitectureConfig
): DiagramNode[] {
  const layout = config.layout || 'horizontal'
  let positions: Map<string, { x: number; y: number }>

  switch (layout) {
    case 'horizontal':
      positions = calculateHorizontalLayout(config.components)
      break
    case 'vertical':
      positions = calculateVerticalLayout(config.components)
      break
    case 'tree':
      positions = calculateTreeLayout(config.components)
      break
    default:
      positions = calculateHorizontalLayout(config.components)
  }

  return config.components.map(comp => {
    const pos = positions.get(comp.id) || { x: 50, y: 50 }
    return {
      id: comp.id,
      label: comp.label || DEFAULT_LABELS[comp.type],
      x: pos.x,
      y: pos.y,
      status: 'idle' as const
    }
  })
}

/**
 * 将配置转换为 DiagramEdge 数组
 */
export function convertToEdges(
  config: AgentArchitectureConfig
): DiagramEdge[] {
  return config.connections.map((conn) => ({
    id: `${conn.from}-${conn.to}`,
    from: conn.from,
    to: conn.to,
    label: conn.label,
    lineType: 'curve' as const
  }))
}

/**
 * 获取组件的颜色配置
 */
export function getComponentColors(type: AgentComponentType) {
  return COMPONENT_COLORS[type] || COMPONENT_COLORS.custom
}
