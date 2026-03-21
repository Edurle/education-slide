<script setup lang="ts">
import type { SlideContent } from '@/types'
import MarkdownRenderer from './MarkdownRenderer.vue'
import Diagram from './Diagram.vue'
import AgentDemo from './AgentDemo.vue'

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
        <AgentDemo
          v-else-if="content.items[0].type === 'agent'"
          :agent-type="content.items[0].agentType"
          :input="content.items[0].input"
          class="slide-item"
        />
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
          <AgentDemo
            v-else-if="item.type === 'agent'"
            :agent-type="item.agentType"
            :input="item.input"
            class="slide-item"
          />
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
        <AgentDemo
          v-else-if="item.type === 'agent'"
          :agent-type="item.agentType"
          :input="item.input"
          class="slide-item"
        />
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
</style>
