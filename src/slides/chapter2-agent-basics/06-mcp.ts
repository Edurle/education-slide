import type { SlideContent } from '@/types'

export default {
  title: 'MCP 协议',
  layout: 'vertical',
  items: [
    {
      type: 'svg',
      content: `<svg viewBox="0 0 960 550" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowSmall">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <radialGradient id="hexGlow" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#42b883"/><stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/><stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
  </defs>

  <!-- HUD corners -->
  <path d="M 15 15 L 15 40 M 15 15 L 40 15" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 945 15 L 945 40 M 945 15 L 920 15" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 15 535 L 15 510 M 15 535 L 40 535" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 945 535 L 945 510 M 945 535 L 920 535" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <text x="480" y="35" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">UNIVERSAL ADAPTER // 通用适配器</text>

  <!-- ═══ PROBLEM SECTION (top-left) ═══ -->
  <rect x="40" y="50" width="300" height="70" rx="8" fill="#1a1a30" stroke="#ef4444" stroke-width="1" stroke-dasharray="6 3" opacity="0.6"/>
  <circle cx="58" cy="68" r="4" fill="#ef4444" opacity="0.4">
    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="72" y="72" font-size="10" fill="#ef4444" font-weight="600">PROBLEM: 各自为政</text>
  <text x="55" y="95" font-size="9" fill="rgba(255,255,255,0.3)">框架 A 用自己的格式定义工具</text>
  <text x="55" y="110" font-size="9" fill="rgba(255,255,255,0.3)">框架 B 又是另一套 ... 互不兼容</text>

  <!-- ═══ MAIN SCENE: Three frameworks → Hex Adapter → Standardized Tools ═══ -->

  <!-- Framework A: Triangle (LangChain style) -->
  <g transform="translate(100, 220)">
    <polygon points="0,-30 26,15 -26,15" fill="#1a1a30" stroke="#f59e0b" stroke-width="1.5">
      <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite"/>
    </polygon>
    <text x="0" y="0" font-size="8" text-anchor="middle" fill="#f59e0b" font-weight="600">LC</text>
    <text x="0" y="40" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.2)">LangChain</text>
    <!-- Small format indicator -->
    <rect x="-30" y="50" width="60" height="16" rx="3" fill="#2a2a1a" stroke="rgba(245,158,11,0.3)" stroke-width="0.5"/>
    <text x="0" y="62" font-size="6" text-anchor="middle" fill="rgba(245,158,11,0.5)" font-family="monospace">.bind_tools()</text>
  </g>

  <!-- Framework B: Pentagon (OpenAI style) -->
  <g transform="translate(100, 350)">
    <polygon points="0,-30 28.5,-9.3 17.6,24.3 -17.6,24.3 -28.5,-9.3" fill="#1a1a30" stroke="#42b883" stroke-width="1.5">
      <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3s" begin="1s" repeatCount="indefinite"/>
    </polygon>
    <text x="0" y="2" font-size="8" text-anchor="middle" fill="#42b883" font-weight="600">OAI</text>
    <text x="0" y="42" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.2)">OpenAI SDK</text>
    <rect x="-30" y="50" width="60" height="16" rx="3" fill="#1a2a1a" stroke="rgba(66,184,131,0.3)" stroke-width="0.5"/>
    <text x="0" y="62" font-size="6" text-anchor="middle" fill="rgba(66,184,131,0.5)" font-family="monospace">function_call</text>
  </g>

  <!-- Framework C: Diamond (Claude style) -->
  <g transform="translate(100, 475)">
    <polygon points="0,-28 28,0 0,28 -28,0" fill="#1a1a30" stroke="#8b5cf6" stroke-width="1.5">
      <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3s" begin="2s" repeatCount="indefinite"/>
    </polygon>
    <text x="0" y="3" font-size="8" text-anchor="middle" fill="#8b5cf6" font-weight="600">CL</text>
    <text x="0" y="42" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.2)">Claude API</text>
    <rect x="-30" y="50" width="60" height="16" rx="3" fill="#2a1a2a" stroke="rgba(139,92,246,0.3)" stroke-width="0.5"/>
    <text x="0" y="62" font-size="6" text-anchor="middle" fill="rgba(139,92,246,0.5)" font-family="monospace">tool_use</text>
  </g>

  <!-- ═══ CONNECTING PIPES (Framework → Hex) ═══ -->
  <!-- Pipe A -->
  <line x1="130" y1="220" x2="380" y2="280" stroke="#f59e0b" stroke-width="2" stroke-dasharray="8 4" opacity="0.25">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite"/>
  </line>
  <circle r="3" fill="#f59e0b" opacity="0.7" filter="url(#glowSmall)">
    <animateMotion dur="2s" repeatCount="indefinite" path="M 130 220 L 380 280"/>
  </circle>

  <!-- Pipe B -->
  <line x1="130" y1="350" x2="380" y2="310" stroke="#42b883" stroke-width="2" stroke-dasharray="8 4" opacity="0.25">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.2s" repeatCount="indefinite"/>
  </line>
  <circle r="3" fill="#42b883" opacity="0.7" filter="url(#glowSmall)">
    <animateMotion dur="2.5s" begin="0.5s" repeatCount="indefinite" path="M 130 350 L 380 310"/>
  </circle>

  <!-- Pipe C -->
  <line x1="130" y1="475" x2="380" y2="340" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="8 4" opacity="0.25">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="0.8s" repeatCount="indefinite"/>
  </line>
  <circle r="3" fill="#8b5cf6" opacity="0.7" filter="url(#glowSmall)">
    <animateMotion dur="3s" begin="1s" repeatCount="indefinite" path="M 130 475 L 380 340"/>
  </circle>

  <!-- ═══ CENTRAL HEX ADAPTER (MCP Server) ═══ -->
  <!-- Hex glow background -->
  <circle cx="440" cy="310" r="100" fill="url(#hexGlow)"/>

  <!-- Outer rotating hex ring -->
  <polygon points="440,240 510,275 510,345 440,380 370,345 370,275" fill="none" stroke="#0ea5e9" stroke-width="1" stroke-dasharray="10 5" opacity="0.2">
    <animate attributeName="stroke-dashoffset" from="0" to="-30" dur="3s" repeatCount="indefinite"/>
  </polygon>

  <!-- Main hex body -->
  <polygon points="440,255 500,282 500,338 440,365 380,338 380,282" fill="#0d1a2a" stroke="#0ea5e9" stroke-width="2.5"/>

  <!-- Inner hex decoration -->
  <polygon points="440,272 485,292 485,328 440,348 395,328 395,292" fill="none" stroke="rgba(14,165,233,0.15)" stroke-width="1">
    <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite"/>
  </polygon>

  <!-- MCP icon: adapter symbol -->
  <g transform="translate(440, 300)">
    <circle r="16" fill="url(#hexGrad)" opacity="0.6"/>
    <circle r="16" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3">
      <animate attributeName="r" values="16;28" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.3;0" dur="2s" repeatCount="indefinite"/>
    </circle>
    <!-- Adapter icon: two arrows merging -->
    <line x1="-7" y1="-5" x2="0" y2="0" stroke="white" stroke-width="2" opacity="0.7"/>
    <line x1="-7" y1="5" x2="0" y2="0" stroke="white" stroke-width="2" opacity="0.7"/>
    <line x1="0" y1="0" x2="7" y2="0" stroke="white" stroke-width="2" opacity="0.7"/>
  </g>

  <text x="440" y="330" font-size="11" text-anchor="middle" fill="#0ea5e9" font-weight="bold">MCP</text>
  <text x="440" y="345" font-size="7" text-anchor="middle" fill="rgba(255,255,255,0.3)">Model Context Protocol</text>

  <!-- Status LEDs on hex -->
  <circle cx="392" cy="268" r="2.5" fill="#f59e0b" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="440" cy="252" r="2.5" fill="#42b883" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="488" cy="268" r="2.5" fill="#8b5cf6" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="1s" repeatCount="indefinite"/>
  </circle>

  <!-- ═══ STANDARDIZED OUTPUT PIPES (Hex → Tools) ═══ -->
  <!-- Output pipe to Tool 1 -->
  <line x1="502" y1="280" x2="640" y2="220" stroke="#0ea5e9" stroke-width="2.5" stroke-dasharray="10 5" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-30" dur="1s" repeatCount="indefinite"/>
  </line>
  <!-- Output pipe to Tool 2 -->
  <line x1="502" y1="310" x2="640" y2="310" stroke="#0ea5e9" stroke-width="2.5" stroke-dasharray="10 5" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-30" dur="1s" repeatCount="indefinite"/>
  </line>
  <!-- Output pipe to Tool 3 -->
  <line x1="502" y1="340" x2="640" y2="400" stroke="#0ea5e9" stroke-width="2.5" stroke-dasharray="10 5" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-30" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Output particles -->
  <circle r="3.5" fill="#0ea5e9" opacity="0.7" filter="url(#glowSmall)">
    <animateMotion dur="2s" repeatCount="indefinite" path="M 502 280 L 640 220"/>
  </circle>
  <circle r="3.5" fill="#0ea5e9" opacity="0.7" filter="url(#glowSmall)">
    <animateMotion dur="2s" begin="0.7s" repeatCount="indefinite" path="M 502 310 L 640 310"/>
  </circle>
  <circle r="3.5" fill="#0ea5e9" opacity="0.7" filter="url(#glowSmall)">
    <animateMotion dur="2s" begin="1.4s" repeatCount="indefinite" path="M 502 340 L 640 400"/>
  </circle>

  <!-- ═══ STANDARDIZED TOOLS (right side) ═══ -->
  <!-- Tool 1: Resources -->
  <rect x="640" y="180" width="140" height="70" rx="8" fill="#0d2a3d" stroke="#0ea5e9" stroke-width="1.5"/>
  <circle cx="658" cy="198" r="3" fill="#0ea5e9" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="668" y="201" font-size="9" fill="#0ea5e9" font-weight="600">Resources</text>
  <text x="710" y="225" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">可读取的数据源</text>
  <rect x="670" y="233" width="80" height="12" rx="3" fill="rgba(14,165,233,0.1)"/>
  <text x="710" y="243" font-size="6" text-anchor="middle" fill="#0ea5e9" font-family="monospace">STANDARD ✓</text>

  <!-- Tool 2: Prompts -->
  <rect x="640" y="275" width="140" height="70" rx="8" fill="#0d2a3d" stroke="#0ea5e9" stroke-width="1.5"/>
  <circle cx="658" cy="293" r="3" fill="#0ea5e9" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.7s" repeatCount="indefinite"/>
  </circle>
  <text x="668" y="296" font-size="9" fill="#0ea5e9" font-weight="600">Prompts</text>
  <text x="710" y="320" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">预定义提示模板</text>
  <rect x="670" y="328" width="80" height="12" rx="3" fill="rgba(14,165,233,0.1)"/>
  <text x="710" y="338" font-size="6" text-anchor="middle" fill="#0ea5e9" font-family="monospace">STANDARD ✓</text>

  <!-- Tool 3: Tools -->
  <rect x="640" y="370" width="140" height="70" rx="8" fill="#0d2a3d" stroke="#0ea5e9" stroke-width="1.5"/>
  <circle cx="658" cy="388" r="3" fill="#0ea5e9" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1.4s" repeatCount="indefinite"/>
  </circle>
  <text x="668" y="391" font-size="9" fill="#0ea5e9" font-weight="600">Tools</text>
  <text x="710" y="415" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">可执行的函数</text>
  <rect x="670" y="423" width="80" height="12" rx="3" fill="rgba(14,165,233,0.1)"/>
  <text x="710" y="433" font-size="6" text-anchor="middle" fill="#0ea5e9" font-family="monospace">STANDARD ✓</text>

  <!-- ═══ TRANSFORMATION LABELS ═══ -->
  <text x="100" y="165" font-size="9" fill="rgba(239,68,68,0.4)" font-family="monospace">CHAOS // 各自为政</text>
  <text x="700" y="165" font-size="9" fill="rgba(14,165,233,0.4)" font-family="monospace">ORDER // 统一标准</text>

  <!-- Arrow labels on pipes -->
  <text x="255" y="240" font-size="7" fill="rgba(245,158,11,0.3)" font-family="monospace" transform="rotate(-12, 255, 240)">DIFFERENT FORMAT →</text>
  <text x="255" y="335" font-size="7" fill="rgba(66,184,131,0.3)" font-family="monospace" transform="rotate(-5, 255, 335)">DIFFERENT FORMAT →</text>
  <text x="255" y="430" font-size="7" fill="rgba(139,92,246,0.3)" font-family="monospace" transform="rotate(10, 255, 430)">DIFFERENT FORMAT →</text>

  <text x="570" y="240" font-size="7" fill="rgba(14,165,233,0.3)" font-family="monospace" transform="rotate(-12, 570, 240)">→ UNIFIED</text>
  <text x="570" y="310" font-size="7" fill="rgba(14,165,233,0.3)" font-family="monospace">→ UNIFIED</text>
  <text x="570" y="385" font-size="7" fill="rgba(14,165,233,0.3)" font-family="monospace" transform="rotate(12, 570, 385)">→ UNIFIED</text>

  <!-- ═══ BOTTOM: Before/After comparison cards ═══ -->
  <rect x="40" y="465" width="420" height="65" rx="8" fill="#1a1a30" stroke="#ef4444" stroke-width="1" stroke-dasharray="4 3" opacity="0.4"/>
  <text x="60" y="485" font-size="9" fill="#ef4444" font-family="monospace">BEFORE:</text>
  <text x="60" y="502" font-size="8" fill="rgba(255,255,255,0.2)">✗ 工具定义格式不统一</text>
  <text x="60" y="517" fill="rgba(255,255,255,0.2)" font-size="8">✗ 不同框架无法共享工具</text>

  <rect x="500" y="465" width="420" height="65" rx="8" fill="#0d2a3d" stroke="#42b883" stroke-width="1" opacity="0.5"/>
  <text x="520" y="485" font-size="9" fill="#42b883" font-family="monospace">AFTER MCP:</text>
  <text x="520" y="502" font-size="8" fill="rgba(255,255,255,0.3)">✓ 标准化工具 Schema</text>
  <text x="520" y="517" font-size="8" fill="rgba(255,255,255,0.3)">✓ 一次定义，到处使用</text>

  <!-- Transformation arrow between cards -->
  <line x1="462" y1="497" x2="498" y2="497" stroke="#0ea5e9" stroke-width="2" opacity="0.5"/>
  <polygon points="498,492 508,497 498,502" fill="#0ea5e9" opacity="0.5"/>

  <!-- ═══ Bottom status bar ═══ -->
  <text x="480" y="545" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.08)" font-family="monospace">modelcontextprotocol.io // SPEC: v2024-11-05</text>
</svg>`,
    },
    {
      type: 'markdown',
      content: `> **核心概念**：MCP 定义了三种标准化能力 — **Resources**（可读取的数据源）、**Prompts**（预定义提示模板）、**Tools**（可执行函数）。无论底层框架如何不同，MCP 都能统一成一种标准格式。
>
> 官方文档: [modelcontextprotocol.io](https://modelcontextprotocol.io) | GitHub: [modelcontextprotocol](https://github.com/modelcontextprotocol)`,
    },
  ],
} satisfies SlideContent
