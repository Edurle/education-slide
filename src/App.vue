<script setup lang="ts">
import { ref } from 'vue'
import Slide from './components/Slide.vue'
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

</style>
