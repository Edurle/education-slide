import type { SlideContent } from '@/types'

export default {
  title: '从本质到关键推论',
  items: [
    {
      type: 'markdown',
      content: `# 一个关键推论`,
    },
    {
      type: 'svg',
      content: `<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <defs>
    <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#42b883"/>
    </marker>
    <marker id="arrowWhite" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#ffffff"/>
    </marker>
  </defs>

  <!-- Step 1: The fact -->
  <text x="50" y="35" fill="rgba(255,255,255,0.4)" font-size="13">已知：</text>
  <rect x="90" y="15" width="530" height="36" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="110" y="39" fill="#ffffff" font-size="15">模型的输出</text>
  <text x="230" y="39" fill="rgba(255,255,255,0.5)" font-size="15">=</text>
  <text x="260" y="39" fill="#ffffff" font-size="15">基于</text>
  <rect x="295" y="20" width="100" height="26" rx="4" fill="rgba(66,184,131,0.15)" stroke="#42b883" stroke-width="1.5"/>
  <text x="345" y="39" fill="#42b883" font-size="15" text-anchor="middle" font-weight="bold">全部输入</text>
  <text x="410" y="39" fill="#ffffff" font-size="15">预测下一个词</text>

  <!-- Big arrow down -->
  <text x="350" y="80" fill="#42b883" font-size="28" text-anchor="middle">↓</text>

  <!-- Step 2: The conclusion (highlighted) -->
  <rect x="100" y="90" width="500" height="60" rx="12" fill="rgba(66,184,131,0.08)" stroke="#42b883" stroke-width="2"/>
  <text x="350" y="118" fill="#ffffff" font-size="20" text-anchor="middle" font-weight="bold">输入什么，决定输出什么</text>
  <text x="350" y="140" fill="rgba(255,255,255,0.5)" font-size="13" text-anchor="middle">模型只是一个函数：output = f(input)</text>

  <!-- Big arrow down -->
  <text x="350" y="175" fill="#42b883" font-size="28" text-anchor="middle">↓</text>

  <!-- Step 3: The question -->
  <text x="350" y="205" fill="#ffffff" font-size="18" text-anchor="middle" font-weight="bold">那我们应该给模型什么？</text>

  <!-- Arrow to answer -->
  <text x="350" y="235" fill="#42b883" font-size="28" text-anchor="middle">↓</text>

  <!-- Step 4: The answer - "Context" revealed -->
  <rect x="170" y="250" width="360" height="70" rx="12" fill="#141428" stroke="#42b883" stroke-width="2"/>
  <text x="350" y="278" fill="rgba(255,255,255,0.5)" font-size="13" text-anchor="middle">这个"给模型的全部输入"，叫做</text>
  <text x="350" y="308" fill="#42b883" font-size="26" text-anchor="middle" font-weight="bold">上下文 (Context)</text>
</svg>`,
    },
    {
      type: 'markdown',
      content: `> **上下文工程** 就是研究：如何把正确的信息，以正确的格式，在正确的时机提供给模型。

下一节我们将深入探索上下文的各种形态。`,
    },
  ],
} satisfies SlideContent
