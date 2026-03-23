<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Diagram from './Diagram.vue'
import { runAgent } from '@/api/agent'
import { convertToNodes, convertToEdges } from '@/utils/agentConfigConverter'
import type { AgentArchitectureConfig, AgentExecutionStep } from '@/types/agent-config'
import type { DiagramNode, DiagramEdge, NodeStatus } from '@/types'

const props = defineProps<{
  config: AgentArchitectureConfig
  agentType?: 'qa' | 'tool' | 'langchain'
}>()

// 转换配置为 Diagram 数据
const nodes = ref<DiagramNode[]>(convertToNodes(props.config))
const edges = computed<DiagramEdge[]>(() => convertToEdges(props.config))

// 运行时状态
const diagramRef = ref<InstanceType<typeof Diagram> | null>(null)
const userInput = ref(props.config.defaultInput || '')
const isRunning = ref(false)
const currentAction = ref('')
const result = ref('')
const error = ref('')

// Watch config changes
watch(() => props.config, (newConfig) => {
  nodes.value = convertToNodes(newConfig)
  userInput.value = newConfig.defaultInput || ''
}, { deep: true })

// 重置图表
function resetDiagram() {
  nodes.value.forEach(node => {
    node.status = 'idle'
  })
  diagramRef.value?.reset()
}

// 执行 Agent（两种模式）
async function executeAgent() {
  if (isRunning.value || !userInput.value.trim()) return

  isRunning.value = true
  currentAction.value = ''
  result.value = ''
  error.value = ''
  resetDiagram()

  // 模式1：使用预设执行步骤演示（无服务端）
  if (props.config.executionSteps && !props.agentType) {
    await runPresetDemo(props.config.executionSteps)
    return
  }

  // 模式2：连接服务端 SSE
  try {
    await runAgent({
      agentType: props.agentType || 'tool',
      input: userInput.value,
      onNodeStatus: (nodeId: string, status: NodeStatus) => {
        const node = nodes.value.find(n => n.id === nodeId)
        if (node) node.status = status
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

// 预设演示模式（不连接服务端）
async function runPresetDemo(steps: AgentExecutionStep[]) {
  for (const step of steps) {
    currentAction.value = step.action

    // 激活节点
    const node = nodes.value.find(n => n.id === step.nodeId)
    if (node) {
      node.status = 'running'
      diagramRef.value?.updateNodeStatus(step.nodeId, 'running')
    }

    // 激活边
    step.activateEdges?.forEach(edgeId => {
      diagramRef.value?.activateEdge(edgeId)
    })

    // 模拟处理时间
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 完成节点
    if (node) {
      node.status = 'done'
      diagramRef.value?.updateNodeStatus(step.nodeId, 'done')
    }
  }

  isRunning.value = false
  currentAction.value = '完成'
  result.value = '演示完成'
}
</script>

<template>
  <div class="configurable-agent">
    <div class="agent-header">
      <h3>{{ config.name }}</h3>
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
      <Diagram ref="diagramRef" :nodes="nodes" :edges="edges" />
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
.configurable-agent {
  border: 2px solid #9c27b0;
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
  border-color: #9c27b0;
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
  background: #9c27b0;
  color: white;
  transition: background 0.2s;
}

.agent-controls button:hover:not(:disabled) {
  background: #7b1fa2;
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
