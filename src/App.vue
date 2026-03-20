<script setup lang="ts">
import { ref } from 'vue'
import Slide from './components/Slide.vue'
import Diagram from './components/Diagram.vue'
import type { SlideContent, DiagramNode, DiagramEdge } from './types'
import './style.css'

// Diagram refs for testing
const testDiagramRef = ref<InstanceType<typeof Diagram> | null>(null)
const bidirectionalDiagramRef = ref<InstanceType<typeof Diagram> | null>(null)

// 垂直布局示例
const introSlide: SlideContent = {
  layout: 'vertical',
  items: [
    {
      type: 'markdown',
      content: `# 第一章：什么是 Agent？

## 定义

Agent（智能体）是一个能够**感知环境**并**采取行动**以实现目标的系统。

核心特征：
- 自主性 (Autonomy)
- 反应性 (Reactivity)
- 主动性 (Pro-activeness)
- 社交性 (Social ability)

## 数学表示

Agent 可以形式化为：

$$
Agent: S \times A \rightarrow S
$$

其中 $S$ 是状态空间，$A$ 是动作空间。
`,
    },
    {
      type: 'markdown',
      content: `## 代码示例

\`\`\`typescript
interface Agent<State, Action> {
  // 感知当前状态
  perceive(): State

  // 决策下一步行动
  decide(state: State): Action

  // 执行行动
  act(action: Action): void
}
\`\`\`
`,
    },
  ],
}

// 水平布局示例
const horizontalSlide: SlideContent = {
  layout: 'horizontal',
  items: [
    {
      type: 'markdown',
      content: `## 特性一

**自主性**

Agent 能够独立运行，不需要人类持续干预。
`,
    },
    {
      type: 'markdown',
      content: `## 特性二

**反应性**

Agent 能够感知环境变化并及时响应。
`,
    },
    {
      type: 'markdown',
      content: `## 特性三

**主动性**

Agent 能够主动采取行动实现目标。
`,
    },
  ],
}

// 左右分栏布局示例
const architectureSlide: SlideContent = {
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# Agent 架构

## 基本组件

一个典型的 Agent 系统包含以下组件：

1. **Input** - 用户输入
2. **LLM** - 大语言模型
3. **Tools** - 外部工具
4. **Output** - 响应输出
`,
    },
    {
      type: 'diagram',
      nodes: [
        { id: 'input', label: 'Input', x: 100, y: 50, status: 'idle' },
        { id: 'llm', label: 'LLM', x: 250, y: 50, status: 'idle' },
        { id: 'tools', label: 'Tools', x: 250, y: 150, status: 'idle' },
        { id: 'output', label: 'Output', x: 400, y: 50, status: 'idle' },
      ],
      edges: [
        { from: 'input', to: 'llm' },
        { from: 'llm', to: 'tools' },
        { from: 'tools', to: 'llm' },
        { from: 'llm', to: 'output' },
      ],
    },
    {
      type: 'markdown',
      content: `### 数据流

1. **Input** - 用户输入或环境感知
2. **LLM** - 大语言模型进行推理
3. **Tools** - 调用外部工具
4. **Output** - 生成响应
`,
    },
  ],
}

const agentDemoSlide: SlideContent = {
  items: [
    {
      type: 'markdown',
      content: `# Agent 演示

## 实时交互

下面是一个 Agent 实时运行的示例：
`,
    },
    {
      type: 'agent',
      agentType: 'tool',
      input: '今天北京的天气如何？',
    },
    {
      type: 'markdown',
      content: `### 运行流程

Agent 会自动：
1. 解析用户意图
2. 选择合适的工具
3. 执行并返回结果
`,
    },
  ],
}

// 状态动画测试
const statusTestSlide: SlideContent = {
  layout: 'vertical',
  items: [
    {
      type: 'markdown',
      content: `# Diagram 状态测试

测试三种状态：idle（蓝灰）、running（黄色脉冲）、done（绿色）
`,
    },
    {
      type: 'diagram',
      nodes: [
        { id: 'idle1', label: 'Idle', x: 20, y: 30, status: 'idle' },
        { id: 'running1', label: 'Running', x: 50, y: 30, status: 'running' },
        { id: 'done1', label: 'Done', x: 80, y: 30, status: 'done' },
      ],
      edges: [
        { from: 'idle1', to: 'running1', label: 'start' },
        { from: 'running1', to: 'done1', label: 'complete' },
      ],
    },
  ],
}

// 边流动动画测试数据（带边 ID）
const flowTestNodes: DiagramNode[] = [
  { id: 'input', label: 'Input', x: 15, y: 40, status: 'idle' },
  { id: 'llm', label: 'LLM', x: 40, y: 40, status: 'idle' },
  { id: 'tools', label: 'Tools', x: 65, y: 80, status: 'idle' },
  { id: 'output', label: 'Output', x: 85, y: 40, status: 'idle' },
]

const flowTestEdges: DiagramEdge[] = [
  { id: 'e1', from: 'input', to: 'llm', label: '→LLM' },
  { id: 'e2', from: 'llm', to: 'tools', label: '→Tools' },
  { id: 'e3', from: 'llm', to: 'output', label: '→Output' },
]

// 双向边测试数据
const bidirectionalNodes: DiagramNode[] = [
  { id: 'a', label: 'A', x: 25, y: 40, status: 'idle' },
  { id: 'b', label: 'B', x: 75, y: 40, status: 'idle' },
]

const bidirectionalEdges: DiagramEdge[] = [
  { id: 'a-to-b', from: 'a', to: 'b', label: 'A→B' },
  { id: 'b-to-a', from: 'b', to: 'a', label: 'B→A' },
]

// 状态切换函数
function setNodeStatus(nodeId: string, status: 'idle' | 'running' | 'done') {
  testDiagramRef.value?.updateNodeStatus(nodeId, status)
}

// 边动画控制函数
function activateEdge(edgeId: string) {
  testDiagramRef.value?.activateEdge(edgeId)
}

function deactivateEdge(edgeId: string) {
  testDiagramRef.value?.deactivateEdge(edgeId)
}

function resetAllNodes() {
  testDiagramRef.value?.reset()
}

// 双向边测试函数
function setBidirectionalNodeStatus(nodeId: string, status: 'idle' | 'running' | 'done') {
  bidirectionalDiagramRef.value?.updateNodeStatus(nodeId, status)
}

function activateBidirectionalEdge(edgeId: string) {
  bidirectionalDiagramRef.value?.activateEdge(edgeId)
}

function deactivateBidirectionalEdge(edgeId: string) {
  bidirectionalDiagramRef.value?.deactivateEdge(edgeId)
}

function resetBidirectional() {
  bidirectionalDiagramRef.value?.reset()
}
</script>

<template>
  <div class="app">
    <header>
      <h1>Agent Education - Phase 2 架构图动画</h1>
    </header>

    <main>
      <!-- 垂直布局 -->
      <section class="slide-section">
        <div class="layout-label">布局: vertical（垂直堆叠）</div>
        <Slide :content="introSlide" />
      </section>

      <hr class="divider" />

      <!-- 水平布局 -->
      <section class="slide-section">
        <div class="layout-label">布局: horizontal（水平排列）</div>
        <Slide :content="horizontalSlide" />
      </section>

      <hr class="divider" />

      <!-- 左右分栏布局 -->
      <section class="slide-section">
        <div class="layout-label">布局: split-right（左右分栏）</div>
        <Slide :content="architectureSlide" />
      </section>

      <hr class="divider" />

      <!-- 默认布局 -->
      <section class="slide-section">
        <div class="layout-label">布局: vertical（默认）</div>
        <Slide :content="agentDemoSlide" />
      </section>

      <hr class="divider" />

      <!-- 状态测试 -->
      <section class="slide-section">
        <div class="layout-label">Diagram 状态测试</div>
        <Slide :content="statusTestSlide" />
      </section>

      <hr class="divider" />

      <!-- 边流动动画测试 -->
      <section class="slide-section">
        <div class="layout-label">边流动动画测试（选择性激活边）</div>
        <div class="flow-test-container">
          <Diagram ref="testDiagramRef" :nodes="flowTestNodes" :edges="flowTestEdges" />
          <div class="test-controls">
            <p><strong>节点状态控制（脉冲效果）：</strong></p>
            <div class="button-group">
              <span>Input:</span>
              <button @click="setNodeStatus('input', 'running')">Running</button>
              <button @click="setNodeStatus('input', 'done')">Done</button>
            </div>
            <div class="button-group">
              <span>LLM:</span>
              <button @click="setNodeStatus('llm', 'running')">Running</button>
              <button @click="setNodeStatus('llm', 'done')">Done</button>
            </div>
            <div class="button-group">
              <span>Tools:</span>
              <button @click="setNodeStatus('tools', 'running')">Running</button>
              <button @click="setNodeStatus('tools', 'done')">Done</button>
            </div>
            <div class="button-group">
              <span>Output:</span>
              <button @click="setNodeStatus('output', 'running')">Running</button>
              <button @click="setNodeStatus('output', 'done')">Done</button>
            </div>

            <hr class="control-divider" />

            <p><strong>边动画控制（选择性激活）：</strong></p>
            <div class="button-group">
              <button class="edge-btn" @click="activateEdge('e1')">激活 e1</button>
              <button class="edge-btn off" @click="deactivateEdge('e1')">停止 e1</button>
            </div>
            <div class="button-group">
              <button class="edge-btn" @click="activateEdge('e2')">激活 e2</button>
              <button class="edge-btn off" @click="deactivateEdge('e2')">停止 e2</button>
            </div>
            <div class="button-group">
              <button class="edge-btn" @click="activateEdge('e3')">激活 e3</button>
              <button class="edge-btn off" @click="deactivateEdge('e3')">停止 e3</button>
            </div>

            <button class="reset-btn" @click="resetAllNodes">Reset All</button>
          </div>
        </div>
      </section>

      <hr class="divider" />

      <!-- 双向边测试 -->
      <section class="slide-section">
        <div class="layout-label">双向边测试（自动曲线避免重叠）</div>
        <div class="flow-test-container">
          <Diagram ref="bidirectionalDiagramRef" :nodes="bidirectionalNodes" :edges="bidirectionalEdges" />
          <div class="test-controls">
            <p><strong>双向边自动使用曲线避免重叠：</strong></p>
            <div class="button-group">
              <span>A:</span>
              <button @click="setBidirectionalNodeStatus('a', 'running')">Running</button>
              <button @click="setBidirectionalNodeStatus('a', 'done')">Done</button>
            </div>
            <div class="button-group">
              <span>B:</span>
              <button @click="setBidirectionalNodeStatus('b', 'running')">Running</button>
              <button @click="setBidirectionalNodeStatus('b', 'done')">Done</button>
            </div>

            <hr class="control-divider" />

            <p><strong>单独控制边：</strong></p>
            <div class="button-group">
              <button class="edge-btn" @click="activateBidirectionalEdge('a-to-b')">激活 A→B</button>
              <button class="edge-btn off" @click="deactivateBidirectionalEdge('a-to-b')">停止</button>
            </div>
            <div class="button-group">
              <button class="edge-btn" @click="activateBidirectionalEdge('b-to-a')">激活 B→A</button>
              <button class="edge-btn off" @click="deactivateBidirectionalEdge('b-to-a')">停止</button>
            </div>

            <button class="reset-btn" @click="resetBidirectional">Reset All</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

header {
  text-align: center;
  padding: 1rem 0;
  background: rgba(66, 184, 131, 0.1);
  border-bottom: 2px solid #42b883;
}

header h1 {
  color: #42b883;
  margin: 0;
}

.slide-section {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.layout-label {
  text-align: center;
  padding: 0.5rem;
  background: rgba(66, 184, 131, 0.2);
  color: #42b883;
  font-weight: bold;
  font-size: 0.9rem;
}

.divider {
  border: none;
  height: 2px;
  background: linear-gradient(to right, transparent, #42b883, transparent);
  margin: 0;
}

.flow-test-container {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  flex: 1;
}

.flow-test-container > :first-child {
  flex: 1;
  min-height: 250px;
}

.test-controls {
  width: 280px;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.test-controls p {
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
}

.control-divider {
  border: none;
  height: 1px;
  background: #ddd;
  margin: 0.75rem 0;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.button-group span {
  width: 60px;
  font-weight: bold;
  font-size: 0.85rem;
}

.button-group button {
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  background: #42b883;
  color: white;
  transition: background 0.2s;
}

.button-group button:hover {
  background: #35a070;
}

.button-group button.edge-btn {
  background: #ffc107;
  color: #333;
}

.button-group button.edge-btn:hover {
  background: #e0a800;
}

.button-group button.edge-btn.off {
  background: #6b7280;
  color: white;
}

.button-group button.edge-btn.off:hover {
  background: #4b5563;
}

.reset-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #6b7280;
  color: white;
  font-size: 0.85rem;
}

.reset-btn:hover {
  background: #4b5563;
}
</style>
