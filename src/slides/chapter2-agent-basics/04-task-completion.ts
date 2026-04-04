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

  <!-- ═══ LLM STATION (left) ═══ -->
  <rect x="30" y="175" width="80" height="55" rx="8" fill="#1a1a30" stroke="#8b5cf6" stroke-width="1.5"/>
  <circle cx="45" cy="189" r="3" fill="#8b5cf6">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="70" y="195" font-size="9" text-anchor="middle" fill="#8b5cf6" font-weight="bold">LLM</text>
  <text x="70" y="208" font-size="7" text-anchor="middle" fill="rgba(255,255,255,0.25)">调用模型</text>
  <text x="70" y="222" font-size="7" text-anchor="middle" fill="rgba(255,255,255,0.25)">+ 工具</text>

  <!-- ═══ SCANNER GATE ═══ -->
  <rect x="190" y="155" width="80" height="110" rx="6" fill="none" stroke="#0ea5e9" stroke-width="2"/>
  <rect x="195" y="160" width="70" height="20" rx="4" fill="#1a1a3a"/>
  <text x="230" y="175" font-size="9" text-anchor="middle" fill="#0ea5e9" font-weight="bold">SCAN</text>
  <circle cx="258" cy="170" r="3" fill="#0ea5e9">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
  </circle>

  <!-- Scan beam -->
  <line x1="210" y1="185" x2="210" y2="255" stroke="#0ea5e9" stroke-width="2" opacity="0.6">
    <animate attributeName="x1" values="200;260;200" dur="1.5s" repeatCount="indefinite"/>
    <animate attributeName="x2" values="200;260;200" dur="1.5s" repeatCount="indefinite"/>
  </line>
  <rect x="200" y="185" width="60" height="70" fill="rgba(14,165,233,0.03)">
    <animate attributeName="fill" values="rgba(14,165,233,0.02);rgba(14,165,233,0.08);rgba(14,165,233,0.02)" dur="1.5s" repeatCount="indefinite"/>
  </rect>
  <text x="230" y="215" font-size="7" text-anchor="middle" fill="rgba(14,165,233,0.4)" font-family="monospace">检查 tool_calls</text>

  <!-- ═══ DECISION FORK ═══ -->
  <circle cx="300" cy="204" r="6" fill="#1a1a3a" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="300" y="225" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">ROUTE</text>

  <!-- ═══ RETURN PATH: Tool Exec → back to LLM (the key loop) ═══ -->
  <!-- Upper arch: fork → tool exec -->
  <path d="M 306 198 Q 380 100 460 198" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite"/>
  </path>

  <!-- Tool execution station -->
  <rect x="345" y="95" width="100" height="55" rx="8" fill="#2a2a1a" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="360" cy="110" r="3" fill="#f59e0b" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <text x="395" y="115" font-size="8" text-anchor="middle" fill="#f59e0b" font-weight="bold">TOOL EXEC</text>
  <text x="395" y="130" font-size="7" text-anchor="middle" fill="rgba(255,255,255,0.3)">执行工具</text>
  <text x="395" y="142" font-size="7" text-anchor="middle" fill="rgba(255,255,255,0.3)">返回结果</text>

  <!-- Return path: tool exec → back to LLM (left side, big loop) -->
  <path d="M 345 125 Q 200 50 50 160 Q 40 170 50 180" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4" opacity="0.25">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.2s" repeatCount="indefinite"/>
  </path>

  <!-- "LOOP" label on return path -->
  <text x="170" y="62" font-size="8" fill="#f59e0b" font-family="monospace" text-anchor="middle" opacity="0.4">↺ 回到起点，重新调用 LLM</text>

  <!-- Label on fork A -->
  <text x="340" y="128" font-size="7" fill="#f59e0b" font-family="monospace">tool_calls ≠ []</text>

  <!-- ═══ LOOPING PARTICLE: 2 tool loops, then exit ═══ -->
  <!-- Full cycle: LLM → conveyor → scan → fork UP → tool exec → return to LLM → -->
  <!--             LLM → conveyor → scan → fork UP → tool exec → return to LLM → -->
  <!--             LLM → conveyor → scan → fork RIGHT → EXIT -->
  <!-- Total: ~15s cycle -->

  <circle r="4" fill="#f59e0b" opacity="0.9" filter="url(#glow)">
    <animate attributeName="fill" values="#f59e0b;#f59e0b;#f59e0b;#0ea5e9;#f59e0b;#f59e0b;#0ea5e9;#f59e0b;#0ea5e9;#42b883" dur="15s" repeatCount="indefinite"/>
    <animateMotion dur="15s" repeatCount="indefinite"
      path="M 70 195
            L 230 204
            L 300 204
            Q 380 100 395 120
            Q 200 50 50 175
            L 70 195
            L 230 204
            L 300 204
            Q 380 100 395 120
            Q 200 50 50 175
            L 70 195
            L 230 204
            L 300 204
            L 540 204"/>
  </circle>

  <!-- Trail particle -->
  <circle r="2.5" fill="#f59e0b" opacity="0.4">
    <animateMotion dur="15s" begin="-0.4s" repeatCount="indefinite"
      path="M 70 195
            L 230 204
            L 300 204
            Q 380 100 395 120
            Q 200 50 50 175
            L 70 195
            L 230 204
            L 300 204
            Q 380 100 395 120
            Q 200 50 50 175
            L 70 195
            L 230 204
            L 300 204
            L 540 204"/>
  </circle>

  <!-- ═══ ITERATION COUNTER ═══ -->
  <rect x="30" y="60" width="100" height="50" rx="8" fill="#0d0d1a" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <text x="80" y="80" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">ITERATION</text>
  <!-- Cycle through 1→2→3→✓ over 15s -->
  <text x="80" y="100" font-size="16" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-family="monospace">
    1
    <animate attributeName="fill" values="#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#42b883;#42b883;#42b883;#42b883;#42b883" dur="15s" repeatCount="indefinite"/>
  </text>
  <!-- Show iteration number cycling -->
  <g>
    <text x="80" y="100" font-size="16" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-family="monospace" opacity="0">
      1
      <animate attributeName="opacity" values="1;1;0;0;0;0;0;0;0;0;0;0;0;0;0" dur="15s" repeatCount="indefinite"/>
    </text>
    <text x="80" y="100" font-size="16" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-family="monospace" opacity="0">
      2
      <animate attributeName="opacity" values="0;0;0;1;1;1;1;1;0;0;0;0;0;0;0" dur="15s" repeatCount="indefinite"/>
    </text>
    <text x="80" y="100" font-size="16" text-anchor="middle" fill="#42b883" font-weight="bold" font-family="monospace" opacity="0">
      3 ✓
      <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;1" dur="15s" repeatCount="indefinite"/>
    </text>
  </g>

  <!-- Status text under iteration -->
  <text x="80" y="118" font-size="7" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">
    <animate attributeName="fill" values="#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#f59e0b;#42b883;#42b883;#42b883;#42b883;#42b883" dur="15s" repeatCount="indefinite"/>
    calling tools...
    <animate attributeName="opacity" values="0.3;0.3;0.3;0.3;0.3;0.3;0;1;1;1;1;1;1;1;1" dur="15s" repeatCount="indefinite"/>
  </text>
  <text x="80" y="118" font-size="7" text-anchor="middle" fill="#42b883" font-family="monospace" opacity="0">
    no tool_calls → done!
    <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;1;1;1;1;1" dur="15s" repeatCount="indefinite"/>
  </text>

  <!-- ═══ EXIT GATE (right side) ═══ -->
  <rect x="500" y="170" width="80" height="70" rx="8" fill="#1a3a2a" stroke="#42b883" stroke-width="2"/>
  <text x="540" y="200" font-size="10" text-anchor="middle" fill="#42b883" font-weight="bold">EXIT</text>
  <text x="540" y="215" font-size="7" text-anchor="middle" fill="rgba(66,184,131,0.5)">出货门</text>
  <rect x="500" y="170" width="80" height="70" rx="8" fill="none" stroke="#42b883" stroke-width="1" opacity="0">
    <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="stroke-width" values="1;4;1" dur="2s" repeatCount="indefinite"/>
  </rect>

  <!-- Label on fork B -->
  <text x="400" y="248" font-size="8" fill="#42b883" font-family="monospace">tool_calls == []</text>

  <!-- ═══ FINAL ANSWER display ═══ -->
  <rect x="440" y="290" width="150" height="60" rx="10" fill="#1a3a2a" stroke="#42b883" stroke-width="1.5" filter="url(#glow)"/>
  <text x="515" y="315" font-size="10" text-anchor="middle" fill="#42b883" font-weight="bold">✓ 最终答案</text>
  <text x="515" y="335" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Final Answer Output</text>

  <!-- Connection from exit gate to final answer -->
  <line x1="540" y1="242" x2="515" y2="288" stroke="#42b883" stroke-width="2" stroke-dasharray="6 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Burst particles -->
  <circle cx="515" cy="320" r="2" fill="#42b883" opacity="0">
    <animate attributeName="cx" values="515;490" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="320;300" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="515" cy="320" r="2" fill="#42b883" opacity="0">
    <animate attributeName="cx" values="515;540" dur="2s" begin="0.3s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="320;300" dur="2s" begin="0.3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="515" cy="320" r="2" fill="#42b883" opacity="0">
    <animate attributeName="cx" values="515;495" dur="2s" begin="0.6s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="320;340" dur="2s" begin="0.6s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.6s" repeatCount="indefinite"/>
  </circle>

  <!-- ═══ FLOW LABELS ═══ -->
  <text x="140" y="192" font-size="7" fill="rgba(255,255,255,0.15)" font-family="monospace">output →</text>
  <text x="470" y="195" font-size="7" fill="rgba(245,158,11,0.4)" font-family="monospace">→ RE-ENTER</text>

  <!-- ═══ BOTTOM STATUS BAR ═══ -->
  <rect x="30" y="380" width="540" height="110" rx="8" fill="#0d0d1a" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <text x="50" y="402" font-size="9" fill="rgba(255,255,255,0.2)" font-family="monospace">LOOP FLOW:</text>

  <!-- Iteration timeline -->
  <!-- Round 1 -->
  <rect x="50" y="412" width="150" height="30" rx="6" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1"/>
  <text x="60" y="428" font-size="7" fill="rgba(255,255,255,0.3)">轮次 1:</text>
  <text x="105" y="428" font-size="7" fill="#f59e0b">LLM → 调用工具 → 回到LLM</text>
  <text x="60" y="438" font-size="6" fill="rgba(255,255,255,0.15)">tool_calls: [search("天气")]</text>

  <!-- Arrow between rounds -->
  <line x1="202" y1="427" x2="220" y2="427" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="3 2">
    <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Round 2 -->
  <rect x="222" y="412" width="150" height="30" rx="6" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="1"/>
  <text x="232" y="428" font-size="7" fill="rgba(255,255,255,0.3)">轮次 2:</text>
  <text x="277" y="428" font-size="7" fill="#f59e0b">LLM → 调用工具 → 回到LLM</text>
  <text x="232" y="438" font-size="6" fill="rgba(255,255,255,0.15)">tool_calls: [calc("25+17")]</text>

  <!-- Arrow between rounds -->
  <line x1="374" y1="427" x2="392" y2="427" stroke="rgba(66,184,131,0.3)" stroke-width="1.5" stroke-dasharray="3 2">
    <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Round 3: EXIT -->
  <rect x="394" y="412" width="160" height="30" rx="6" fill="rgba(66,184,131,0.1)" stroke="#42b883" stroke-width="1.5"/>
  <text x="404" y="428" font-size="7" fill="rgba(255,255,255,0.3)">轮次 3:</text>
  <text x="449" y="428" font-size="7" fill="#42b883">LLM → 无工具调用 → 输出!</text>
  <text x="404" y="438" font-size="6" fill="rgba(255,255,255,0.15)">tool_calls: [] → BREAK</text>

  <!-- Summary text -->
  <text x="50" y="462" font-size="8" fill="rgba(255,255,255,0.2)" font-family="monospace">while tool_calls not empty → loop</text>
  <text x="50" y="476" font-size="8" fill="#42b883" font-family="monospace" opacity="0.5">when tool_calls == [] → break → reply to user</text>

  <!-- Side status labels -->
  <text x="540" y="270" font-size="8" text-anchor="end" fill="rgba(255,255,255,0.15)" font-family="monospace">GATE: CONDITIONAL</text>
  <text x="540" y="285" font-size="8" text-anchor="end" fill="rgba(255,255,255,0.15)" font-family="monospace">LOOP: UNTIL EMPTY</text>
</svg>`,
    },
  ],
} satisfies SlideContent
