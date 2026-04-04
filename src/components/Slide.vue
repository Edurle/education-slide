<script setup lang="ts">
import type { SlideContent } from '@/types'
import MarkdownRenderer from './MarkdownRenderer.vue'
import Diagram from './Diagram.vue'
import ConfigurableAgent from './ConfigurableAgent.vue'
import SvgRenderer from './SvgRenderer.vue'
import TableRenderer from './TableRenderer.vue'
import HeroSlide from './HeroSlide.vue'
import ToolCallAnimation from './ToolCallAnimation.vue'

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
        <ConfigurableAgent
          v-else-if="content.items[0].type === 'configurable-agent'"
          :config="content.items[0].config"
          :agent-type="content.items[0].agentType"
          class="slide-item"
        />
        <SvgRenderer
          v-else-if="content.items[0].type === 'svg'"
          :content="content.items[0].content"
          class="slide-item"
        />
        <TableRenderer
          v-else-if="content.items[0].type === 'table'"
          :headers="content.items[0].headers"
          :rows="content.items[0].rows"
          :variant="content.items[0].variant"
          :theme="content.items[0].theme"
          class="slide-item"
        />
        <HeroSlide
          v-else-if="content.items[0].type === 'hero'"
          :config="content.items[0].config"
          class="slide-item"
        />
        <ToolCallAnimation
          v-else-if="content.items[0].type === 'tool-call-animation'"
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
          <ConfigurableAgent
            v-else-if="item.type === 'configurable-agent'"
            :config="item.config"
            :agent-type="item.agentType"
            class="slide-item"
          />
          <SvgRenderer
            v-else-if="item.type === 'svg'"
            :content="item.content"
            class="slide-item"
          />
          <TableRenderer
            v-else-if="item.type === 'table'"
            :headers="item.headers"
            :rows="item.rows"
            :variant="item.variant"
            :theme="item.theme"
            class="slide-item"
          />
          <HeroSlide
            v-else-if="item.type === 'hero'"
            :config="item.config"
            class="slide-item"
          />
          <ToolCallAnimation
            v-else-if="item.type === 'tool-call-animation'"
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
        <ConfigurableAgent
          v-else-if="item.type === 'configurable-agent'"
          :config="item.config"
          :agent-type="item.agentType"
          class="slide-item"
        />
        <SvgRenderer
          v-else-if="item.type === 'svg'"
          :content="item.content"
          class="slide-item"
        />
        <TableRenderer
          v-else-if="item.type === 'table'"
          :headers="item.headers"
          :rows="item.rows"
          :variant="item.variant"
          :theme="item.theme"
          class="slide-item"
        />
        <HeroSlide
          v-else-if="item.type === 'hero'"
          :config="item.config"
          class="slide-item"
        />
        <ToolCallAnimation
          v-else-if="item.type === 'tool-call-animation'"
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
  color: rgba(255, 255, 255, 0.85);
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
