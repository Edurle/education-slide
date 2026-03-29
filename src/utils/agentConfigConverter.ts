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
  input: { bg: '#1a2a3e', border: '#42b883' },
  output: { bg: '#1a2e2a', border: '#42b883' },
  llm: { bg: '#2a2a1e', border: '#ffc107' },
  tool: { bg: '#2e1a2a', border: '#e91e63' },
  router: { bg: '#1e2a3e', border: '#42b883' },
  memory: { bg: '#1a2e2e', border: '#00bcd4' },
  custom: { bg: '#1e1e3e', border: '#9e9e9e' }
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

  // 计算间距，使组件均匀分布在 5-75% 范围内（留出节点宽度空间）
  const spacing = n === 1 ? 0 : 70 / (n - 1)

  components.forEach((comp, index) => {
    positions.set(comp.id, {
      x: 5 + (n === 1 ? 35 : index * spacing),
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
 * 中心布局：LLM 和 Output 在中间，其他节点分布在两侧
 */
function calculateCenterLayout(
  components: AgentComponent[]
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()

  // 分类组件
  const leftComponents = components.filter(c =>
    c.type === 'input' || c.type === 'memory' || c.type === 'router'
  )
  const rightComponents = components.filter(c =>
    c.type === 'tool' || c.type === 'custom'
  )

  // 中心列：LLM 在上 (25%)，Output 在下 (75%)
  const llm = components.find(c => c.type === 'llm')
  const output = components.find(c => c.type === 'output')
  if (llm) positions.set(llm.id, { x: 50, y: 25 })
  if (output) positions.set(output.id, { x: 50, y: 75 })

  // 左侧列：竖向均匀分布 (20%-80%)
  if (leftComponents.length > 0) {
    const ySpacing = leftComponents.length === 1 ? 0 : 60 / (leftComponents.length - 1)
    leftComponents.forEach((comp, i) => {
      positions.set(comp.id, {
        x: 20,
        y: 20 + (leftComponents.length === 1 ? 30 : i * ySpacing)
      })
    })
  }

  // 右侧列：竖向均匀分布 (20%-75%)
  if (rightComponents.length > 0) {
    const ySpacing = rightComponents.length === 1 ? 0 : 55 / (rightComponents.length - 1)
    rightComponents.forEach((comp, i) => {
      positions.set(comp.id, {
        x: 78,
        y: 20 + (rightComponents.length === 1 ? 30 : i * ySpacing)
      })
    })
  }

  // 未分类组件放中间
  components.forEach(comp => {
    if (!positions.has(comp.id)) {
      positions.set(comp.id, { x: 50, y: 50 })
    }
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
    positions.set(components[outputIdx].id, { x: 75, y: 50 })
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
    case 'center':
      positions = calculateCenterLayout(config.components)
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
