import type { SlideContent } from '@/types'

export default {
  title: '思考-行动循环',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# Think → Act → Observe

智能体通过持续的循环完成复杂任务。数据在传送带上经过三个工站的处理，最终回到起点。

1. **Think (思考)** — 分析当前状态，决定下一步
2. **Act (行动)** — 执行工具调用或生成回复
3. **Observe (观察)** — 获取行动结果，更新状态
4. **重复...** 直到任务完成

\`\`\`python
while not task_complete:
    thought = think(current_state)
    action = decide_action(thought)
    result = execute(action)
    observe(result)
\`\`\`
`,
    },
    {
      type: 'svg',
      content: `<svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="conveyor" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.05"/>
    </linearGradient>
    <linearGradient id="conveyorV" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.05"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowSmall">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="thinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9"/><stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="actGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="observeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#42b883"/><stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <linearGradient id="llmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>

  <!-- HUD corners -->
  <path d="M 10 10 L 10 35 M 10 10 L 35 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 590 10 L 590 35 M 590 10 L 565 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 10 510 L 10 485 M 10 510 L 35 510" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 590 510 L 590 485 M 590 510 L 565 510" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="32" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">CONVEYOR LOOP // 传送带循环</text>

  <!-- ═══ CONVEYOR BELT SYSTEM ═══ -->
  <!-- Layout: rectangular loop
       LLM (left) → Think (top) → Act (right) → Observe (bottom) → back to LLM -->

  <!-- Top conveyor: LLM → Think -->
  <rect x="80" y="130" width="180" height="8" rx="4" fill="url(#conveyor)" opacity="0.4"/>
  <line x1="80" y1="134" x2="260" y2="134" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="8 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Top conveyor: Think → Act -->
  <rect x="340" y="130" width="130" height="8" rx="4" fill="url(#conveyor)" opacity="0.4"/>
  <line x1="340" y1="134" x2="470" y2="134" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="8 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Vertical right: → Act -->
  <rect x="462" y="138" width="8" height="100" rx="4" fill="url(#conveyorV)" opacity="0.4"/>
  <line x1="466" y1="138" x2="466" y2="238" stroke="#f59e0b" stroke-width="2" stroke-dasharray="8 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Bottom conveyor: Act → Observe -->
  <rect x="240" y="290" width="224" height="8" rx="4" fill="url(#conveyor)" opacity="0.4"/>
  <line x1="464" y1="294" x2="240" y2="294" stroke="#42b883" stroke-width="2" stroke-dasharray="8 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="24" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Vertical left: Observe → LLM -->
  <rect x="92" y="248" width="8" height="50" rx="4" fill="url(#conveyorV)" opacity="0.4"/>
  <line x1="96" y1="298" x2="96" y2="248" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="8 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="24" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- ═══ STATIONS ═══ -->

  <!-- LLM Station (left) -->
  <rect x="42" y="165" width="100" height="70" rx="10" fill="#1a1a3a" stroke="#8b5cf6" stroke-width="2"/>
  <circle cx="54" cy="177" r="4" fill="#8b5cf6">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="92" cy="195" r="16" fill="url(#llmGrad)" opacity="0.8"/>
  <text x="92" y="199" font-size="8" text-anchor="middle" fill="white" font-weight="bold">LLM</text>
  <text x="92" y="222" font-size="9" text-anchor="middle" fill="rgba(255,255,255,0.4)">分析</text>

  <!-- Think Station (top center) -->
  <rect x="200" y="90" width="120" height="70" rx="10" fill="#1a1a3a" stroke="#0ea5e9" stroke-width="2"/>
  <circle cx="214" cy="102" r="4" fill="#0ea5e9">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
  </circle>
  <g transform="translate(260, 118)">
    <circle r="12" fill="url(#thinkGrad)" opacity="0.8"/>
    <g>
      <line x1="0" y1="-6" x2="0" y2="6" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
      <line x1="-6" y1="0" x2="6" y2="0" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite"/>
    </g>
  </g>
  <text x="260" y="148" font-size="10" text-anchor="middle" fill="#0ea5e9" font-weight="bold">Think</text>
  <text x="260" y="158" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.35)">思考</text>

  <!-- Act Station (right) -->
  <rect x="420" y="165" width="100" height="70" rx="10" fill="#1a1a3a" stroke="#f59e0b" stroke-width="2"/>
  <circle cx="432" cy="177" r="4" fill="#f59e0b">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <g transform="translate(470, 195)">
    <circle r="12" fill="url(#actGrad)" opacity="0.8"/>
    <text font-size="12" text-anchor="middle" fill="white" y="4">⚡</text>
  </g>
  <text x="470" y="222" font-size="10" text-anchor="middle" fill="#f59e0b" font-weight="bold">Act</text>
  <text x="470" y="232" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.35)">行动</text>

  <!-- Observe Station (bottom) -->
  <rect x="160" y="310" width="120" height="70" rx="10" fill="#1a1a3a" stroke="#42b883" stroke-width="2"/>
  <circle cx="172" cy="322" r="4" fill="#42b883">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1.5s" repeatCount="indefinite"/>
  </circle>
  <g transform="translate(220, 338)">
    <circle r="12" fill="url(#observeGrad)" opacity="0.8"/>
    <ellipse cx="0" cy="0" rx="6" ry="4" fill="none" stroke="white" stroke-width="1.5"/>
    <circle r="2" fill="white"/>
  </g>
  <text x="220" y="365" font-size="10" text-anchor="middle" fill="#42b883" font-weight="bold">Observe</text>
  <text x="220" y="375" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.35)">观察</text>

  <!-- ═══ DATA CUBE traveling the conveyor ═══ -->
  <rect x="-6" y="-6" width="12" height="12" rx="3" fill="#0ea5e9" opacity="0.9" filter="url(#glow)">
    <animate attributeName="fill" values="#8b5cf6;#0ea5e9;#f59e0b;#42b883;#8b5cf6" dur="6s" repeatCount="indefinite"/>
    <animateMotion dur="6s" repeatCount="indefinite"
      path="M 96 170 L 260 134 L 466 170 L 466 294 L 220 294 L 96 240"/>
  </rect>

  <!-- Trail particles behind data cube -->
  <circle r="3" fill="#0ea5e9" opacity="0.4" filter="url(#glowSmall)">
    <animateMotion dur="6s" begin="-0.3s" repeatCount="indefinite"
      path="M 96 170 L 260 134 L 466 170 L 466 294 L 220 294 L 96 240"/>
  </circle>
  <circle r="2" fill="#0ea5e9" opacity="0.2">
    <animateMotion dur="6s" begin="-0.6s" repeatCount="indefinite"
      path="M 96 170 L 260 134 L 466 170 L 466 294 L 220 294 L 96 240"/>
  </circle>

  <!-- ═══ CONVEYOR LABELS ═══ -->
  <text x="170" y="122" font-size="9" fill="rgba(255,255,255,0.25)" text-anchor="middle" font-family="monospace">→ 分析</text>
  <text x="390" y="122" font-size="9" fill="rgba(255,255,255,0.25)" text-anchor="middle" font-family="monospace">决策 →</text>
  <text x="490" y="200" font-size="9" fill="rgba(255,255,255,0.25)" text-anchor="start" font-family="monospace">执行 ↓</text>
  <text x="340" y="310" font-size="9" fill="rgba(255,255,255,0.25)" text-anchor="middle" font-family="monospace">← 反馈</text>

  <!-- ═══ STATUS BAR at bottom ═══ -->
  <rect x="20" y="430" width="560" height="65" rx="8" fill="#0d0d1a" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

  <!-- Loop indicator -->
  <text x="40" y="452" font-size="9" fill="rgba(255,255,255,0.2)" font-family="monospace">CYCLE: 01</text>

  <!-- Progress bar -->
  <rect x="120" y="445" width="200" height="6" rx="3" fill="rgba(255,255,255,0.05)"/>
  <rect x="120" y="445" width="0" height="6" rx="3" fill="#0ea5e9" opacity="0.6">
    <animate attributeName="width" values="0;200;0" dur="6s" repeatCount="indefinite"/>
  </rect>

  <text x="360" y="452" font-size="8" fill="rgba(255,255,255,0.15)" font-family="monospace">STATUS: LOOPING</text>
  <text x="360" y="465" font-size="8" fill="rgba(255,255,255,0.15)" font-family="monospace">TASK: IN PROGRESS</text>

  <!-- Status LEDs -->
  <circle cx="530" cy="448" r="3" fill="#42b883">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
  </circle>
  <text x="538" y="452" font-size="8" fill="rgba(255,255,255,0.2)">ONLINE</text>

  <!-- Sparkle effects at stations -->
  <circle cx="260" cy="100" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="470" cy="175" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="220" cy="320" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="3.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="92" cy="175" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="5s" repeatCount="indefinite"/>
  </circle>
</svg>`,
    },
  ],
} satisfies SlideContent
