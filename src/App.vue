<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Slide from './components/Slide.vue'
import { getAllSlides, courseConfig } from './slides'
import './style.css'

// 加载所有幻灯片
const slides = getAllSlides()

// 侧边栏状态
const showToc = ref(false)

// 懒加载状态
const visibleIndices = reactive(new Set<number>())
const slideHeights = reactive(new Map<number, number>())
const slideRefs = new Map<number, HTMLElement>()
let observer: IntersectionObserver | null = null

// 缓冲区：可见幻灯片 ± 1
function shouldRender(index: number): boolean {
  for (const vi of visibleIndices) {
    if (Math.abs(vi - index) <= 1) return true
  }
  return false
}

// 记录幻灯片 DOM 引用
function setSlideRef(el: unknown, index: number) {
  if (el instanceof HTMLElement) {
    slideRefs.set(index, el)
  }
}

// 切换侧边栏
function toggleToc() {
  showToc.value = !showToc.value
}

// 滚动到指定幻灯片
function scrollToSlide(index: number) {
  // 确保目标幻灯片已渲染
  visibleIndices.add(index)
  const targetElement = slideRefs.get(index)
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  showToc.value = false
}

// 获取幻灯片在全部幻灯片中的索引
function getSlideIndex(chapterId: string, slideId: string): number {
  return slides.findIndex(s => s.chapterId === chapterId && s.slideId === slideId)
}

// 记录已渲染幻灯片的高度
function recordHeight(index: number) {
  const el = slideRefs.get(index)
  if (el) {
    const height = el.getBoundingClientRect().height
    if (height > 0) {
      slideHeights.set(index, height)
    }
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const index = Number((entry.target as HTMLElement).dataset.slideIndex)
        if (isNaN(index)) continue

        if (entry.isIntersecting) {
          visibleIndices.add(index)
        } else {
          // 记录高度后再移除
          recordHeight(index)
          visibleIndices.delete(index)
        }
      }
    },
    { rootMargin: '300px 0px' }
  )

  // 观察所有幻灯片
  slideRefs.forEach((el, index) => {
    el.dataset.slideIndex = String(index)
    observer!.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
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
      <!-- 所有幻灯片垂直排列，懒加载 -->
      <section
        v-for="(slide, index) in slides"
        :key="`${slide.chapterId}-${slide.slideId}`"
        :ref="(el: any) => setSlideRef(el, index)"
        class="slide-section"
        :class="{ 'slide-hero': slide.content.items?.some(item => item.type === 'hero') }"
      >
        <template v-if="shouldRender(index)">
          <div
            v-if="!slide.content.items?.some(item => item.type === 'hero')"
            class="slide-header"
          >
            <span class="slide-number">{{ index + 1 }}</span>
            <h2 v-if="slide.content.title" class="slide-title">{{ slide.content.title }}</h2>
          </div>
          <Slide :content="slide.content" />
        </template>
        <div
          v-else
          class="slide-placeholder"
          :style="{ height: (slideHeights.get(index) || 800) + 'px' }"
        ></div>
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
  background: rgba(10, 10, 26, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(66, 184, 131, 0.2);
}

.fixed-header h1 {
  color: #42b883;
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: 1px;
}

/* 目录切换按钮 */
.toc-toggle {
  position: absolute;
  left: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(66, 184, 131, 0.15);
  color: #42b883;
  border: 1px solid rgba(66, 184, 131, 0.3);
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.toc-toggle:hover {
  background: rgba(66, 184, 131, 0.25);
  border-color: #42b883;
}

.toc-toggle.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

/* 目录侧边栏 */
.toc-sidebar {
  position: fixed;
  right: -280px;
  top: 70px;
  width: 260px;
  height: calc(100vh - 90px);
  max-height: calc(100vh - 90px);
  background: rgba(14, 14, 30, 0.98);
  border-left: 1px solid rgba(66, 184, 131, 0.15);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.4);
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
  border-bottom: 1px solid rgba(66, 184, 131, 0.15);
}

.toc-slide-item {
  display: block;
  padding: 0.5rem 0.75rem 0.5rem 1.5rem;
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.toc-slide-item:hover {
  background: rgba(66, 184, 131, 0.08);
  border-left-color: #42b883;
  color: rgba(255, 255, 255, 0.85);
}

/* 滚动内容区 */
.scroll-content {
  padding-bottom: 4rem;
}

/* 懒加载占位符 */
.slide-placeholder {
  width: 100%;
  background: transparent;
}

/* 幻灯片区块 */
.slide-section {
  padding: 2rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* 封面页全屏沉浸 */
.slide-section.slide-hero {
  padding: 0;
  border-bottom: none;
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
  background: rgba(66, 184, 131, 0.15);
  color: #42b883;
  border: 1px solid rgba(66, 184, 131, 0.3);
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.9rem;
}

.slide-title {
  color: rgba(255, 255, 255, 0.85);
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
}

</style>
