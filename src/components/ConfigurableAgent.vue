<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import Diagram from './Diagram.vue'
import { convertToNodes, convertToEdges } from '@/utils/agentConfigConverter'
import type { AgentArchitectureConfig, AgentExecutionStep } from '@/types/agent-config'
import type { DiagramNode, DiagramEdge } from '@/types'

const props = defineProps<{
  config: AgentArchitectureConfig
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

// 对话历史
const messages = ref<{ role: 'user' | 'ai', content: string }[]>([])
const messagesBody = ref<HTMLElement | null>(null)

// Watch config changes
watch(() => props.config, (newConfig) => {
  nodes.value = convertToNodes(newConfig)
  userInput.value = newConfig.defaultInput || ''
}, { deep: true })

// 自动滚动到底部
watch(messages, () => {
  nextTick(() => {
    if (messagesBody.value) {
      messagesBody.value.scrollTop = messagesBody.value.scrollHeight
    }
  })
}, { deep: true })

// 重置图表节点（不清理消息）
function resetDiagram() {
  nodes.value.forEach(node => {
    node.status = 'idle'
  })
  diagramRef.value?.reset()
}

// 完全重置（图表 + 消息 + 状态）
function fullReset() {
  resetDiagram()
  messages.value = []
  result.value = ''
  currentAction.value = ''
  error.value = ''
}

// 执行 Agent（预设演示模式）
async function executeAgent() {
  if (isRunning.value || !userInput.value.trim()) return

  // 记录用户消息
  messages.value.push({ role: 'user', content: userInput.value })

  isRunning.value = true
  currentAction.value = ''
  result.value = ''
  error.value = ''
  resetDiagram()

  if (props.config.executionSteps) {
    await runPresetDemo(props.config.executionSteps)
  } else {
    error.value = '该演示需要配置 executionSteps 才能运行'
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
  messages.value.push({ role: 'ai', content: '演示完成' })
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
      <button @click="fullReset" :disabled="isRunning" class="reset-btn">
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

    <!-- 真实对话历史 -->
    <div class="agent-messages" v-if="messages.length > 0">
      <div class="messages-header">
        <span class="messages-title">Context Window</span>
        <span class="messages-count">{{ messages.length }} 条消息</span>
      </div>
      <div class="messages-body" ref="messagesBody">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="message"
          :class="[`msg-${msg.role}`, { 'msg-latest': i === messages.length - 1 }]"
        >
          <span class="msg-role">{{ msg.role === 'user' ? 'User' : 'AI' }}</span>
          <span class="msg-text">{{ msg.content }}</span>
        </div>
      </div>
    </div>

    <div class="agent-error" v-if="error">
      <div class="error-label">错误:</div>
      <div class="error-content">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
.configurable-agent {
  border: 1px solid rgba(66, 184, 131, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  background: #141428;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.agent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.agent-header h3 {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  background: rgba(66, 184, 131, 0.1);
  color: #42b883;
  border: 1px solid rgba(66, 184, 131, 0.2);
}

.status-badge.running {
  background: rgba(255, 193, 7, 0.15);
  color: #ffc107;
  border-color: rgba(255, 193, 7, 0.3);
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
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.85);
  transition: border-color 0.2s;
}

.agent-controls input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.agent-controls input:focus {
  outline: none;
  border-color: #42b883;
}

.agent-controls input:disabled {
  background: rgba(255, 255, 255, 0.03);
  opacity: 0.5;
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
  background: rgba(66, 184, 131, 0.3);
  cursor: not-allowed;
}

.agent-controls .reset-btn {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

.agent-controls .reset-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.85);
}

.agent-diagram {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.agent-status {
  padding: 0.75rem;
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.2);
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.status-label {
  font-size: 0.85rem;
  color: #ffc107;
  font-weight: bold;
}

.status-value {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.25rem;
}

/* ===== 对话历史 ===== */
.agent-messages {
  margin-top: 0.5rem;
  border: 1px solid rgba(66, 184, 131, 0.15);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
}

.messages-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: rgba(66, 184, 131, 0.06);
  border-bottom: 1px solid rgba(66, 184, 131, 0.1);
}

.messages-title {
  font-size: 0.8rem;
  color: #42b883;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.messages-count {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
}

.messages-body {
  max-height: 220px;
  overflow-y: auto;
  padding: 0.5rem;
}

.messages-body::-webkit-scrollbar {
  width: 4px;
}

.messages-body::-webkit-scrollbar-track {
  background: transparent;
}

.messages-body::-webkit-scrollbar-thumb {
  background: rgba(66, 184, 131, 0.2);
  border-radius: 2px;
}

.message {
  display: flex;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.2rem;
  font-size: 0.85rem;
  line-height: 1.4;
  border-left: 3px solid transparent;
}

.msg-user {
  border-left-color: #3b82f6;
  background: rgba(59, 130, 246, 0.04);
}

.msg-ai {
  border-left-color: #42b883;
  background: rgba(66, 184, 131, 0.04);
}

.msg-latest {
  background: rgba(255, 255, 255, 0.03);
}

.msg-role {
  font-weight: 700;
  font-size: 0.75rem;
  flex-shrink: 0;
  min-width: 32px;
}

.msg-user .msg-role { color: #3b82f6; }
.msg-ai .msg-role { color: #42b883; }

.msg-text {
  color: rgba(255, 255, 255, 0.8);
  word-break: break-word;
}

.agent-error {
  padding: 0.75rem;
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.2);
  border-radius: 6px;
}

.error-label {
  font-size: 0.85rem;
  color: #ff6b7a;
  font-weight: bold;
}

.error-content {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.25rem;
}
</style>
