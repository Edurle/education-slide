<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Diagram from './Diagram.vue'
import { runAgent } from '@/api/agent'
import type { DiagramNode, DiagramEdge, NodeStatus } from '@/types'

// Props
interface Props {
  agentType?: 'qa' | 'tool'
  input?: string
}

const props = withDefaults(defineProps<Props>(), {
  agentType: 'tool',
  input: '今天北京的天气如何？'
})

// Refs
const diagramRef = ref<InstanceType<typeof Diagram> | null>(null)
const userInput = ref(props.input)
const isRunning = ref(false)
const currentAction = ref('')
const result = ref('')
const error = ref('')

// Diagram nodes for Tool Agent (more complex flow)
const toolAgentNodes = ref<DiagramNode[]>([
  { id: 'input', label: 'Input', x: 10, y: 40, status: 'idle' },
  { id: 'llm', label: 'LLM', x: 35, y: 40, status: 'idle' },
  { id: 'tools', label: 'Tools', x: 60, y: 40, status: 'idle' },
  { id: 'output', label: 'Output', x: 85, y: 40, status: 'idle' }
])

// Diagram nodes for QA Agent (simpler flow)
const qaAgentNodes = ref<DiagramNode[]>([
  { id: 'input', label: 'Input', x: 15, y: 40, status: 'idle' },
  { id: 'llm', label: 'LLM', x: 50, y: 40, status: 'idle' },
  { id: 'output', label: 'Output', x: 85, y: 40, status: 'idle' }
])

// Edges for Tool Agent
const toolAgentEdges: DiagramEdge[] = [
  { id: 'e1', from: 'input', to: 'llm', label: '问题' },
  { id: 'e2', from: 'llm', to: 'tools', label: '调用' },
  { id: 'e2-reverse', from: 'tools', to: 'llm', label: '结果' },
  { id: 'e3', from: 'llm', to: 'output', label: '回答' }
]

// Edges for QA Agent
const qaAgentEdges: DiagramEdge[] = [
  { id: 'e1', from: 'input', to: 'llm', label: '问题' },
  { id: 'e3', from: 'llm', to: 'output', label: '回答' }
]

// Current diagram data based on agent type
const nodes = computed(() =>
  props.agentType === 'qa' ? qaAgentNodes.value : toolAgentNodes.value
)

const edges = computed(() =>
  props.agentType === 'qa' ? qaAgentEdges : toolAgentEdges
)

// Agent type label
const agentTypeLabel = computed(() =>
  props.agentType === 'qa' ? '问答 Agent' : '工具调用 Agent'
)

// Reset diagram
function resetDiagram() {
  const targetNodes = props.agentType === 'qa' ? qaAgentNodes : toolAgentNodes
  targetNodes.value.forEach(node => {
    node.status = 'idle'
  })
  diagramRef.value?.reset()
}

// Execute agent
async function executeAgent() {
  if (isRunning.value || !userInput.value.trim()) return

  isRunning.value = true
  currentAction.value = ''
  result.value = ''
  error.value = ''

  // Reset diagram before starting
  resetDiagram()

  try {
    await runAgent({
      agentType: props.agentType,
      input: userInput.value,
      onNodeStatus: (nodeId: string, status: NodeStatus) => {
        // Update local node state
        const targetNodes = props.agentType === 'qa' ? qaAgentNodes : toolAgentNodes
        const node = targetNodes.value.find(n => n.id === nodeId)
        if (node) {
          node.status = status
        }
        // Also trigger Diagram animation
        diagramRef.value?.updateNodeStatus(nodeId, status)
      },
      onEdgeActivate: (edgeId: string) => {
        diagramRef.value?.activateEdge(edgeId)
      },
      onEdgeDeactivate: (edgeId: string) => {
        diagramRef.value?.deactivateEdge(edgeId)
      },
      onAction: (action: string) => {
        currentAction.value = action
      },
      onResult: (res: string) => {
        result.value = res
      },
      onError: (err: string) => {
        error.value = err
      },
      onComplete: () => {
        isRunning.value = false
        currentAction.value = '完成'
      }
    })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error'
    isRunning.value = false
  }
}

// Watch for input prop changes
watch(() => props.input, (newInput) => {
  if (newInput) {
    userInput.value = newInput
  }
})
</script>

<template>
  <div class="agent-demo">
    <div class="agent-header">
      <h3>{{ agentTypeLabel }}</h3>
      <span class="status-badge" :class="{ running: isRunning }">
        {{ isRunning ? '运行中...' : '就绪' }}
      </span>
    </div>

    <div class="agent-controls">
      <input
        v-model="userInput"
        type="text"
        placeholder="输入你的问题..."
        :disabled="isRunning"
        @keyup.enter="executeAgent"
      />
      <button @click="executeAgent" :disabled="isRunning || !userInput.trim()">
        {{ isRunning ? '运行中' : '执行' }}
      </button>
      <button @click="resetDiagram" :disabled="isRunning" class="reset-btn">
        重置
      </button>
    </div>

    <div class="agent-diagram">
      <Diagram
        ref="diagramRef"
        :nodes="nodes"
        :edges="edges"
      />
    </div>

    <div class="agent-status" v-if="currentAction">
      <div class="status-label">当前状态:</div>
      <div class="status-value">{{ currentAction }}</div>
    </div>

    <div class="agent-result" v-if="result">
      <div class="result-label">结果:</div>
      <div class="result-content">{{ result }}</div>
    </div>

    <div class="agent-error" v-if="error">
      <div class="error-label">错误:</div>
      <div class="error-content">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
.agent-demo {
  border: 2px solid #42b883;
  border-radius: 12px;
  padding: 1.5rem;
  background: linear-gradient(to bottom, #fafafa, #f0f0f0);
}

.agent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.agent-header h3 {
  margin: 0;
  color: #2c3e50;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  background: #e8ecf0;
  color: #6b7280;
}

.status-badge.running {
  background: #fff3cd;
  color: #856404;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.agent-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.agent-controls input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

.agent-controls input:focus {
  outline: none;
  border-color: #42b883;
}

.agent-controls input:disabled {
  background: #f5f5f5;
}

.agent-controls button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  background: #42b883;
  color: white;
  transition: background 0.2s;
}

.agent-controls button:hover:not(:disabled) {
  background: #35a070;
}

.agent-controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.agent-controls .reset-btn {
  background: #6b7280;
}

.agent-controls .reset-btn:hover:not(:disabled) {
  background: #4b5563;
}

.agent-diagram {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.agent-status {
  padding: 0.75rem;
  background: #fff3cd;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.status-label {
  font-size: 0.85rem;
  color: #856404;
  font-weight: bold;
}

.status-value {
  font-size: 0.95rem;
  color: #333;
  margin-top: 0.25rem;
}

.agent-result {
  padding: 0.75rem;
  background: #d4edda;
  border-radius: 6px;
}

.result-label {
  font-size: 0.85rem;
  color: #155724;
  font-weight: bold;
}

.result-content {
  font-size: 0.95rem;
  color: #333;
  margin-top: 0.25rem;
  white-space: pre-wrap;
}

.agent-error {
  padding: 0.75rem;
  background: #f8d7da;
  border-radius: 6px;
}

.error-label {
  font-size: 0.85rem;
  color: #721c24;
  font-weight: bold;
}

.error-content {
  font-size: 0.95rem;
  color: #333;
  margin-top: 0.25rem;
}
</style>
