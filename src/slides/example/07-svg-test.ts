import type { SlideContent } from '@/types'

export default {
  title: 'SVG 渲染测试',
  layout: 'vertical',
  items: [
    {
      type: 'markdown',
      content: `# SVG 元素渲染测试

这是一个测试 SVG 渲染功能的幻灯片。下方展示了一个简单的 SVG 图像：
      `
    },
    {
      type: 'svg',
      content: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景 -->
  <rect x="0" y="0" width="400" height="200" fill="#f8f9fa" rx="10"/>

  <!-- 蓝色矩形 -->
  <rect x="20" y="30" width="120" height="80" fill="#4a90d9" rx="8"/>

  <!-- 红色圆形 -->
  <circle cx="220" cy="70" r="50" fill="#e74c3c"/>

  <!-- 绿色三角形 -->
  <polygon points="320,120 370,20 420,120" fill="#27ae60"/>

  <!-- 文字 -->
  <text x="200" y="170" text-anchor="middle" font-size="16" fill="#333" font-family="sans-serif">SVG 渲染成功!</text>
</svg>`
    }
  ]
} satisfies SlideContent
