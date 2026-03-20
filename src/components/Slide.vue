<script setup lang="ts">
import type { SlideContent } from '@/types'
import MarkdownRenderer from './MarkdownRenderer.vue'
import Diagram from './Diagram.vue'

defineProps<{
  content: SlideContent
}>()
</script>

<template>
  <div class="slide" :class="`layout-${content.layout || 'vertical'}`">
    <!-- split-right 布局：第一项左侧，其余右侧垂直堆叠 -->
    <template v-if="content.layout === 'split-right' && content.items.length > 0">
      <div class="split-left">
        <MarkdownRenderer
          v-if="content.items[0].type === 'markdown'"
          :content="content.items[0].content"
          class="slide-item"
        />
        <Diagram
          v-else-if="content.items[0].type === 'diagram'"
          :nodes="content.items[0].nodes"
          :edges="content.items[0].edges"
          class="slide-item"
        />
        <div
          v-else-if="content.items[0].type === 'agent'"
          class="slide-item agent-placeholder"
        >
          <p class="placeholder-text">[AgentDemo - Phase 3]</p>
          <pre>{{ JSON.stringify(content.items[0], null, 2) }}</pre>
        </div>
      </div>
      <div class="split-right">
        <template v-for="(item, index) in content.items.slice(1)" :key="index">
          <MarkdownRenderer
            v-if="item.type === 'markdown'"
            :content="item.content"
            class="slide-item"
          />
          <Diagram
            v-else-if="item.type === 'diagram'"
            :nodes="item.nodes"
            :edges="item.edges"
            class="slide-item"
          />
          <div
            v-else-if="item.type === 'agent'"
            class="slide-item agent-placeholder"
          >
            <p class="placeholder-text">[AgentDemo - Phase 3]</p>
            <pre>{{ JSON.stringify(item, null, 2) }}</pre>
          </div>
        </template>
      </div>
    </template>

    <!-- 其他布局：vertical / horizontal -->
    <template v-else>
      <template v-for="(item, index) in content.items" :key="index">
        <MarkdownRenderer
          v-if="item.type === 'markdown'"
          :content="item.content"
          class="slide-item"
        />
        <Diagram
          v-else-if="item.type === 'diagram'"
          :nodes="item.nodes"
          :edges="item.edges"
          class="slide-item"
        />
        <div
          v-else-if="item.type === 'agent'"
          class="slide-item agent-placeholder"
        >
          <p class="placeholder-text">[AgentDemo - Phase 3]</p>
          <pre>{{ JSON.stringify(item, null, 2) }}</pre>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>
.slide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* 垂直布局 */
.layout-vertical {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 水平布局 */
.layout-horizontal {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.layout-horizontal .slide-item {
  flex: 1;
}

/* 左右分栏 */
.layout-split-right {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 2rem;
}

.split-left,
.split-right {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.slide-item {
  margin-bottom: 0;
}

.agent-placeholder {
  background: rgba(66, 184, 131, 0.1);
  border: 2px dashed #42b883;
  border-radius: 8px;
  padding: 1.5rem;
}

.placeholder-text {
  color: #42b883;
  font-weight: bold;
  margin-bottom: 1rem;
}

.agent-placeholder pre {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  overflow-x: auto;
}
</style>
