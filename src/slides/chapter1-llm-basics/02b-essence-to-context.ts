import type { SlideContent } from '@/types'

export default {
  title: '从本质到关键推论',
  layout: 'vertical',
  items: [
    {
      type: 'svg',
      content: `<svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="inputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0ea5e9"/><stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="llmGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <filter id="glow3">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arr3" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="rgba(255,255,255,0.4)"/>
    </marker>
  </defs>

  <!-- HUD corners -->
  <path d="M 10 10 L 10 35 M 10 10 L 35 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 690 10 L 690 35 M 690 10 L 665 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 10 510 L 10 485 M 10 510 L 35 510" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 690 510 L 690 485 M 690 510 L 665 510" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <text x="350" y="30" font-size="9" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-family="monospace">THE KEY DEDUCTION // 关键推论</text>

  <!-- ═══ TOP: Simplified single call flow (回顾上一节) ═══ -->
  <text x="50" y="60" font-size="10" fill="rgba(255,255,255,0.25)" font-family="monospace">回顾上一节</text>

  <!-- Input box -->
  <rect x="80" y="72" width="160" height="40" rx="8" fill="#0d1a2a" stroke="#0ea5e9" stroke-width="2">
    <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
  </rect>
  <text x="160" y="90" font-size="10" text-anchor="middle" fill="#0ea5e9" font-weight="600">messages: [...]</text>
  <text x="160" y="104" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">system + user</text>

  <!-- Arrow -->
  <line x1="242" y1="92" x2="290" y2="92" stroke="rgba(255,255,255,0.2)" stroke-width="1.5">
    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite"/>
  </line>

  <!-- Model -->
  <rect x="294" y="72" width="110" height="40" rx="8" fill="#1a1a30" stroke="#8b5cf6" stroke-width="1.5"/>
  <circle cx="316" cy="92" r="8" fill="url(#llmGrad3)" opacity="0.7"/>
  <text x="362" y="97" font-size="12" text-anchor="middle" fill="#8b5cf6" font-weight="600">模型</text>

  <!-- Arrow -->
  <line x1="406" y1="92" x2="450" y2="92" stroke="rgba(255,255,255,0.2)" stroke-width="1.5">
    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
  </line>

  <!-- Output -->
  <rect x="454" y="72" width="160" height="40" rx="8" fill="#1a2a1a" stroke="#42b883" stroke-width="1.5"/>
  <text x="534" y="97" font-size="11" text-anchor="middle" fill="#42b883" font-weight="600">生成结果</text>

  <!-- Particle flowing through -->
  <circle r="3" fill="#0ea5e9" opacity="0.7" filter="url(#glow3)">
    <animate attributeName="fill" values="#0ea5e9;#8b5cf6;#42b883" dur="3s" repeatCount="indefinite"/>
    <animateMotion dur="3s" repeatCount="indefinite"
      path="M 160 92 L 349 92 L 534 92"/>
  </circle>

  <!-- ═══ FOCUS ZOOM ═══ -->
  <line x1="160" y1="114" x2="160" y2="148" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4 3">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
  </line>
  <!-- Expanding perspective lines -->
  <line x1="80" y1="114" x2="100" y2="155" stroke="rgba(14,165,233,0.12)" stroke-width="1"/>
  <line x1="240" y1="114" x2="600" y2="155" stroke="rgba(14,165,233,0.12)" stroke-width="1"/>

  <!-- ═══ CENTER: Zoomed input (messages array) ═══ -->
  <rect x="60" y="155" width="580" height="80" rx="12" fill="#0d1a2a" stroke="#0ea5e9" stroke-width="2">
    <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite"/>
  </rect>
  <rect x="70" y="147" width="50" height="16" rx="4" fill="#0ea5e9" opacity="0.15"/>
  <text x="95" y="159" font-size="8" text-anchor="middle" fill="#0ea5e9" font-weight="600">聚焦</text>

  <!-- message 1 -->
  <rect x="80" y="170" width="540" height="24" rx="6" fill="rgba(14,165,233,0.05)" stroke="rgba(14,165,233,0.2)" stroke-width="1"/>
  <text x="95" y="186" font-size="10" fill="rgba(255,255,255,0.4)" font-family="monospace">{role: "system", content: "你是一个有用的助手"}</text>

  <!-- message 2 -->
  <rect x="80" y="198" width="540" height="24" rx="6" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.3)" stroke-width="1"/>
  <text x="95" y="214" font-size="10" fill="rgba(255,255,255,0.5)" font-family="monospace">{role: "user", content: "你好，告诉我今天的日期"}</text>

  <!-- Scan line -->
  <rect x="80" y="170" width="0" height="52" rx="6" fill="rgba(14,165,233,0.06)">
    <animate attributeName="width" values="0;540;540;0" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite"/>
  </rect>

  <!-- ═══ REVEAL ═══ -->
  <line x1="350" y1="237" x2="350" y2="262" stroke="#0ea5e9" stroke-width="1.5" marker-end="url(#arr3)" opacity="0.5"/>

  <rect x="100" y="268" width="500" height="45" rx="10" fill="#1a1a30" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <text x="350" y="289" font-size="13" text-anchor="middle" fill="rgba(255,255,255,0.6)">这个"全部输入" = 模型能感知的全部世界</text>
  <text x="350" y="306" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.25)">模型不知道输入之外的一切</text>

  <line x1="350" y1="316" x2="350" y2="340" stroke="#42b883" stroke-width="1.5" opacity="0.5">
    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
  </line>

  <!-- CONTEXT reveal with pulse -->
  <rect x="170" y="344" width="360" height="50" rx="14" fill="#0d1f17" stroke="#42b883" stroke-width="2.5">
    <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
  </rect>
  <circle cx="350" cy="369" r="25" fill="none" stroke="#42b883" stroke-width="1" opacity="0">
    <animate attributeName="r" values="25;50" dur="2.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0" dur="2.5s" repeatCount="indefinite"/>
  </circle>
  <text x="350" y="363" font-size="9" text-anchor="middle" fill="rgba(255,255,255,0.4)">它有一个名字</text>
  <text x="350" y="383" font-size="22" text-anchor="middle" fill="#42b883" font-weight="bold" filter="url(#glow3)">上下文 Context</text>

  <!-- ═══ BOTTOM: Marquee — one large item at a time ═══ -->
  <!-- 6 items, cycle 12s total, each shows for 2s -->
  <!-- Layout: center item is large (140x56), flanked by arrows -->

  <text x="350" y="422" font-size="9" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">上下文包含 ↓</text>

  <!-- Left arrow -->
  <text x="170" y="458" font-size="18" fill="rgba(255,255,255,0.12)" text-anchor="middle">‹</text>
  <!-- Right arrow -->
  <text x="530" y="458" font-size="18" fill="rgba(255,255,255,0.12)" text-anchor="middle">›</text>

  <!-- ===== Item 1: Prompt ===== -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" dur="12s" begin="0s" repeatCount="indefinite" keyTimes="0;0.02;0.14;0.17;1"/>
    <rect x="210" y="432" width="280" height="56" rx="12" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </rect>
    <text x="350" y="455" font-size="16" text-anchor="middle" fill="#3b82f6" font-weight="bold">Prompt</text>
    <text x="350" y="475" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.4)">用户输入的指令或问题</text>
  </g>

  <!-- ===== Item 2: 会话历史 ===== -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" dur="12s" begin="2s" repeatCount="indefinite" keyTimes="0;0.02;0.14;0.17;1"/>
    <rect x="210" y="432" width="280" height="56" rx="12" fill="rgba(59,130,246,0.12)" stroke="#60a5fa" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </rect>
    <text x="350" y="455" font-size="16" text-anchor="middle" fill="#60a5fa" font-weight="bold">会话历史</text>
    <text x="350" y="475" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.4)">当前对话的历史消息</text>
  </g>

  <!-- ===== Item 3: 工具调用 ===== -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" dur="12s" begin="4s" repeatCount="indefinite" keyTimes="0;0.02;0.14;0.17;1"/>
    <rect x="210" y="432" width="280" height="56" rx="12" fill="rgba(139,92,246,0.12)" stroke="#8b5cf6" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </rect>
    <text x="350" y="455" font-size="16" text-anchor="middle" fill="#8b5cf6" font-weight="bold">工具调用</text>
    <text x="350" y="475" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.4)">执行外部操作的能力</text>
  </g>

  <!-- ===== Item 4: RAG ===== -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" dur="12s" begin="6s" repeatCount="indefinite" keyTimes="0;0.02;0.14;0.17;1"/>
    <rect x="210" y="432" width="280" height="56" rx="12" fill="rgba(139,92,246,0.12)" stroke="#a78bfa" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </rect>
    <text x="350" y="455" font-size="16" text-anchor="middle" fill="#a78bfa" font-weight="bold">RAG</text>
    <text x="350" y="475" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.4)">检索外部知识辅助生成</text>
  </g>

  <!-- ===== Item 5: 网络搜索 ===== -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" dur="12s" begin="8s" repeatCount="indefinite" keyTimes="0;0.02;0.14;0.17;1"/>
    <rect x="210" y="432" width="280" height="56" rx="12" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </rect>
    <text x="350" y="455" font-size="16" text-anchor="middle" fill="#f59e0b" font-weight="bold">网络搜索</text>
    <text x="350" y="475" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.4)">实时获取互联网信息</text>
  </g>

  <!-- ===== Item 6: Skill ===== -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;1;1;0;0" dur="12s" begin="10s" repeatCount="indefinite" keyTimes="0;0.02;0.14;0.17;1"/>
    <rect x="210" y="432" width="280" height="56" rx="12" fill="rgba(66,184,131,0.12)" stroke="#42b883" stroke-width="2">
      <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </rect>
    <text x="350" y="455" font-size="16" text-anchor="middle" fill="#42b883" font-weight="bold">Skill</text>
    <text x="350" y="475" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.4)">封装的能力模块</text>
  </g>

  <!-- Progress dots -->
  <g transform="translate(290, 498)">
    <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.1)">
      <animate attributeName="fill" values="rgba(59,130,246,0.8);rgba(255,255,255,0.1)" dur="12s" begin="0s" repeatCount="indefinite" keyTimes="0;0.16"/>
    </circle>
    <circle cx="16" cy="0" r="3" fill="rgba(255,255,255,0.1)">
      <animate attributeName="fill" values="rgba(59,130,246,0.8);rgba(255,255,255,0.1)" dur="12s" begin="2s" repeatCount="indefinite" keyTimes="0;0.16"/>
    </circle>
    <circle cx="32" cy="0" r="3" fill="rgba(255,255,255,0.1)">
      <animate attributeName="fill" values="rgba(139,92,246,0.8);rgba(255,255,255,0.1)" dur="12s" begin="4s" repeatCount="indefinite" keyTimes="0;0.16"/>
    </circle>
    <circle cx="48" cy="0" r="3" fill="rgba(255,255,255,0.1)">
      <animate attributeName="fill" values="rgba(139,92,246,0.8);rgba(255,255,255,0.1)" dur="12s" begin="6s" repeatCount="indefinite" keyTimes="0;0.16"/>
    </circle>
    <circle cx="64" cy="0" r="3" fill="rgba(255,255,255,0.1)">
      <animate attributeName="fill" values="rgba(245,158,11,0.8);rgba(255,255,255,0.1)" dur="12s" begin="8s" repeatCount="indefinite" keyTimes="0;0.16"/>
    </circle>
    <circle cx="80" cy="0" r="3" fill="rgba(255,255,255,0.1)">
      <animate attributeName="fill" values="rgba(66,184,131,0.8);rgba(255,255,255,0.1)" dur="12s" begin="10s" repeatCount="indefinite" keyTimes="0;0.16"/>
    </circle>
  </g>

  <!-- Sparkles -->
  <circle cx="175" cy="365" r="1.5" fill="#42b883" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="525" cy="365" r="1.5" fill="#42b883" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="1.2s" repeatCount="indefinite"/>
  </circle>
</svg>`,
    },
    {
      type: 'markdown',
      content: `> **上下文工程** 就是研究：如何把正确的信息，以正确的格式，在正确的时机提供给模型。`,
    },
  ],
} satisfies SlideContent
