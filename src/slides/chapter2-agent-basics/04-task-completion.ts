import type { SlideContent } from '@/types'

export default {
  title: '任务结束判定',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# 何时停止循环？

智能体的输出经过质检扫描门：检测到 \`tool_calls\` 则分流到侧环继续执行；为空则通过出货门，输出最终答案。

\`\`\`python
while True:
    # 调用模型，绑定可用工具
    output = llm.bind_tools(tools).invoke(messages)

    # 质检扫描
    if not output.tool_calls:
        break

    # 分流到工具执行
    for tc in output.tool_calls:
        obs = tools[tc['name']].invoke(tc['args'])
        messages += [output, ToolMessage(obs)]
\`\`\`
`,
    },
    {
      type: 'svg',
      content: `<svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowSmall">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="scanBeam" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#42b883"/><stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>

  <!-- HUD corners -->
  <path d="M 15 15 L 15 40 M 15 15 L 40 15" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 585 15 L 585 40 M 585 15 L 560 15" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 15 505 L 15 480 M 15 505 L 40 505" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 585 505 L 585 480 M 585 505 L 560 505" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <text x="300" y="35" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">QUALITY GATE // 质检关卡</text>

  <!-- ═══ MAIN CONVEYOR (horizontal) ═══ -->
  <rect x="30" y="200" width="540" height="8" rx="4" fill="rgba(14,165,233,0.06)"/>
  <line x1="30" y1="204" x2="570" y2="204" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="8 4" opacity="0.25">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- ═══ LLM OUTPUT BLOCKS on conveyor ═══ -->
  <!-- Block 1: has tool_calls (amber) -->
  <g>
    <rect x="30" y="180" width="60" height="40" rx="6" fill="#2a2a1a" stroke="#f59e0b" stroke-width="1.5">
      <animate attributeName="x" from="-80" to="570" dur="8s" repeatCount="indefinite"/>
    </rect>
    <text font-size="7" fill="#f59e0b" font-family="monospace" opacity="0.7">
      <animate attributeName="x" from="-55" to="55" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="y" values="195;195" dur="8s" repeatCount="indefinite"/>
      tool_calls: [...]
    </text>
    <text font-size="7" fill="rgba(255,255,255,0.2)">
      <animate attributeName="x" from="-50" to="50" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="y" values="210;210" dur="8s" repeatCount="indefinite"/>
      LLM Output #1
    </text>
  </g>

  <!-- Block 2: no tool_calls (green) -->
  <g>
    <rect x="30" y="180" width="60" height="40" rx="6" fill="#1a2a1a" stroke="#42b883" stroke-width="1.5">
      <animate attributeName="x" from="-80" to="570" dur="8s" begin="-3s" repeatCount="indefinite"/>
    </rect>
    <text font-size="7" fill="#42b883" font-family="monospace" opacity="0.7">
      <animate attributeName="x" from="-55" to="55" dur="8s" begin="-3s" repeatCount="indefinite"/>
      <animate attributeName="y" values="195;195" dur="8s" repeatCount="indefinite"/>
      tool_calls: []
    </text>
    <text font-size="7" fill="rgba(255,255,255,0.2)">
      <animate attributeName="x" from="-50" to="50" dur="8s" begin="-3s" repeatCount="indefinite"/>
      <animate attributeName="y" values="210;210" dur="8s" repeatCount="indefinite"/>
      Final Answer
    </text>
  </g>

  <!-- ═══ SCANNER GATE ═══ -->
  <!-- Gate frame -->
  <rect x="190" y="155" width="80" height="110" rx="6" fill="none" stroke="#0ea5e9" stroke-width="2"/>
  <!-- Top bar -->
  <rect x="195" y="160" width="70" height="20" rx="4" fill="#1a1a3a"/>
  <text x="230" y="175" font-size="9" text-anchor="middle" fill="#0ea5e9" font-weight="bold">SCAN</text>
  <circle cx="258" cy="170" r="3" fill="#0ea5e9">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
  </circle>

  <!-- Scan beam (sweeping line) -->
  <line x1="210" y1="185" x2="210" y2="255" stroke="#0ea5e9" stroke-width="2" opacity="0.6">
    <animate attributeName="x1" values="200;260;200" dur="1.5s" repeatCount="indefinite"/>
    <animate attributeName="x2" values="200;260;200" dur="1.5s" repeatCount="indefinite"/>
  </line>
  <!-- Scan glow -->
  <rect x="200" y="185" width="60" height="70" fill="rgba(14,165,233,0.03)">
    <animate attributeName="fill" values="rgba(14,165,233,0.02);rgba(14,165,233,0.08);rgba(14,165,233,0.02)" dur="1.5s" repeatCount="indefinite"/>
  </rect>
  <text x="230" y="215" font-size="7" text-anchor="middle" fill="rgba(14,165,233,0.4)" font-family="monospace">INSPECTING...</text>

  <!-- ═══ DECISION FORK after scanner ═══ -->
  <circle cx="300" cy="204" r="6" fill="#1a1a3a" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="300" y="225" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">ROUTE</text>

  <!-- Path A: Tool execution side-loop (upper arch) -->
  <path d="M 306 198 Q 380 100 460 198" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite"/>
  </path>

  <!-- Tool execution station -->
  <rect x="350" y="100" width="90" height="50" rx="8" fill="#2a2a1a" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="365" cy="115" r="3" fill="#f59e0b" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <text x="375" y="118" font-size="8" fill="#f59e0b">TOOL EXEC</text>
  <text x="395" y="138" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">工具执行站</text>

  <!-- Returning particle from tool exec -->
  <circle r="3" fill="#f59e0b" opacity="0.7" filter="url(#glowSmall)">
    <animateMotion dur="3s" repeatCount="indefinite" path="M 306 198 Q 380 100 460 198"/>
  </circle>

  <!-- Label on fork A -->
  <text x="340" y="130" font-size="8" fill="#f59e0b" font-family="monospace">tool_calls ≠ []</text>
  <text x="470" y="195" font-size="7" fill="rgba(245,158,11,0.4)" font-family="monospace">RE-ENTER →</text>

  <!-- ═══ EXIT GATE (right side) ═══ -->
  <rect x="500" y="170" width="80" height="70" rx="8" fill="#1a3a2a" stroke="#42b883" stroke-width="2"/>
  <text x="540" y="200" font-size="10" text-anchor="middle" fill="#42b883" font-weight="bold">EXIT</text>
  <text x="540" y="215" font-size="7" text-anchor="middle" fill="rgba(66,184,131,0.5)">出货门</text>
  <!-- Exit glow pulse -->
  <rect x="500" y="170" width="80" height="70" rx="8" fill="none" stroke="#42b883" stroke-width="1" opacity="0">
    <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="stroke-width" values="1;4;1" dur="2s" repeatCount="indefinite"/>
  </rect>

  <!-- Label on fork B -->
  <text x="400" y="248" font-size="8" fill="#42b883" font-family="monospace">tool_calls == []</text>

  <!-- ═══ FINAL ANSWER display ═══ -->
  <rect x="440" y="300" width="150" height="60" rx="10" fill="#1a3a2a" stroke="#42b883" stroke-width="1.5" filter="url(#glow)"/>
  <text x="515" y="325" font-size="10" text-anchor="middle" fill="#42b883" font-weight="bold">✓ 最终答案</text>
  <text x="515" y="345" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Final Answer Output</text>

  <!-- Connection from exit gate to final answer -->
  <line x1="540" y1="242" x2="515" y2="298" stroke="#42b883" stroke-width="2" stroke-dasharray="6 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Burst particles around final answer -->
  <circle cx="515" cy="330" r="2" fill="#42b883" opacity="0">
    <animate attributeName="cx" values="515;490" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="330;310" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="515" cy="330" r="2" fill="#42b883" opacity="0">
    <animate attributeName="cx" values="515;540" dur="2s" begin="0.3s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="330;310" dur="2s" begin="0.3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="515" cy="330" r="2" fill="#42b883" opacity="0">
    <animate attributeName="cx" values="515;495" dur="2s" begin="0.6s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="330;350" dur="2s" begin="0.6s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.6s" repeatCount="indefinite"/>
  </circle>
  <circle cx="515" cy="330" r="2" fill="#42b883" opacity="0">
    <animate attributeName="cx" values="515;535" dur="2s" begin="0.9s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="330;350" dur="2s" begin="0.9s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.9s" repeatCount="indefinite"/>
  </circle>

  <!-- ═══ FLOW LABELS ═══ -->
  <text x="120" y="175" font-size="8" fill="rgba(255,255,255,0.2)" font-family="monospace">LLM OUTPUT →</text>
  <text x="120" y="250" font-size="7" fill="rgba(255,255,255,0.12)" font-family="monospace">CONVEYOR BELT</text>

  <!-- ═══ BOTTOM STATUS BAR ═══ -->
  <rect x="30" y="420" width="540" height="80" rx="8" fill="#0d0d1a" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <text x="50" y="445" font-size="9" fill="rgba(255,255,255,0.2)" font-family="monospace">FLOW SUMMARY:</text>

  <!-- Mini flow: LLM → Scan → Fork -->
  <rect x="50" y="455" width="50" height="20" rx="4" fill="#2a2a4a" stroke="rgba(139,92,246,0.4)" stroke-width="1"/>
  <text x="75" y="469" font-size="7" text-anchor="middle" fill="rgba(139,92,246,0.6)">LLM</text>
  <line x1="102" y1="465" x2="130" y2="465" stroke="rgba(14,165,233,0.3)" stroke-width="1.5" stroke-dasharray="4 3">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
  </line>
  <rect x="132" y="455" width="60" height="20" rx="4" fill="rgba(14,165,233,0.1)" stroke="#0ea5e9" stroke-width="1"/>
  <text x="162" y="469" font-size="7" text-anchor="middle" fill="#0ea5e9">SCAN</text>
  <line x1="194" y1="465" x2="222" y2="465" stroke="rgba(14,165,233,0.3)" stroke-width="1.5" stroke-dasharray="4 3">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Fork diamond -->
  <polygon points="240,455 252,465 240,475 228,465" fill="#1a1a3a" stroke="#0ea5e9" stroke-width="1"/>

  <!-- Fork A: up to tools -->
  <line x1="240" y1="455" x2="290" y2="440" stroke="rgba(245,158,11,0.3)" stroke-width="1.5" stroke-dasharray="4 3">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
  </line>
  <rect x="292" y="430" width="65" height="20" rx="4" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" stroke-width="1"/>
  <text x="324" y="444" font-size="7" text-anchor="middle" fill="#f59e0b">TOOL EXEC</text>

  <!-- Return arrow from tool exec back to LLM -->
  <path d="M 357 440 Q 380 420 50 440" fill="none" stroke="rgba(245,158,11,0.2)" stroke-width="1" stroke-dasharray="3 3">
    <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.5s" repeatCount="indefinite"/>
  </path>
  <text x="390" y="422" font-size="6" fill="rgba(245,158,11,0.3)" font-family="monospace">LOOP BACK</text>

  <!-- Fork B: right to exit -->
  <line x1="252" y1="465" x2="380" y2="465" stroke="rgba(66,184,131,0.3)" stroke-width="1.5" stroke-dasharray="4 3">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
  </line>
  <rect x="382" y="455" width="60" height="20" rx="4" fill="rgba(66,184,131,0.1)" stroke="#42b883" stroke-width="1"/>
  <text x="412" y="469" font-size="7" text-anchor="middle" fill="#42b883">EXIT ✓</text>
  <line x1="444" y1="465" x2="470" y2="465" stroke="rgba(66,184,131,0.3)" stroke-width="1.5" stroke-dasharray="4 3">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
  </line>
  <rect x="472" y="455" width="80" height="20" rx="4" fill="rgba(66,184,131,0.15)" stroke="#42b883" stroke-width="1"/>
  <text x="512" y="469" font-size="7" text-anchor="middle" fill="#42b883">最终答案</text>

  <!-- Side labels -->
  <text x="540" y="270" font-size="8" text-anchor="end" fill="rgba(255,255,255,0.15)" font-family="monospace">GATE.OPEN: TRUE</text>
  <text x="540" y="285" font-size="8" text-anchor="end" fill="rgba(255,255,255,0.15)" font-family="monospace">TOOL_CALLS: EMPTY</text>
</svg>`,
    },
  ],
} satisfies SlideContent
