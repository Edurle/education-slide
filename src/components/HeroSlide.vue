<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { animate } from 'animejs'
import type { HeroChapter } from '@/types'

defineProps<{
  config: {
    subtitle: string
    orbIcon?: string
    title: string
    tagline: string
    chapters: HeroChapter[]
  }
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
let animations: ReturnType<typeof animate>[] = []
let rafId = 0

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  color: string
  vx: number
  vy: number
}

const particles = ref<Particle[]>([])

function initParticles(width: number, height: number) {
  const count = 70
  const result: Particle[] = []
  for (let i = 0; i < count; i++) {
    result.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.8 ? '#42b883' : '#ffffff',
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    })
  }
  particles.value = result
}

function drawParticles(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height)

  // Background gradient
  const gradient = ctx.createRadialGradient(
    width / 2, height / 2, 0,
    width / 2, height / 2, Math.max(width, height) * 0.6
  )
  gradient.addColorStop(0, 'rgba(66, 184, 131, 0.03)')
  gradient.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  for (const p of particles.value) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = p.color === '#42b883'
      ? `rgba(66, 184, 131, ${p.opacity})`
      : `rgba(255, 255, 255, ${p.opacity})`
    ctx.fill()

    // Move particles
    p.x += p.vx
    p.y += p.vy

    // Wrap around
    if (p.x < -5) p.x = width + 5
    if (p.x > width + 5) p.x = -5
    if (p.y < -5) p.y = height + 5
    if (p.y > height + 5) p.y = -5
  }

  rafId = requestAnimationFrame(() => drawParticles(ctx, width, height))
}

function resizeCanvas() {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const dpr = window.devicePixelRatio || 1
  const rect = container.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.scale(dpr, dpr)

  // Re-init particles on resize
  initParticles(rect.width, rect.height)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const container = containerRef.value!
  const rect = container.getBoundingClientRect()
  drawParticles(ctx, rect.width, rect.height)

  // Text fade-in animations
  const elements = container.querySelectorAll('.hero-fade')
  elements.forEach((el, i) => {
    const anim = animate(el, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: 300 + i * 300,
      ease: 'outQuad',
    })
    animations.push(anim)
  })

  // Orb pulse
  const orb = container.querySelector('.hero-orb-glow')
  if (orb) {
    const orbAnim = animate(orb, {
      opacity: [1, 0.5],
      scale: [1, 1.2],
      duration: 3000,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    })
    animations.push(orbAnim)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(rafId)
  animations.forEach(a => a.pause?.())
  animations = []
})
</script>

<template>
  <div ref="containerRef" class="hero-container">
    <canvas ref="canvasRef" class="hero-canvas"></canvas>

    <div class="hero-content">
      <!-- Layer 1: Subtitle -->
      <div class="hero-subtitle hero-fade">{{ config.subtitle }}</div>

      <!-- Layer 2: Orb -->
      <div class="hero-orb hero-fade">
        <div class="hero-orb-glow"></div>
        <div class="hero-orb-core">
          {{ config.orbIcon || '🤖' }}
        </div>
      </div>

      <!-- Layer 3: Title -->
      <h1 class="hero-title hero-fade">{{ config.title }}</h1>

      <!-- Layer 4: Tagline -->
      <p class="hero-tagline hero-fade">{{ config.tagline }}</p>

      <!-- Layer 5: Divider -->
      <div class="hero-divider hero-fade"></div>

      <!-- Layer 6: Chapters -->
      <div class="hero-chapters hero-fade">
        <template v-for="(chapter, index) in config.chapters" :key="chapter.id">
          <div class="hero-chapter">
            <div class="hero-chapter-label">{{ chapter.label }}</div>
            <div class="hero-chapter-title">{{ chapter.title }}</div>
          </div>
          <div v-if="index < config.chapters.length - 1" class="hero-chapter-separator"></div>
        </template>
      </div>

      <!-- Layer 7: Scroll hint -->
      <div class="hero-scroll hero-fade">
        <span>向下滚动开始学习</span>
        <div class="scroll-mouse">
          <div class="scroll-dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  min-height: 100vh;
  background: #0a0a1a;
  overflow: hidden;
}

.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

/* Animations initial state */
.hero-fade {
  opacity: 0;
}

/* Subtitle */
.hero-subtitle {
  color: #42b883;
  font-size: 13px;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 28px;
  font-weight: 500;
}

/* Orb */
.hero-orb {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 32px;
}

.hero-orb-glow {
  position: absolute;
  inset: -30px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(66, 184, 131, 0.25) 0%,
    rgba(66, 184, 131, 0.08) 50%,
    transparent 70%
  );
}

.hero-orb-core {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(66, 184, 131, 0.3) 0%,
    rgba(66, 184, 131, 0.1) 60%,
    transparent 80%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 44px;
  filter: drop-shadow(0 0 20px rgba(66, 184, 131, 0.4));
}

/* Title */
.hero-title {
  color: rgba(255, 255, 255, 0.95);
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 3px;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

/* Tagline */
.hero-tagline {
  color: rgba(255, 255, 255, 0.45);
  font-size: 15px;
  letter-spacing: 1px;
  margin: 0 0 36px 0;
}

/* Divider */
.hero-divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(to right, transparent, #42b883, transparent);
  margin-bottom: 36px;
}

/* Chapters */
.hero-chapters {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 48px;
}

.hero-chapter {
  text-align: center;
}

.hero-chapter-label {
  color: #42b883;
  font-size: 11px;
  letter-spacing: 2px;
  margin-bottom: 4px;
  font-weight: 600;
}

.hero-chapter-title {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.hero-chapter-separator {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.12);
}

/* Scroll hint */
.hero-scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.2);
  font-size: 12px;
  letter-spacing: 2px;
}

.scroll-mouse {
  width: 22px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 11px;
  position: relative;
}

.scroll-dot {
  width: 3px;
  height: 8px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 2px;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollBounce 2s ease-in-out infinite;
}

@keyframes scrollBounce {
  0%, 100% {
    top: 6px;
    opacity: 0.35;
  }
  50% {
    top: 16px;
    opacity: 0.8;
  }
}
</style>
