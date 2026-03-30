import type { SlideContent } from '@/types'

export default {
  title: '大模型 vs 智能体',
  layout: 'vertical',
  items: [
    {
      type: 'markdown',
      content: `# 大模型 vs 智能体

> 同样是那颗"大脑"，差别到底在哪里？`,
    },
    {
      type: 'svg',
      content: `<svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="loopGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#42b883" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#42b883" stop-opacity="0.02"/>
    </linearGradient>
    <marker id="arrG" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#42b883"/>
    </marker>
    <marker id="arrP" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#6366f1"/>
    </marker>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- ===== LEFT: LLM — 孤立的大脑 ===== -->
  <rect x="20" y="20" width="310" height="420" rx="16" fill="#1a1a30" stroke="#3a3a5c" stroke-width="1.5" stroke-dasharray="8,4"/>

  <text x="175" y="56" font-size="20" font-weight="bold" fill="#8b5cf6" text-anchor="middle" font-family="system-ui, sans-serif">大模型 LLM</text>
  <text x="175" y="78" font-size="13" fill="rgba(255,255,255,0.3)" text-anchor="middle">「只是一个大脑」</text>

  <!-- Brain -->
  <circle cx="175" cy="170" r="42" fill="url(#brainGrad)" opacity="0.8"/>
  <text x="175" y="166" font-size="16" text-anchor="middle" fill="white" font-weight="bold">大脑</text>
  <text x="175" y="182" font-size="9" text-anchor="middle" fill="rgba(255,255,255,0.7)">Brain</text>

  <!-- Simple I/O -->
  <rect x="40" y="157" width="52" height="26" rx="6" fill="#2a2a4a" stroke="#4a4a6c" stroke-width="1"/>
  <text x="66" y="175" font-size="11" fill="rgba(255,255,255,0.5)" text-anchor="middle">文本</text>
  <line x1="94" y1="170" x2="129" y2="170" stroke="#6366f1" stroke-width="2" marker-end="url(#arrP)"/>
  <line x1="221" y1="170" x2="256" y2="170" stroke="#6366f1" stroke-width="2" marker-end="url(#arrP)"/>
  <rect x="260" y="157" width="52" height="26" rx="6" fill="#2a2a4a" stroke="#4a4a6c" stroke-width="1"/>
  <text x="286" y="175" font-size="11" fill="rgba(255,255,255,0.5)" text-anchor="middle">文本</text>

  <line x1="55" y1="245" x2="295" y2="245" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

  <!-- Limitations -->
  <text x="175" y="282" font-size="13" fill="rgba(255,255,255,0.28)" text-anchor="middle">✗ 没有记忆，每次对话从零开始</text>
  <text x="175" y="312" font-size="13" fill="rgba(255,255,255,0.28)" text-anchor="middle">✗ 无法感知外部世界</text>
  <text x="175" y="342" font-size="13" fill="rgba(255,255,255,0.28)" text-anchor="middle">✗ 没有工具，不能采取行动</text>
  <text x="175" y="372" font-size="13" fill="rgba(255,255,255,0.28)" text-anchor="middle">✗ 被动等待，不能主动规划</text>

  <text x="175" y="420" font-size="11" fill="rgba(255,255,255,0.18)" text-anchor="middle" font-style="italic">"你问我答，仅此而已"</text>

  <!-- ===== CENTER: What gets added ===== -->
  <g opacity="0.9">
    <text x="395" y="168" font-size="24" font-weight="bold" fill="#42b883" text-anchor="middle" font-family="monospace">+</text>
    <text x="395" y="188" font-size="11" fill="rgba(255,255,255,0.45)" text-anchor="middle">感知</text>

    <text x="395" y="228" font-size="24" font-weight="bold" fill="#42b883" text-anchor="middle" font-family="monospace">+</text>
    <text x="395" y="248" font-size="11" fill="rgba(255,255,255,0.45)" text-anchor="middle">记忆</text>

    <text x="395" y="288" font-size="24" font-weight="bold" fill="#42b883" text-anchor="middle" font-family="monospace">+</text>
    <text x="395" y="308" font-size="11" fill="rgba(255,255,255,0.45)" text-anchor="middle">工具</text>

    <text x="395" y="348" font-size="24" font-weight="bold" fill="#42b883" text-anchor="middle" font-family="monospace">+</text>
    <text x="395" y="368" font-size="11" fill="rgba(255,255,255,0.45)" text-anchor="middle">规划</text>
  </g>

  <!-- ===== RIGHT: Agent — 完整的智能系统 ===== -->
  <rect x="460" y="20" width="480" height="420" rx="16" fill="#0d1f17" stroke="#42b883" stroke-width="2">
    <animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite"/>
  </rect>

  <text x="700" y="56" font-size="20" font-weight="bold" fill="#42b883" text-anchor="middle" font-family="system-ui, sans-serif">智能体 Agent</text>
  <text x="700" y="78" font-size="13" fill="rgba(255,255,255,0.3)" text-anchor="middle">「一个完整的智能系统」</text>

  <!-- Glow aura -->
  <ellipse cx="700" cy="245" rx="115" ry="100" fill="url(#loopGlow)"/>

  <!-- ── Loop Nodes ── -->

  <!-- 感知 (top) -->
  <rect x="665" y="110" width="70" height="34" rx="10" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5" filter="url(#glow)"/>
  <text x="700" y="132" font-size="13" text-anchor="middle" fill="#42b883" font-weight="600">感知</text>

  <!-- Brain (center) -->
  <circle cx="700" cy="245" r="38" fill="url(#brainGrad)" opacity="0.9"/>
  <text x="700" y="241" font-size="14" text-anchor="middle" fill="white" font-weight="bold">推理</text>
  <text x="700" y="257" font-size="9" text-anchor="middle" fill="rgba(255,255,255,0.7)">Reasoning</text>

  <!-- 规划 (right) -->
  <rect x="815" y="228" width="70" height="34" rx="10" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5" filter="url(#glow)"/>
  <text x="850" y="250" font-size="13" text-anchor="middle" fill="#42b883" font-weight="600">规划</text>

  <!-- 行动 (bottom) -->
  <rect x="665" y="340" width="70" height="34" rx="10" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5" filter="url(#glow)"/>
  <text x="700" y="362" font-size="13" text-anchor="middle" fill="#42b883" font-weight="600">行动</text>

  <!-- 记忆 (left) -->
  <rect x="520" y="228" width="70" height="34" rx="10" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5" filter="url(#glow)"/>
  <text x="555" y="250" font-size="13" text-anchor="middle" fill="#42b883" font-weight="600">记忆</text>

  <!-- ── Loop Arrows ── -->

  <!-- 感知 → 大脑 -->
  <line x1="700" y1="146" x2="700" y2="205" stroke="#42b883" stroke-width="2" marker-end="url(#arrG)">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
  </line>

  <!-- 大脑 → 规划 -->
  <line x1="740" y1="245" x2="813" y2="245" stroke="#42b883" stroke-width="2" marker-end="url(#arrG)">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
  </line>

  <!-- 规划 → 行动 -->
  <path d="M 850 264 Q 855 335 737 345" fill="none" stroke="#42b883" stroke-width="2" marker-end="url(#arrG)">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1s" repeatCount="indefinite"/>
  </path>

  <!-- 行动 → 感知 (loop back via left) -->
  <path d="M 665 357 Q 505 357 505 245 Q 505 127 663 127" fill="none" stroke="#42b883" stroke-width="2" marker-end="url(#arrG)" stroke-dasharray="6,3">
    <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1.5s" repeatCount="indefinite"/>
  </path>

  <!-- 记忆 ↔ 大脑 -->
  <line x1="592" y1="241" x2="660" y2="241" stroke="#42b883" stroke-width="1.5" marker-end="url(#arrG)" opacity="0.35"/>
  <line x1="660" y1="251" x2="592" y2="251" stroke="#42b883" stroke-width="1.5" opacity="0.35"/>

  <!-- Observation label on the return path -->
  <text x="497" y="248" font-size="9" fill="rgba(66,184,131,0.5)" text-anchor="middle" transform="rotate(-90,497,248)">观察结果</text>

  <!-- Bottom capabilities -->
  <text x="700" y="405" font-size="12" fill="#42b883" text-anchor="middle" opacity="0.6">✓ 持续记忆上下文</text>
  <text x="700" y="425" font-size="12" fill="#42b883" text-anchor="middle" opacity="0.6">✓ 调用外部工具与环境交互</text>
</svg>`,
    },
    {
      type: 'markdown',
      content: `> **核心洞察**：智能体不是更强的模型，而是在模型外面包了一层 **感知 → 推理 → 规划 → 行动** 的循环。同样的"大脑"，有了感知、记忆和工具，就变成了完全不同的存在。`,
    },
  ],
} satisfies SlideContent
