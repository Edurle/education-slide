import type { SlideContent } from '@/types'

export default {
  title: '工具调用演示',
  layout: 'vertical',
  items: [
    {
      type: 'svg',
      content: `<svg viewBox="0 0 960 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowSmall">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9"/><stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#42b883"/><stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <radialGradient id="pulseGlow" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- HUD corners -->
  <path d="M 15 15 L 15 40 M 15 15 L 40 15" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 945 15 L 945 40 M 945 15 L 920 15" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 15 485 L 15 460 M 15 485 L 40 485" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 945 485 L 945 460 M 945 485 L 920 485" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <text x="480" y="35" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">DISPATCH PANEL // 调度面板</text>

  <!-- ═══ TOP SECTION: Core Insight ═══ -->
  <rect x="40" y="50" width="880" height="70" rx="10" fill="#1a1a30" stroke="rgba(14,165,233,0.2)" stroke-width="1"/>
  <circle cx="60" cy="72" r="5" fill="#0ea5e9" opacity="0.5">
    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="78" y="77" font-size="12" fill="rgba(255,255,255,0.5)" font-weight="600">核心洞察</text>
  <text x="78" y="102" font-size="14" fill="rgba(255,255,255,0.7)">工具调用的本质是 <tspan fill="#0ea5e9" font-weight="bold">输出一段特殊格式的文本</tspan> — 模型并不真的"调用"工具</text>

  <!-- ═══ MAIN DISPATCH SCENE ═══ -->
  <!-- Central LLM Engine -->
  <rect x="370" y="160" width="220" height="120" rx="14" fill="#111128" stroke="#8b5cf6" stroke-width="2"/>
  <!-- Engine header -->
  <rect x="370" y="160" width="220" height="30" rx="14" fill="rgba(139,92,246,0.08)"/>
  <rect x="370" y="176" width="220" height="14" fill="rgba(139,92,246,0.08)"/>
  <circle cx="388" cy="175" r="4" fill="#8b5cf6" opacity="0.6">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <text x="400" y="179" font-size="10" fill="#8b5cf6" font-weight="600">LLM ENGINE</text>

  <!-- Core processing indicator -->
  <g transform="translate(480, 230)">
    <circle r="30" fill="url(#pulseGlow)"/>
    <circle r="20" fill="url(#purpleGrad)" opacity="0.7"/>
    <circle r="20" fill="none" stroke="#8b5cf6" stroke-width="1" opacity="0.3">
      <animate attributeName="r" values="20;35" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0" dur="2s" repeatCount="indefinite"/>
    </circle>
    <!-- Spinning gear inside -->
    <g>
      <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
      <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
      <line x1="-6" y1="-6" x2="6" y2="6" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <line x1="6" y1="-6" x2="-6" y2="6" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite"/>
    </g>
  </g>
  <text x="480" y="270" font-size="9" text-anchor="middle" fill="rgba(255,255,255,0.3)">生成 JSON 指令</text>

  <!-- ═══ TOOL TERMINALS (3 stations) ═══ -->

  <!-- Tool 1: weather_search (left) -->
  <rect x="60" y="185" width="160" height="80" rx="10" fill="#1a1a30" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="78" cy="200" r="3" fill="#f59e0b" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <text x="90" y="204" font-size="9" fill="#f59e0b" font-family="monospace">weather_search</text>
  <!-- Tool icon: cloud -->
  <g transform="translate(140, 238)">
    <ellipse cx="0" cy="0" rx="14" ry="8" fill="none" stroke="#f59e0b" stroke-width="1" opacity="0.4"/>
    <text font-size="12" text-anchor="middle" y="5">⛅</text>
  </g>

  <!-- Tool 2: calculator (right-top) -->
  <rect x="740" y="145" width="160" height="80" rx="10" fill="#1a1a30" stroke="#42b883" stroke-width="1.5"/>
  <circle cx="758" cy="160" r="3" fill="#42b883" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
  </circle>
  <text x="770" y="164" font-size="9" fill="#42b883" font-family="monospace">calculator</text>
  <g transform="translate(820, 198)">
    <rect x="-12" y="-10" width="24" height="20" rx="3" fill="none" stroke="#42b883" stroke-width="1" opacity="0.4"/>
    <text font-size="10" text-anchor="middle" y="4">🔢</text>
  </g>

  <!-- Tool 3: database (right-bottom) -->
  <rect x="740" y="260" width="160" height="80" rx="10" fill="#1a1a30" stroke="#0ea5e9" stroke-width="1.5"/>
  <circle cx="758" cy="275" r="3" fill="#0ea5e9" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <text x="770" y="279" font-size="9" fill="#0ea5e9" font-family="monospace">database_query</text>
  <g transform="translate(820, 315)">
    <ellipse cx="0" cy="-6" rx="12" ry="5" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.4"/>
    <rect x="-12" y="-6" width="24" height="14" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
    <ellipse cx="0" cy="8" rx="12" ry="5" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.4"/>
  </g>

  <!-- ═══ DISPATCH LINES (LLM → Tools) ═══ -->
  <!-- Line to weather_search -->
  <line x1="368" y1="220" x2="222" y2="220" stroke="#f59e0b" stroke-width="2" stroke-dasharray="8 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite"/>
  </line>
  <!-- Line to calculator -->
  <line x1="592" y1="195" x2="738" y2="185" stroke="#42b883" stroke-width="2" stroke-dasharray="8 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite"/>
  </line>
  <!-- Line to database -->
  <line x1="592" y1="240" x2="738" y2="295" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="8 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- ═══ JSON PAYLOAD VISUALIZATION ═══ -->
  <!-- Payload 1: going to weather_search -->
  <rect x="280" y="180" width="75" height="45" rx="6" fill="#2a2a1a" stroke="#f59e0b" stroke-width="1" opacity="0.8"/>
  <text x="290" y="196" font-size="7" fill="#f59e0b" font-family="monospace" opacity="0.7">{"name":</text>
  <text x="290" y="208" font-size="7" fill="#f59e0b" font-family="monospace" opacity="0.7"> <tspan fill="#42b883">"weather"</tspan>,</text>
  <text x="290" y="220" font-size="7" fill="rgba(255,255,255,0.3)" font-family="monospace"> "args":{...}}</text>

  <!-- Payload 2: going to calculator -->
  <rect x="620" y="160" width="75" height="45" rx="6" fill="#1a2a1a" stroke="#42b883" stroke-width="1" opacity="0.8"/>
  <text x="630" y="176" font-size="7" fill="#42b883" font-family="monospace" opacity="0.7">{"name":</text>
  <text x="630" y="188" font-size="7" fill="#42b883" font-family="monospace" opacity="0.7"> <tspan fill="#f59e0b">"calc"</tspan>,</text>
  <text x="630" y="200" font-size="7" fill="rgba(255,255,255,0.3)" font-family="monospace"> "args":{...}}</text>

  <!-- ═══ DISPATCH PARTICLES ═══ -->
  <circle r="4" fill="#f59e0b" opacity="0.8" filter="url(#glowSmall)">
    <animateMotion dur="2s" repeatCount="indefinite" path="M 368 220 L 222 220"/>
  </circle>
  <circle r="4" fill="#42b883" opacity="0.8" filter="url(#glowSmall)">
    <animateMotion dur="2s" begin="0.7s" repeatCount="indefinite" path="M 592 195 L 738 185"/>
  </circle>

  <!-- Return particles (tools → LLM) -->
  <circle r="3" fill="#f59e0b" opacity="0.4" filter="url(#glowSmall)">
    <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M 222 220 L 368 220"/>
  </circle>
  <circle r="3" fill="#42b883" opacity="0.4" filter="url(#glowSmall)">
    <animateMotion dur="2s" begin="1.7s" repeatCount="indefinite" path="M 738 185 L 592 195"/>
  </circle>

  <!-- ═══ BOTTOM SECTION: JSON STRUCTURE HIGHLIGHT ═══ -->
  <rect x="40" y="360" width="880" height="100" rx="10" fill="#0d0d1a" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <text x="60" y="385" font-size="10" fill="rgba(255,255,255,0.2)" font-family="monospace">JSON STRUCTURE // 结构化指令分解</text>

  <!-- Step 1: name field -->
  <rect x="60" y="400" width="200" height="45" rx="6" fill="#1a1a30" stroke="#f59e0b" stroke-width="1">
    <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/>
  </rect>
  <circle cx="75" cy="415" r="3" fill="#f59e0b" opacity="0.5"/>
  <text x="85" y="418" font-size="8" fill="#f59e0b" font-family="monospace">STEP 1: 地址</text>
  <text x="70" y="438" font-size="10" fill="rgba(255,255,255,0.5)" font-family="monospace">"name": <tspan fill="#42b883">"weather_search"</tspan></text>

  <!-- Arrow -->
  <line x1="265" y1="422" x2="290" y2="422" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>

  <!-- Step 2: arguments field -->
  <rect x="295" y="400" width="280" height="45" rx="6" fill="#1a1a30" stroke="#42b883" stroke-width="1">
    <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" begin="1s" repeatCount="indefinite"/>
  </rect>
  <circle cx="310" cy="415" r="3" fill="#42b883" opacity="0.5"/>
  <text x="320" y="418" font-size="8" fill="#42b883" font-family="monospace">STEP 2: 货物</text>
  <text x="305" y="438" font-size="10" fill="rgba(255,255,255,0.5)" font-family="monospace">"arguments": <tspan fill="#f59e0b">{"location": "北京"}</tspan></text>

  <!-- Arrow -->
  <line x1="580" y1="422" x2="605" y2="422" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>

  <!-- Step 3: framework execution -->
  <rect x="610" y="400" width="300" height="45" rx="6" fill="#1a1a30" stroke="#0ea5e9" stroke-width="1">
    <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" begin="2s" repeatCount="indefinite"/>
  </rect>
  <circle cx="625" cy="415" r="3" fill="#0ea5e9" opacity="0.5"/>
  <text x="635" y="418" font-size="8" fill="#0ea5e9" font-family="monospace">STEP 3: 框架解析并执行</text>
  <text x="620" y="438" font-size="10" fill="rgba(255,255,255,0.5)" font-family="monospace">framework.<tspan fill="#0ea5e9">execute</tspan>(name, args) → <tspan fill="#42b883">result</tspan></text>
</svg>`,
    },
    {
      type: 'configurable-agent',
      config: {
        name: '天气查询 Agent',
        layout: 'center',
        components: [
          { id: 'input', type: 'input', label: '用户输入' },
          { id: 'llm', type: 'llm', label: 'LLM' },
          { id: 'tools', type: 'tool', label: 'Weather Tool' },
          { id: 'output', type: 'output', label: '回复' },
        ],
        connections: [
          { from: 'input', to: 'llm', label: '问题' },
          { from: 'llm', to: 'tools', label: '调用工具' },
          { from: 'tools', to: 'llm', label: '结果返回', bidirectional: true },
          { from: 'llm', to: 'output', label: '最终回答' },
        ],
        defaultInput: '今天北京的天气怎么样？',
      },
      agentType: 'tool',
    },
  ],
} satisfies SlideContent
