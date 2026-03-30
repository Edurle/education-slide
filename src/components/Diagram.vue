<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { animate } from 'animejs'
import type { DiagramNode, DiagramEdge } from '@/types'

// Props
interface Props {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  nodeSize?: { width: number; height: number }
  colors?: {
    idle?: { bg: string; border: string }
    running?: { bg: string; border: string }
    done?: { bg: string; border: string }
  }
}

const props = withDefaults(defineProps<Props>(), {
  nodeSize: () => ({ width: 120, height: 50 })
})

// Default colors
const defaultColors = {
  idle: { bg: '#1e1e3e', border: '#4a4a6c' },
  running: { bg: '#2e2a1a', border: '#ffc107' },
  done: { bg: '#1a3e2a', border: '#42b883' }
}

const colors = computed(() => ({
  idle: props.colors?.idle || defaultColors.idle,
  running: props.colors?.running || defaultColors.running,
  done: props.colors?.done || defaultColors.done
}))

// Reactive node states (copy from props)
const nodeStates = ref<Map<string, DiagramNode>>(new Map())

// Detect bidirectional edges
function getBidirectionalPairs(): Set<string> {
  const pairs = new Set<string>()
  const edgeKeys = new Set<string>()

  props.edges.forEach((edge) => {
    edgeKeys.add(`${edge.from}->${edge.to}`)
  })

  props.edges.forEach((edge) => {
    const reverse = `${edge.to}->${edge.from}`
    if (edgeKeys.has(reverse)) {
      pairs.add(`${edge.from}->${edge.to}`)
      pairs.add(reverse)
    }
  })

  return pairs
}

// Get edge ID
function getEdgeId(edge: DiagramEdge, index: number): string {
  return edge.id || `edge-${index}`
}

// Computed edge data with pre-calculated points
const edgeData = computed(() => {
  const bidirectionalPairs = getBidirectionalPairs()

  return props.edges.map((edge, idx) => {
    const id = getEdgeId(edge, idx)
    const isBidirectional = bidirectionalPairs.has(`${edge.from}->${edge.to}`)
    const lineType = edge.lineType || (isBidirectional ? 'curve' : 'straight')

    const points = getArrowPoints(edge, isBidirectional)

    return {
      id,
      edge,
      lineType,
      points,
      isBidirectional
    }
  }).filter(e => e.points !== null)
})

// Animation instances
const pulseAnimations = new Map<string, ReturnType<typeof animate>[]>()
const flowAnimations = new Map<string, ReturnType<typeof animate>>()

// Container ref
const containerRef = ref<HTMLDivElement | null>(null)
const svgRef = ref<SVGSVGElement | null>(null)

// Container dimensions
const containerWidth = ref(800)
const containerHeight = ref(280)

// Initialize node states
function initNodeStates() {
  nodeStates.value.clear()
  props.nodes.forEach(node => {
    nodeStates.value.set(node.id, { ...node, status: node.status || 'idle' })
  })
}

// Calculate actual pixel positions from percentage
// Clamps positions so nodes never overflow container
function getNodePosition(node: DiagramNode) {
  const maxX = Math.max(0, containerWidth.value - props.nodeSize.width)
  const maxY = Math.max(0, containerHeight.value - props.nodeSize.height)
  return {
    x: Math.min((node.x / 100) * containerWidth.value, maxX),
    y: Math.min((node.y / 100) * containerHeight.value, maxY)
  }
}

// Get node center for arrow positioning
function getNodeCenter(node: DiagramNode) {
  const pos = getNodePosition(node)
  return {
    x: pos.x + props.nodeSize.width / 2,
    y: pos.y + props.nodeSize.height / 2
  }
}

// Calculate arrow points
function getArrowPoints(edge: DiagramEdge, isBidirectional: boolean = false) {
  const fromNode = nodeStates.value.get(edge.from)
  const toNode = nodeStates.value.get(edge.to)

  if (!fromNode || !toNode) return null

  const from = getNodeCenter(fromNode)
  const to = getNodeCenter(toNode)

  // Calculate angle
  const angle = Math.atan2(to.y - from.y, to.x - from.x)

  // Offset from center to edge of node
  const halfWidth = props.nodeSize.width / 2
  const halfHeight = props.nodeSize.height / 2

  // Curve offset for bidirectional edges
  const curveOffset = isBidirectional ? 20 : 0

  // Start point (edge of source node)
  const startX = from.x + Math.cos(angle) * halfWidth
  const startY = from.y + Math.sin(angle) * halfHeight

  // End point (edge of target node)
  const endX = to.x - Math.cos(angle) * (halfWidth + 8) // 8 for arrow
  const endY = to.y - Math.sin(angle) * (halfHeight + 8)

  // Control point for curve (perpendicular to the line)
  const midX = (startX + endX) / 2
  const midY = (startY + endY) / 2
  const perpAngle = angle + Math.PI / 2
  const ctrlX = midX + Math.cos(perpAngle) * curveOffset
  const ctrlY = midY + Math.sin(perpAngle) * curveOffset

  return { x1: startX, y1: startY, x2: endX, y2: endY, angle, ctrlX, ctrlY }
}

// Get color for status
function getStatusColors(status: 'idle' | 'running' | 'done') {
  return colors.value[status]
}

// Animate status change
function animateStatusChange(nodeId: string, newStatus: 'idle' | 'running' | 'done') {
  const nodeEl = svgRef.value?.querySelector(`[data-node-id="${nodeId}"]`)
  const textEl = svgRef.value?.querySelector(`[data-text-id="${nodeId}"]`)
  if (!nodeEl || !textEl) return

  const { bg, border } = getStatusColors(newStatus)

  animate(nodeEl, {
    fill: bg,
    stroke: border,
    duration: 600,
    ease: 'inOutQuad'
  })

  // Start or stop pulse animation
  if (newStatus === 'running') {
    startPulseAnimation(nodeId)
  } else {
    stopPulseAnimation(nodeId)
  }
}

// Start pulse animation for running state
function startPulseAnimation(nodeId: string) {
  stopPulseAnimation(nodeId)

  const pulseGroup = svgRef.value?.querySelector(`[data-pulse-group="${nodeId}"]`)
  if (!pulseGroup) return

  const pulses = pulseGroup.querySelectorAll('.pulse-ring')
  const animations: ReturnType<typeof animate>[] = []

  pulses.forEach((pulse, index) => {
    // Reset pulse state
    const pulseEl = pulse as SVGElement
    pulseEl.style.opacity = '0'
    pulseEl.setAttribute('r', '0')

    const anim = animate(pulseEl, {
      opacity: [0.85, 0],
      r: [0, 70],
      duration: 1500,
      delay: index * 500,
      ease: 'outQuad',
      loop: true
    })
    animations.push(anim)
  })

  pulseAnimations.set(nodeId, animations)
}

// Stop pulse animation
function stopPulseAnimation(nodeId: string) {
  const animations = pulseAnimations.get(nodeId)
  if (animations) {
    animations.forEach(anim => anim.pause())
    pulseAnimations.delete(nodeId)
  }

  // Reset pulse rings
  const pulseGroup = svgRef.value?.querySelector(`[data-pulse-group="${nodeId}"]`)
  if (pulseGroup) {
    pulseGroup.querySelectorAll('.pulse-ring').forEach(pulse => {
      const pulseEl = pulse as SVGElement
      pulseEl.style.opacity = '0'
      pulseEl.setAttribute('r', '0')
    })
  }
}

// Start arrow flow animation
function startArrowFlowAnimation(edgeId: string) {
  stopArrowFlowAnimation(edgeId)

  const lineEl = svgRef.value?.querySelector(`[data-edge-id="${edgeId}"]`) as SVGElement
  if (!lineEl) return

  // Set up dash pattern
  lineEl.setAttribute('stroke-dasharray', '8 4')

  const animation = animate(lineEl, {
    strokeDashoffset: [0, -24],
    duration: 1000,
    ease: 'linear',
    loop: true
  })

  flowAnimations.set(edgeId, animation)
}

// Stop arrow flow animation
function stopArrowFlowAnimation(edgeId: string) {
  const animation = flowAnimations.get(edgeId)
  if (animation) {
    animation.pause()
    flowAnimations.delete(edgeId)
  }
}

// Update container size
function updateContainerSize() {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.clientWidth
    containerHeight.value = Math.max(containerRef.value.clientHeight, 245)
  }
}

// Resize observer
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  initNodeStates()
  updateContainerSize()

  // Set up resize observer
  resizeObserver = new ResizeObserver(() => {
    updateContainerSize()
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  // Clean up animations
  pulseAnimations.forEach((_, id) => stopPulseAnimation(id))
  flowAnimations.forEach((_, id) => stopArrowFlowAnimation(id))

  // Clean up observer
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

// Watch for node changes
watch(() => props.nodes, () => {
  initNodeStates()
}, { deep: true })

// Exposed methods
function highlightNode(id: string) {
  const nodeEl = svgRef.value?.querySelector(`[data-node-id="${id}"]`)
  if (!nodeEl) return

  animate(nodeEl, {
    scale: [1, 1.1, 1],
    duration: 600,
    ease: 'inOutQuad'
  })
}

function updateNodeStatus(id: string, status: 'idle' | 'running' | 'done') {
  const node = nodeStates.value.get(id)
  if (!node) return

  node.status = status
  animateStatusChange(id, status)
}

function activateEdge(edgeId: string) {
  startArrowFlowAnimation(edgeId)
}

function deactivateEdge(edgeId: string) {
  stopArrowFlowAnimation(edgeId)
}

function reset() {
  nodeStates.value.forEach((node, id) => {
    node.status = 'idle'
    animateStatusChange(id, 'idle')
  })
  // Stop all edge animations
  flowAnimations.forEach((_, id) => stopArrowFlowAnimation(id))
}

defineExpose({
  highlightNode,
  updateNodeStatus,
  activateEdge,
  deactivateEdge,
  reset
})
</script>

<template>
  <div ref="containerRef" class="diagram-container">
    <svg
      ref="svgRef"
      :width="containerWidth"
      :height="containerHeight"
      :viewBox="`0 0 ${containerWidth} ${containerHeight}`"
    >
      <defs>
        <!-- Arrow marker -->
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#ffffff" />
        </marker>
        <!-- Running arrow marker -->
        <marker
          id="arrowhead-running"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#ffc107" />
        </marker>
      </defs>

      <!-- Edges -->
      <g class="edges">
        <template v-for="item in edgeData" :key="item.id">
          <!-- Curve for bidirectional -->
          <path
            v-if="item.lineType === 'curve'"
            :data-edge-id="item.id"
            :d="`M ${item.points!.x1} ${item.points!.y1} Q ${item.points!.ctrlX} ${item.points!.ctrlY} ${item.points!.x2} ${item.points!.y2}`"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            marker-end="url(#arrowhead)"
          />
          <!-- Straight line -->
          <line
            v-else
            :data-edge-id="item.id"
            :x1="item.points!.x1"
            :y1="item.points!.y1"
            :x2="item.points!.x2"
            :y2="item.points!.y2"
            stroke="#ffffff"
            stroke-width="2"
            marker-end="url(#arrowhead)"
          />
          <!-- Edge label -->
          <text
            v-if="item.edge.label"
            :x="item.points!.ctrlX || (item.points!.x1 + item.points!.x2) / 2"
            :y="(item.points!.ctrlY || (item.points!.y1 + item.points!.y2) / 2) - 12"
            font-size="11"
            fill="#ffffff"
            text-anchor="middle"
          >
            {{ item.edge.label }}
          </text>
        </template>
      </g>

      <!-- Nodes -->
      <g class="nodes">
        <template v-for="[id, node] in nodeStates" :key="id">
          <!-- Pulse rings for running state -->
          <g :data-pulse-group="id">
            <circle
              v-for="i in 3"
              :key="`pulse-${i}`"
              class="pulse-ring"
              :cx="getNodePosition(node).x + nodeSize.width / 2"
              :cy="getNodePosition(node).y + nodeSize.height / 2"
              r="0"
              fill="none"
              :stroke="getStatusColors(node.status || 'idle').border"
              stroke-width="4"
              opacity="0"
            />
          </g>
          <!-- Node rect -->
          <rect
            :data-node-id="id"
            :x="getNodePosition(node).x"
            :y="getNodePosition(node).y"
            :width="nodeSize.width"
            :height="nodeSize.height"
            :fill="getStatusColors(node.status || 'idle').bg"
            :stroke="getStatusColors(node.status || 'idle').border"
            stroke-width="2"
            rx="8"
            ry="8"
          />
          <foreignObject
            :x="getNodePosition(node).x + 2"
            :y="getNodePosition(node).y + 2"
            :width="nodeSize.width - 4"
            :height="nodeSize.height - 4"
          >
            <div class="node-label" :data-text-id="id">
              {{ node.label }}
            </div>
          </foreignObject>
        </template>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.diagram-container {
  width: 100%;
  min-height: 245px;
  background: #141428;
  border-radius: 8px;
  border: 1px solid rgba(66, 184, 131, 0.15);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

svg {
  display: block;
}

.node-label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 13px;
  line-height: 1.3;
  color: #ffffff;
  overflow: hidden;
  word-break: break-all;
  white-space: pre-line;
}
</style>
