import type { SlideContent } from '@/types'

export default {
  title: 'Agentic Search',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# Agentic Search：AI 驱动的智能检索

从"被动管道"到"主动搜索"，核心区别在于 **AI 自主决策**：

| 对比 | 传统/混合 RAG | Agentic Search |
|------|-------------|---------------|
| 检索策略 | 固定流程 | Agent 自主规划 |
| 查询方式 | 原始问题 | 自动改写/拆分 |
| 迭代次数 | 单次 | 多轮直至充分 |
| 质量判断 | 无 | Agent 评估信息充分性 |

**工作循环**：
1. **分析** — 理解问题，制定搜索计划
2. **检索** — 自主选择检索策略和来源
3. **评估** — 判断信息是否充分
4. **迭代** — 不充分则改写查询，再次检索
5. **综合** — 充分后整合生成回答

> **核心洞察**：Agentic Search 不再是"检索→生成"的固定管道，而是一个 **能思考、会判断、懂迭代** 的智能体——它像研究员一样，自己决定查什么、怎么查、查到什么程度才算够。
`,
    },
    {
      type: 'svg',
      content: `<svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="agentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="analyzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="evalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#42b883"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <linearGradient id="genGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrCyan" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#0ea5e9"/>
    </marker>
    <marker id="arrAmber" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#f59e0b"/>
    </marker>
    <marker id="arrGreen" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#42b883"/>
    </marker>
    <marker id="arrPurple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#8b5cf6"/>
    </marker>
    <marker id="arrRed" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#ef4444"/>
    </marker>
  </defs>

  <!-- HUD corners -->
  <path d="M 10 10 L 10 35 M 10 10 L 35 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 590 10 L 590 35 M 590 10 L 565 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 10 510 L 10 485 M 10 510 L 35 510" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 590 510 L 590 485 M 590 510 L 565 510" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="32" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">AGENTIC SEARCH LOOP // AI 驱动智能检索</text>

  <!-- Query input -->
  <rect x="200" y="44" width="200" height="30" rx="8" fill="#1a1a30" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <text x="300" y="64" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.4)">用户问题</text>

  <!-- Arrow down to Agent -->
  <line x1="300" y1="76" x2="300" y2="100" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" marker-end="url(#arrPurple)"/>

  <!-- ===== CENTER: AI Agent ===== -->
  <rect x="220" y="100" width="160" height="60" rx="12" fill="#1a1a30" stroke="#8b5cf6" stroke-width="2">
    <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite"/>
  </rect>

  <!-- Agent brain -->
  <circle cx="248" cy="130" r="14" fill="url(#agentGrad)" opacity="0.8"/>
  <text x="248" y="134" font-size="8" text-anchor="middle" fill="white" font-weight="bold">AI</text>

  <text x="310" y="126" font-size="12" text-anchor="middle" fill="#8b5cf6" font-weight="600">智能体</text>
  <text x="310" y="140" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">自主规划 · 判断 · 决策</text>

  <!-- Pulse rings around agent -->
  <circle cx="300" cy="130" r="30" fill="none" stroke="#8b5cf6" stroke-width="1" opacity="0">
    <animate attributeName="r" values="30;60" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0" dur="3s" repeatCount="indefinite"/>
  </circle>

  <!-- ===== OUTER LOOP: Analyze → Search → Evaluate ===== -->
  <!-- Loop path: rectangular around agent -->

  <!-- Analyze (top-left) -->
  <rect x="50" y="90" width="120" height="56" rx="10" fill="#0d1a2a" stroke="#0ea5e9" stroke-width="1.5"/>
  <circle cx="66" cy="104" r="3" fill="#0ea5e9">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="110" y="118" font-size="11" text-anchor="middle" fill="#0ea5e9" font-weight="600">分析</text>
  <text x="110" y="132" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">查询改写 · 拆解</text>

  <!-- Search (right) -->
  <rect x="430" y="180" width="130" height="56" rx="10" fill="#1a1a20" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="446" cy="194" r="3" fill="#f59e0b">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.7s" repeatCount="indefinite"/>
  </circle>
  <text x="495" y="208" font-size="11" text-anchor="middle" fill="#f59e0b" font-weight="600">检索</text>
  <text x="495" y="222" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">选择策略 · 多源检索</text>

  <!-- Evaluate (bottom) -->
  <rect x="180" y="280" width="140" height="56" rx="10" fill="#0d1f17" stroke="#42b883" stroke-width="1.5"/>
  <circle cx="196" cy="294" r="3" fill="#42b883">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1.4s" repeatCount="indefinite"/>
  </circle>
  <text x="250" y="308" font-size="11" text-anchor="middle" fill="#42b883" font-weight="600">评估</text>
  <text x="250" y="322" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">信息充分性判断</text>

  <!-- ===== LOOP ARROWS ===== -->
  <!-- Agent → Analyze -->
  <line x1="220" y1="118" x2="172" y2="112" stroke="#0ea5e9" stroke-width="1.5" marker-end="url(#arrCyan)" opacity="0.5">
    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
  </line>

  <!-- Analyze → Search -->
  <path d="M 170 130 L 430 200" fill="none" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" repeatCount="indefinite"/>
  </path>

  <!-- Search → Evaluate -->
  <path d="M 430 230 L 320 295" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
  </path>

  <!-- Evaluate → Agent (loop back) -->
  <path d="M 220 295 L 240 162" fill="none" stroke="#42b883" stroke-width="1.5" marker-end="url(#arrGreen)" opacity="0.5">
    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin="1s" repeatCount="indefinite"/>
  </path>

  <!-- Loop label -->
  <text x="155" y="235" font-size="9" fill="rgba(255,255,255,0.2)" font-family="monospace" transform="rotate(-60,155,235)">不充分？再来</text>

  <!-- ===== LOOP PARTICLES ===== -->
  <circle r="3" fill="#0ea5e9" opacity="0.8" filter="url(#glow)">
    <animate attributeName="fill" values="#0ea5e9;#f59e0b;#42b883;#8b5cf6" dur="6s" repeatCount="indefinite"/>
    <animateMotion dur="6s" repeatCount="indefinite"
      path="M 300 130 L 110 118 L 495 208 L 250 308 L 300 130"/>
  </circle>
  <circle r="2" fill="#42b883" opacity="0.4">
    <animateMotion dur="6s" begin="-2s" repeatCount="indefinite"
      path="M 300 130 L 110 118 L 495 208 L 250 308 L 300 130"/>
  </circle>

  <!-- ===== EVALUATION DECISION DIAMOND ===== -->
  <g transform="translate(350, 295)">
    <polygon points="0,-14 20,0 0,14 -20,0" fill="#0d1f17" stroke="#42b883" stroke-width="1.5"/>
    <text x="0" y="4" font-size="7" text-anchor="middle" fill="#42b883">?</text>
  </g>

  <!-- Arrow: Evaluate → Diamond -->
  <line x1="320" y1="308" x2="328" y2="300" stroke="#42b883" stroke-width="1" opacity="0.4"/>

  <!-- Decision: Diamond → back to Agent (not enough) -->
  <path d="M 350 281 L 350 160 L 380 140" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4 3" opacity="0.4">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
  </path>
  <text x="360" y="220" font-size="7" fill="#f59e0b" opacity="0.5">不够</text>

  <!-- Decision: Diamond → Generate (enough) -->
  <line x1="370" y1="295" x2="420" y2="340" stroke="#42b883" stroke-width="1" marker-end="url(#arrGreen)" opacity="0.5"/>
  <text x="405" y="320" font-size="7" fill="#42b883" opacity="0.5">够了</text>

  <!-- ===== GENERATE (final) ===== -->
  <rect x="390" y="340" width="160" height="50" rx="10" fill="#1a1a30" stroke="#ef4444" stroke-width="1.5"/>
  <circle cx="406" cy="354" r="3" fill="#ef4444">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <text x="470" y="366" font-size="12" text-anchor="middle" fill="white" font-weight="600">综合生成</text>
  <text x="470" y="380" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">整合所有检索结果</text>

  <!-- Arrow to answer -->
  <line x1="470" y1="392" x2="470" y2="418" stroke="#42b883" stroke-width="1.5" marker-end="url(#arrGreen)" opacity="0.5"/>

  <!-- Final answer -->
  <rect x="420" y="420" width="100" height="34" rx="8" fill="#1a3e2a" stroke="#42b883" stroke-width="2"/>
  <text x="470" y="442" font-size="12" text-anchor="middle" fill="#42b883" font-weight="600">回答 ✓</text>

  <!-- ===== ITERATION COUNTER ===== -->
  <rect x="50" y="300" width="100" height="44" rx="8" fill="#0d0d1a" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="100" y="320" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-family="monospace">ITERATION</text>
  <text x="100" y="336" font-size="14" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-family="monospace">03</text>

  <!-- ===== STATUS BAR ===== -->
  <rect x="20" y="468" width="560" height="36" rx="6" fill="#0d0d1a" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <text x="40" y="490" font-size="8" fill="rgba(255,255,255,0.15)" font-family="monospace">MODE: AGENTIC</text>
  <text x="180" y="490" font-size="8" fill="rgba(255,255,255,0.15)" font-family="monospace">LOOP: ADAPTIVE</text>
  <text x="340" y="490" font-size="8" fill="rgba(255,255,255,0.15)" font-family="monospace">QUALITY: SELF-EVALUATED</text>
  <circle cx="520" cy="486" r="3" fill="#42b883" opacity="0.6">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
  </circle>
  <text x="530" y="490" font-size="8" fill="rgba(255,255,255,0.2)">ACTIVE</text>

  <!-- Sparkle effects -->
  <circle cx="110" cy="105" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" begin="0s" repeatCount="indefinite"/>
  </circle>
  <circle cx="495" cy="195" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <circle cx="250" cy="295" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" begin="2s" repeatCount="indefinite"/>
  </circle>
</svg>`,
    },
  ],
} satisfies SlideContent
