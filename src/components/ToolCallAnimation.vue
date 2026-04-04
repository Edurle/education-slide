<script setup lang="ts">
import { ref, computed } from 'vue'

const currentStep = ref(0)
const actionText = ref('点击"开始演示"查看工具调用流程')

// Node positions — single LLM in center
const nodes = {
  input: { x: 100, y: 120, label: '用户提问', type: 'input' },
  llm: { x: 400, y: 120, label: 'LLM', type: 'llm' },
  tool: { x: 700, y: 120, label: '天气工具', type: 'tool' },
  output: { x: 400, y: 340, label: '最终回答', type: 'output' }
}

// Edge definitions
const edges = [
  { id: 'input-llm', from: 'input', to: 'llm' },
  { id: 'llm-tool', from: 'llm', to: 'tool' },
  { id: 'tool-llm', from: 'tool', to: 'llm' },
  { id: 'llm-output', from: 'llm', to: 'output' }
]

// Node status
const nodeStatus = ref<Record<string, 'idle' | 'running' | 'done'>>({
  input: 'idle',
  llm: 'idle',
  tool: 'idle',
  output: 'idle'
})

// Active edges
const activeEdges = ref<Set<string>>(new Set())

// JSON card visibility
const showJsonCard = ref(false)
const jsonLineVisible = ref([false, false, false, false])
const showExecLine = ref(false)

// Tool result visibility
const showToolResult = ref(false)

// Final answer visibility
const showFinalAnswer = ref(false)

// Helper to get node stroke color
const getNodeStroke = (nodeType: string) => {
  const colors: Record<string, string> = {
    llm: '#8b5cf6',
    tool: '#f59e0b',
    input: '#0ea5e9',
    output: '#0ea5e9'
  }
  return colors[nodeType] || '#8b5cf6'
}

// Helper to get node fill based on status
const getNodeFill = (status: 'idle' | 'running' | 'done') => {
  const fills = {
    idle: '#1e1e3a',
    running: '#8b5cf6',
    done: '#22c55e'
  }
  return fills[status]
}

// Get edge path
const getEdgePath = (fromId: string, toId: string) => {
  const from = nodes[fromId as keyof typeof nodes]
  const to = nodes[toId as keyof typeof nodes]

  if (!from || !to) return ''

  // tool→llm: curved return path going below
  if (fromId === 'tool' && toId === 'llm') {
    return `M ${from.x} ${from.y + 30} C ${from.x} ${from.y + 120}, ${to.x} ${to.y + 120}, ${to.x} ${to.y + 30}`
  }

  // Horizontal edges
  if (Math.abs(from.y - to.y) < 50) {
    return `M ${from.x + 60} ${from.y} L ${to.x - 60} ${to.y}`
  }

  // Vertical edges
  return `M ${from.x} ${from.y + 30} L ${to.x} ${to.y - 30}`
}

// Get arrow points
function getArrowPoints(fromId: string, toId: string): string {
  const from = nodes[fromId as keyof typeof nodes]
  const to = nodes[toId as keyof typeof nodes]
  if (!from || !to) return '0,0 0,0 0,0'

  // tool→llm: arrow points up at llm bottom
  if (fromId === 'tool' && toId === 'llm') {
    const arrowX = to.x
    const arrowY = to.y + 30
    return `${arrowX},${arrowY} ${arrowX - 5},${arrowY + 8} ${arrowX + 5},${arrowY + 8}`
  }

  // Horizontal edges
  if (Math.abs(from.y - to.y) < 50) {
    const arrowX = to.x - 60
    const arrowY = to.y
    return `${arrowX},${arrowY} ${arrowX - 8},${arrowY - 5} ${arrowX - 8},${arrowY + 5}`
  }

  // Vertical edges (top to bottom)
  const arrowX = to.x
  const arrowY = to.y - 30
  return `${arrowX},${arrowY} ${arrowX - 5},${arrowY - 8} ${arrowX + 5},${arrowY - 8}`
}

// Animation steps
const animationSteps = [
  async () => {
    // Step 1: User input
    actionText.value = '用户输入问题'
    nodeStatus.value.input = 'running'
    await delay(500)
    nodeStatus.value.input = 'done'
    await delay(300)
  },
  async () => {
    // Step 2: LLM generates JSON
    actionText.value = 'LLM 并不直接调用工具，而是输出一段 JSON 指令'
    nodeStatus.value.llm = 'running'
    activeEdges.value.add('input-llm')
    await delay(400)
    showJsonCard.value = true
    await delay(200)
    jsonLineVisible.value[0] = true
    await delay(200)
    jsonLineVisible.value[1] = true
    await delay(200)
    jsonLineVisible.value[2] = true
    await delay(200)
    jsonLineVisible.value[3] = true
    await delay(200)
    showExecLine.value = true
    await delay(300)
  },
  async () => {
    // Step 3: Tool execution
    actionText.value = '框架解析 JSON，调用 get_weather 工具'
    activeEdges.value.delete('input-llm')
    activeEdges.value.add('llm-tool')
    nodeStatus.value.llm = 'done'
    nodeStatus.value.tool = 'running'
    await delay(500)
    showToolResult.value = true
    nodeStatus.value.tool = 'done'
    await delay(300)
  },
  async () => {
    // Step 4: Tool result returns to LLM
    actionText.value = 'LLM 接收工具返回的结果'
    activeEdges.value.delete('llm-tool')
    activeEdges.value.add('tool-llm')
    nodeStatus.value.llm = 'running'
    await delay(500)
    nodeStatus.value.llm = 'done'
    await delay(300)
  },
  async () => {
    // Step 5: Final answer
    actionText.value = 'LLM 基于工具结果生成自然语言回答'
    activeEdges.value.delete('tool-llm')
    activeEdges.value.add('llm-output')
    await delay(400)
    showFinalAnswer.value = true
    nodeStatus.value.output = 'running'
    await delay(300)
    nodeStatus.value.output = 'done'
    actionText.value = '演示完成'
  }
]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const startAnimation = async () => {
  resetAnimation()

  for (let i = 0; i < animationSteps.length; i++) {
    currentStep.value = i + 1
    await animationSteps[i]()
    await delay(800)
  }
}

const resetAnimation = () => {
  currentStep.value = 0
  nodeStatus.value = {
    input: 'idle',
    llm: 'idle',
    tool: 'idle',
    output: 'idle'
  }
  activeEdges.value.clear()
  actionText.value = '点击"开始演示"查看工具调用流程'
  showJsonCard.value = false
  jsonLineVisible.value = [false, false, false, false]
  showExecLine.value = false
  showToolResult.value = false
  showFinalAnswer.value = false
}

// Computed for LLM spinning gear
const llmRunning = computed(() => nodeStatus.value.llm === 'running')

// Running state for button disable
const isRunning = computed(() => currentStep.value > 0 && !actionText.value.includes('完成'))
</script>

<template>
  <div class="tool-call-animation">
    <!-- SVG Canvas -->
    <svg viewBox="0 0 900 480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Glow filter -->
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- HUD Corner Decorations -->
      <path d="M 20 20 L 20 50 M 20 20 L 50 20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <path d="M 880 20 L 880 50 M 880 20 L 850 20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <path d="M 20 460 L 20 430 M 20 460 L 50 460" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <path d="M 880 460 L 880 430 M 880 460 L 850 460" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>

      <!-- Edges -->
      <g class="edges">
        <g v-for="edge in edges" :key="edge.id">
          <!-- Base edge -->
          <path
            :d="getEdgePath(edge.from, edge.to)"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            stroke-width="2"
          />
          <!-- Active edge overlay -->
          <path
            v-if="activeEdges.has(edge.id)"
            :d="getEdgePath(edge.from, edge.to)"
            fill="none"
            stroke="#fbbf24"
            stroke-width="2"
            stroke-dasharray="8 4"
            filter="url(#glow)"
            class="active-edge"
          />
          <!-- Arrow -->
          <polygon
            :points="getArrowPoints(edge.from, edge.to)"
            :fill="activeEdges.has(edge.id) ? '#fbbf24' : 'rgba(255,255,255,0.12)'"
          />
        </g>
      </g>

      <!-- Nodes -->
      <g class="nodes">
        <!-- Input Node -->
        <g :class="['node', `node-${nodeStatus.input}`]">
          <rect
            :x="nodes.input.x - 60"
            :y="nodes.input.y - 30"
            width="120"
            height="60"
            rx="8"
            :fill="getNodeFill(nodeStatus.input)"
            :stroke="getNodeStroke(nodes.input.type)"
            stroke-width="2"
          />
          <text
            :x="nodes.input.x"
            :y="nodes.input.y + 5"
            text-anchor="middle"
            fill="white"
            font-size="14"
            font-weight="500"
          >
            {{ nodes.input.label }}
          </text>
        </g>

        <!-- Question bubble (step 1) -->
        <g v-if="currentStep >= 1 && nodeStatus.input === 'done'" class="question-bubble">
          <rect x="60" y="170" width="100" height="40" rx="6" fill="#1a1a30" stroke="#0ea5e9" stroke-width="1"/>
          <text x="110" y="185" text-anchor="middle" fill="#0ea5e9" font-size="10">北京今天</text>
          <text x="110" y="200" text-anchor="middle" fill="#0ea5e9" font-size="10">天气如何？</text>
        </g>

        <!-- LLM Node -->
        <g :class="['node', `node-${nodeStatus.llm}`]">
          <rect
            :x="nodes.llm.x - 60"
            :y="nodes.llm.y - 30"
            width="120"
            height="60"
            rx="8"
            :fill="getNodeFill(nodeStatus.llm)"
            :stroke="getNodeStroke(nodes.llm.type)"
            stroke-width="2"
          />
          <!-- Spinning gear when running -->
          <g v-if="llmRunning" :transform="`translate(${nodes.llm.x}, ${nodes.llm.y})`">
            <circle r="15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
            <g class="gear-spin">
              <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
              <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
              <line x1="-6" y1="-6" x2="6" y2="6" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
              <line x1="6" y1="-6" x2="-6" y2="6" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
            </g>
          </g>
          <text
            v-else
            :x="nodes.llm.x"
            :y="nodes.llm.y + 5"
            text-anchor="middle"
            fill="white"
            font-size="14"
            font-weight="500"
          >
            {{ nodes.llm.label }}
          </text>
        </g>

        <!-- JSON Card (step 2) -->
        <g v-if="showJsonCard" class="json-card">
          <rect x="320" y="170" width="180" height="100" rx="8" fill="#1a1a30" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="340" y="190" font-size="10" fill="#8b5cf6" font-family="monospace">{</text>
          <text v-if="jsonLineVisible[0]" x="350" y="210" font-size="10" fill="rgba(255,255,255,0.7)" font-family="monospace" class="fade-in">"name": <tspan fill="#fbbf24">"get_weather"</tspan>,</text>
          <text v-if="jsonLineVisible[1]" x="350" y="230" font-size="10" fill="rgba(255,255,255,0.7)" font-family="monospace" class="fade-in">"arguments": {</text>
          <text v-if="jsonLineVisible[2]" x="370" y="250" font-size="10" fill="rgba(255,255,255,0.7)" font-family="monospace" class="fade-in"><tspan fill="#22c55e">"city"</tspan>: <tspan fill="#fbbf24">"北京"</tspan></text>
          <text v-if="jsonLineVisible[3]" x="350" y="260" font-size="10" fill="rgba(255,255,255,0.7)" font-family="monospace" class="fade-in">}</text>
          <text x="340" y="262" font-size="10" fill="#8b5cf6" font-family="monospace">}</text>
          <!-- Exec line -->
          <text v-if="showExecLine" x="330" y="285" font-size="9" fill="#0ea5e9" font-family="monospace" class="fade-in">
            execute("get_weather", {city: "北京"}) → 调用工具
          </text>
        </g>

        <!-- Tool Node -->
        <g :class="['node', `node-${nodeStatus.tool}`]">
          <rect
            :x="nodes.tool.x - 60"
            :y="nodes.tool.y - 30"
            width="120"
            height="60"
            rx="8"
            :fill="getNodeFill(nodeStatus.tool)"
            :stroke="getNodeStroke(nodes.tool.type)"
            stroke-width="2"
          />
          <text
            :x="nodes.tool.x"
            :y="nodes.tool.y + 5"
            text-anchor="middle"
            fill="white"
            font-size="14"
            font-weight="500"
          >
            {{ nodes.tool.label }}
          </text>
        </g>

        <!-- Tool result (step 3) -->
        <g v-if="showToolResult" class="tool-result">
          <rect x="640" y="170" width="120" height="35" rx="6" fill="#1a1a30" stroke="#f59e0b" stroke-width="1"/>
          <text x="700" y="192" text-anchor="middle" fill="#22c55e" font-size="11" font-family="monospace">
            {temperature: 22, condition: "晴天"}
          </text>
        </g>

        <!-- Output Node -->
        <g :class="['node', `node-${nodeStatus.output}`]">
          <rect
            :x="nodes.output.x - 60"
            :y="nodes.output.y - 30"
            width="120"
            height="60"
            rx="8"
            :fill="getNodeFill(nodeStatus.output)"
            :stroke="getNodeStroke(nodes.output.type)"
            stroke-width="2"
          />
          <text
            :x="nodes.output.x"
            :y="nodes.output.y + 5"
            text-anchor="middle"
            fill="white"
            font-size="14"
            font-weight="500"
          >
            {{ nodes.output.label }}
          </text>
        </g>

        <!-- Final answer (step 5) -->
        <g v-if="showFinalAnswer" class="final-answer">
          <rect x="330" y="390" width="140" height="35" rx="6" fill="#1a1a30" stroke="#22c55e" stroke-width="1"/>
          <text x="400" y="412" text-anchor="middle" fill="#22c55e" font-size="11">
            北京今天晴天，22°C
          </text>
        </g>
      </g>
    </svg>

    <!-- Controls -->
    <div class="controls">
      <button class="btn-start" @click="startAnimation" :disabled="isRunning">开始演示</button>
      <button class="btn-reset" @click="resetAnimation" :disabled="isRunning">重置</button>
      <div class="action-text">{{ actionText }}</div>
    </div>
  </div>
</template>

<style scoped>
.tool-call-animation {
  background: #0d0d1a;
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

svg {
  width: 100%;
  height: auto;
  display: block;
}

/* Node transitions */
.node rect {
  transition: fill 0.3s ease, stroke 0.3s ease;
}

.node-running rect {
  filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
}

.node-done rect {
  filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.4));
}

/* Active edge animation */
.active-edge {
  animation: flowDash 1s linear infinite;
}

@keyframes flowDash {
  to {
    stroke-dashoffset: -12;
  }
}

/* Gear spinning animation */
.gear-spin {
  animation: spin 2s linear infinite;
  transform-origin: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Fade in animation */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Question bubble, JSON card, Tool result, Final answer animations */
.question-bubble,
.json-card,
.tool-result,
.final-answer {
  animation: fadeIn 0.4s ease-in;
}

/* Controls */
.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.btn-start {
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn-start:hover {
  background: #7c3aed;
  transform: translateY(-1px);
}

.btn-start:active {
  transform: translateY(0);
}

.btn-start:disabled {
  background: rgba(139, 92, 246, 0.3);
  cursor: not-allowed;
  transform: none;
}

.btn-reset {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn-reset:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

.btn-reset:active {
  transform: translateY(0);
}

.btn-reset:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.action-text {
  flex: 1;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid #fbbf24;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  border-radius: 0 4px 4px 0;
}

/* Monospace for code elements */
text[font-family="monospace"] {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
}
</style>
