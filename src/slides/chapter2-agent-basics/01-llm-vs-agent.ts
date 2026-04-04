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
      content: `<svg viewBox="0 0 960 500" xmlns="http://www.w3.org/2000/svg">
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
    <marker id="arrB" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#5b9cf6"/>
    </marker>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="particleGlow">
      <feGaussianBlur stdDeviation="6" result="b"/>
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
  <!-- Circle: cx=700 cy=260 r=130 -->
  <!-- 感知 at -90° (700,130)  规划 at 30° (813,325)  行动 at 150° (587,325) -->

  <rect x="460" y="20" width="480" height="460" rx="16" fill="#0d1f17" stroke="#42b883" stroke-width="2">
    <animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite"/>
  </rect>

  <text x="700" y="56" font-size="20" font-weight="bold" fill="#42b883" text-anchor="middle" font-family="system-ui, sans-serif">智能体 Agent</text>
  <text x="700" y="78" font-size="13" fill="rgba(255,255,255,0.3)" text-anchor="middle">「一个完整的智能系统」</text>

  <!-- ── Outer ring ── -->
  <!-- Glow ring -->
  <circle cx="700" cy="260" r="130" fill="none" stroke="#42b883" stroke-width="6" opacity="0.06" filter="url(#glow)"/>
  <!-- Dashed ring with flow -->
  <circle cx="700" cy="260" r="130" fill="none" stroke="#42b883" stroke-width="1.2" stroke-dasharray="8 6" opacity="0.25">
    <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="2s" repeatCount="indefinite"/>
  </circle>
  <!-- Second subtle ring -->
  <circle cx="700" cy="260" r="138" fill="none" stroke="#42b883" stroke-width="0.5" stroke-dasharray="3 12" opacity="0.12">
    <animate attributeName="stroke-dashoffset" from="0" to="30" dur="4s" repeatCount="indefinite"/>
  </circle>

  <!-- ── Arc arrows along ring (感知→规划→行动→感知 clockwise) ── -->
  <!-- offset ~17° from each node center for rect clearance -->

  <!-- 感知 → 规划 (right side arc) -->
  <path d="M 738 136 A 130 130 0 0 1 827 289" fill="none" stroke="#42b883" stroke-width="2.5" marker-end="url(#arrG)" opacity="0.7">
    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite"/>
  </path>

  <!-- 规划 → 行动 (bottom arc) -->
  <path d="M 789 355 A 130 130 0 0 1 611 355" fill="none" stroke="#42b883" stroke-width="2.5" marker-end="url(#arrG)" opacity="0.7">
    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" begin="0.7s" repeatCount="indefinite"/>
  </path>

  <!-- 行动 → 感知 (left side arc) -->
  <path d="M 573 289 A 130 130 0 0 1 662 136" fill="none" stroke="#42b883" stroke-width="2.5" marker-end="url(#arrG)" opacity="0.7">
    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" begin="1.4s" repeatCount="indefinite"/>
  </path>

  <!-- ── Outer nodes (on ring) ── -->

  <!-- 感知 (top, -90°) -->
  <rect x="663" y="113" width="74" height="34" rx="10" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5" filter="url(#glow)"/>
  <text x="700" y="135" font-size="13" text-anchor="middle" fill="#42b883" font-weight="600">感知</text>

  <!-- 规划 (bottom-right, 30°) -->
  <rect x="776" y="308" width="74" height="34" rx="10" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5" filter="url(#glow)"/>
  <text x="813" y="330" font-size="13" text-anchor="middle" fill="#42b883" font-weight="600">规划</text>

  <!-- 行动 (bottom-left, 150°) -->
  <rect x="550" y="308" width="74" height="34" rx="10" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5" filter="url(#glow)"/>
  <text x="587" y="330" font-size="13" text-anchor="middle" fill="#42b883" font-weight="600">行动</text>

  <!-- ── 推理 + 记忆 (center) ── -->

  <!-- Center pulse rings -->
  <circle cx="700" cy="260" r="54" fill="none" stroke="#8b5cf6" stroke-width="1.5" opacity="0">
    <animate attributeName="r" values="54;90" dur="2.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0" dur="2.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="700" cy="260" r="54" fill="none" stroke="#6366f1" stroke-width="1" opacity="0">
    <animate attributeName="r" values="54;110" dur="3.5s" begin="1.2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.25;0" dur="3.5s" begin="1.2s" repeatCount="indefinite"/>
  </circle>

  <!-- Core circle -->
  <circle cx="700" cy="260" r="54" fill="url(#brainGrad)" opacity="0.9"/>
  <text x="700" y="248" font-size="15" text-anchor="middle" fill="white" font-weight="bold">推理</text>
  <text x="700" y="264" font-size="9" text-anchor="middle" fill="rgba(255,255,255,0.7)">Reasoning</text>
  <line x1="668" y1="273" x2="732" y2="273" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
  <text x="700" y="290" font-size="11" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-weight="500">记忆</text>

  <!-- ── 推理连接 (subtle) ── -->
  <line x1="700" y1="206" x2="700" y2="147" stroke="#6366f1" stroke-width="1.2" marker-end="url(#arrP)" opacity="0.25"/>
  <line x1="747" y1="287" x2="780" y2="308" stroke="#6366f1" stroke-width="1.2" marker-end="url(#arrP)" opacity="0.25"/>
  <line x1="653" y1="287" x2="620" y2="308" stroke="#6366f1" stroke-width="1.2" marker-end="url(#arrP)" opacity="0.25"/>

  <!-- ── Orbiting particles ── -->
  <!-- Full circle path for animateMotion: clockwise from top -->
  <!-- M 700,130 A 130,130 0 0,1 700,390 A 130,130 0 0,1 700,130 -->

  <!-- Particle 1: fast green -->
  <circle r="3" fill="#42b883" opacity="0.9" filter="url(#glow)">
    <animateMotion dur="6s" repeatCount="indefinite"
      path="M 700 130 A 130 130 0 0 1 700 390 A 130 130 0 0 1 700 130"/>
  </circle>

  <!-- Particle 2: slow green glow -->
  <circle r="5" fill="#42b883" opacity="0.4" filter="url(#glow)">
    <animateMotion dur="9s" begin="-3s" repeatCount="indefinite"
      path="M 700 130 A 130 130 0 0 1 700 390 A 130 130 0 0 1 700 130"/>
  </circle>

  <!-- Particle 3: fast purple -->
  <circle r="2.5" fill="#8b5cf6" opacity="0.7" filter="url(#glow)">
    <animateMotion dur="5s" begin="-1.5s" repeatCount="indefinite"
      path="M 700 130 A 130 130 0 0 1 700 390 A 130 130 0 0 1 700 130"/>
  </circle>

  <!-- Particle 4: slow tiny green -->
  <circle r="2" fill="#42b883" opacity="0.5">
    <animateMotion dur="11s" begin="-5s" repeatCount="indefinite"
      path="M 700 130 A 130 130 0 0 1 700 390 A 130 130 0 0 1 700 130"/>
  </circle>

  <!-- Particle 5: medium purple -->
  <circle r="3.5" fill="#6366f1" opacity="0.5" filter="url(#glow)">
    <animateMotion dur="7.5s" begin="-2s" repeatCount="indefinite"
      path="M 700 130 A 130 130 0 0 1 700 390 A 130 130 0 0 1 700 130"/>
  </circle>

  <!-- ── Sparkle particles near nodes ── -->
  <!-- Sparkle near 感知 -->
  <circle cx="720" cy="105" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0" dur="3s" begin="0s" repeatCount="indefinite"/>
    <animate attributeName="r" values="1;2;1" dur="3s" begin="0s" repeatCount="indefinite"/>
  </circle>
  <!-- Sparkle near 规划 -->
  <circle cx="840" cy="305" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.7;0" dur="2.8s" begin="1s" repeatCount="indefinite"/>
    <animate attributeName="r" values="1;2.5;1" dur="2.8s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <!-- Sparkle near 行动 -->
  <circle cx="560" cy="305" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.7;0" dur="3.2s" begin="2s" repeatCount="indefinite"/>
    <animate attributeName="r" values="1;2.5;1" dur="3.2s" begin="2s" repeatCount="indefinite"/>
  </circle>
</svg>`,
    },
    {
      type: 'markdown',
      content: `> **核心洞察**：智能体不是更强的模型，而是在模型外面包了一层 **感知 → 规划 → 行动** 的循环，**推理 + 记忆**居于核心——推理驱动每个环节，记忆为推理提供上下文。同样的"大脑"，有了这套架构，就变成了完全不同的存在。`,
    },
  ],
} satisfies SlideContent
