<script setup lang="ts">
import { ref } from 'vue'
import Slide from './components/Slide.vue'
import Diagram from './components/Diagram.vue'
import type { DiagramNode, DiagramEdge } from './types'
import { getAllSlides, courseConfig } from './slides'
import './style.css'

// 加载所有幻灯片
const slides = getAllSlides()

// 侧边栏状态
const showToc = ref(false)

// 切换侧边栏
function toggleToc() {
  showToc.value = !showToc.value
}

// 滚动到指定幻灯片
function scrollToSlide(index: number) {
  const slideElements = document.querySelectorAll('.slide-section')
  const targetElement = slideElements[index]
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    showToc.value = false
  }
}

// 获取幻灯片在全部幻灯片中的索引
function getSlideIndex(chapterId: string, slideId: string): number {
  return slides.findIndex(s => s.chapterId === chapterId && s.slideId === slideId)
}

// Diagram refs for testing
const testDiagramRef = ref<InstanceType<typeof Diagram> | null>(null)
const bidirectionalDiagramRef = ref<InstanceType<typeof Diagram> | null>(null)

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
    <header class="fixed-header">
      <button class="toc-toggle" @click="toggleToc" :class="{ active: showToc }">
        <span class="toc-icon">☰</span>
      </button>
      <h1>{{ courseConfig.title }}</h1>
    </header>

    <!-- 侧边栏目录 -->
    <aside class="toc-sidebar" :class="{ open: showToc }">
      <nav class="toc-nav">
        <div v-for="chapter in courseConfig.chapters" :key="chapter.id" class="toc-chapter">
          <div class="toc-chapter-title">{{ chapter.title }}</div>
          <ul class="toc-slides">
            <li
              v-for="slide in chapter.slides"
              :key="slide.id"
              class="toc-slide-item"
              @click="scrollToSlide(getSlideIndex(chapter.id, slide.id))"
            >
              {{ slide.title }}
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <main class="scroll-content">
      <!-- 所有幻灯片垂直排列 -->
      <section
        v-for="(slide, index) in slides"
        :key="`${slide.chapterId}-${slide.slideId}`"
        class="slide-section"
      >
        <div class="slide-header">
          <span class="slide-number">{{ index + 1 }}</span>
          <h2 v-if="slide.content.title" class="slide-title">{{ slide.content.title }}</h2>
        </div>
        <Slide :content="slide.content" />
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

/* 固定顶部标题栏 */
.fixed-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid #42b883;
}

.fixed-header h1 {
  color: #42b883;
  margin: 0;
  font-size: 1.2rem;
}

/* 目录切换按钮 */
.toc-toggle {
  position: absolute;
  left: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #42b883;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.toc-toggle:hover {
  background: #35a070;
}

.toc-toggle.active {
  background: #2c3e50;
}

/* 目录侧边栏 */
.toc-sidebar {
  position: fixed;
  right: -280px;
  top: 70px;
  width: 260px;
  height: calc(100vh - 90px);
  max-height: calc(100vh - 90px);
  background: white;
  border-left: 1px solid #e0e0e0;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 150;
  overflow-y: auto;
}

.toc-sidebar.open {
  right: 0;
}

/* 目录导航 */
.toc-nav {
  padding: 1rem;
}

.toc-chapter {
  margin-bottom: 0.5rem;
}

.toc-chapter-title {
  font-weight: bold;
  color: #42b883;
  padding: 0.5rem;
  font-size: 0.9rem;
  border-bottom: 1px solid #e0e0e0;
}

.toc-slide-item {
  display: block;
  padding: 0.5rem 0.75rem 0.5rem 1.5rem;
  color: #666;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.toc-slide-item:hover {
  background: rgba(66, 184, 131, 0.1);
  border-left-color: #42b883;
}

/* 滚动内容区 */
.scroll-content {
  padding-bottom: 4rem;
}

/* 幻灯片区块 */
.slide-section {
  padding: 2rem 1rem;
  border-bottom: 1px solid #e0e0e0;
}

/* 幻灯片标题 */
.slide-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.slide-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #42b883;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.9rem;
}

.slide-title {
  color: #333;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
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
