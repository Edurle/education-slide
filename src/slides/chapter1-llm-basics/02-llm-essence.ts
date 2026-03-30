import type { SlideContent } from '@/types'

export default {
  title: '大模型的本质',
  items: [
    {
      type: 'markdown',
      content: `# 大模型的本质是什么？

> **你以为**它在理解、推理、思考？
> **实际上**——它只做一件事：**猜下一个字**。`
    },
    {
      type: 'svg',
      content: `
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Input context -->
  <text x="40" y="28" fill="rgba(255,255,255,0.25)" font-size="11" font-family="monospace">已生成</text>
  <rect x="40" y="36" width="620" height="36" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <text x="60" y="60" fill="#42b883" font-size="16" font-family="monospace" font-weight="bold">人工智能</text>
  <text x="170" y="60" fill="rgba(255,255,255,0.12)" font-size="16" font-family="monospace">|</text>
  <text x="190" y="60" fill="rgba(255,255,255,0.45)" font-size="15" font-family="monospace">下一个字？</text>

  <!-- Flowing arrow -->
  <path d="M 350 74 L 350 90" stroke="rgba(66,184,131,0.4)" stroke-width="1.5" stroke-dasharray="3,3">
    <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1s" repeatCount="indefinite"/>
  </path>

  <!-- Prediction candidates -->
  <rect x="40" y="94" width="620" height="55" rx="6" fill="rgba(66,184,131,0.03)" stroke="rgba(66,184,131,0.08)" stroke-width="1"/>

  <rect x="80" y="104" width="68" height="26" rx="5" fill="rgba(66,184,131,0.12)" stroke="#42b883" stroke-width="1.5" filter="url(#glow)"/>
  <text x="114" y="122" text-anchor="middle" fill="#42b883" font-size="15" font-family="monospace" font-weight="bold">的</text>
  <text x="114" y="146" text-anchor="middle" fill="#42b883" font-size="10">72%</text>

  <rect x="178" y="104" width="68" height="26" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="212" y="122" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="15" font-family="monospace">将</text>
  <text x="212" y="146" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="10">12%</text>

  <rect x="276" y="104" width="68" height="26" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="310" y="122" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="15" font-family="monospace">能</text>
  <text x="310" y="146" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-size="10">8%</text>

  <text x="380" y="122" fill="rgba(255,255,255,0.12)" font-size="15" font-family="monospace">...</text>

  <!-- Result -->
  <text x="490" y="112" fill="rgba(255,255,255,0.25)" font-size="11" font-family="monospace">选中最高概率</text>
  <text x="490" y="140" fill="#42b883" font-size="14" font-family="monospace" font-weight="bold">→ 猜下一个字</text>

  <!-- Loop hint -->
  <path d="M 610 150 C 650 150, 660 60, 620 36" stroke="rgba(255,255,255,0.08)" stroke-width="1" fill="none" stroke-dasharray="3,3">
    <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1.5s" repeatCount="indefinite"/>
  </path>
  <text x="632" y="100" fill="rgba(255,255,255,0.12)" font-size="9" font-family="monospace" transform="rotate(90,632,100)">循环</text>
</svg>
`,
    },
    {
      type: 'svg',
      content: `
<svg viewBox="0 0 700 310" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="truthGlow">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Three myth nodes — dashed borders = fragile illusion -->
  <rect x="55" y="15" width="155" height="56" rx="10" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.3)" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="132" y="50" text-anchor="middle" fill="#3b82f6" font-size="18" font-weight="bold">理解 ？</text>

  <rect x="272" y="15" width="155" height="56" rx="10" fill="rgba(139,92,246,0.05)" stroke="rgba(139,92,246,0.3)" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="350" y="50" text-anchor="middle" fill="#8b5cf6" font-size="18" font-weight="bold">推理 ？</text>

  <rect x="490" y="15" width="155" height="56" rx="10" fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.3)" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="568" y="50" text-anchor="middle" fill="#f59e0b" font-size="18" font-weight="bold">知识 ？</text>

  <!-- Convergence lines — flowing down -->
  <path d="M 132 71 Q 200 140, 350 185" stroke="#3b82f6" stroke-width="1.5" fill="none" stroke-dasharray="6,4" opacity="0.45">
    <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite"/>
  </path>
  <path d="M 350 71 L 350 185" stroke="#8b5cf6" stroke-width="1.5" fill="none" stroke-dasharray="6,4" opacity="0.45">
    <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite"/>
  </path>
  <path d="M 568 71 Q 500 140, 350 185" stroke="#f59e0b" stroke-width="1.5" fill="none" stroke-dasharray="6,4" opacity="0.45">
    <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite"/>
  </path>

  <!-- Merge label -->
  <text x="350" y="160" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="11" font-family="monospace">全部归结为同一件事</text>

  <!-- The single truth — solid border + glow -->
  <rect x="150" y="190" width="400" height="85" rx="12" fill="rgba(66,184,131,0.05)" stroke="#42b883" stroke-width="2" filter="url(#truthGlow)">
    <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite"/>
  </rect>

  <text x="350" y="225" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="12" font-family="monospace">同 · 一 · 个 · 操 · 作</text>
  <text x="350" y="258" text-anchor="middle" fill="#42b883" font-size="24" font-weight="bold" font-family="monospace">P(next | context)</text>

  <!-- Bottom hint -->
  <text x="350" y="300" text-anchor="middle" fill="rgba(255,255,255,0.12)" font-size="11">没有理解 · 没有推理 · 没有知识 · 只有概率</text>
</svg>
`,
    },
    {
      type: 'markdown',
      content: `> 这就是价值数千亿美元技术的全部秘密。
> **如果模型输出完全取决于输入——我们应该给它什么？**`
    },
  ],
} satisfies SlideContent
