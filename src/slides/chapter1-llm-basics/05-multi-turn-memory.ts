import type { SlideContent } from '@/types'

export default {
  title: '多轮对话与记忆',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# 大模型如何实现多轮对话？

## 消息格式

\`\`\`python
messages = [
    SystemMessage("你是一个有用的助手"),
    HumanMessage("你好，我叫李明"),
    AIMessage("你好李明！有什么可以帮你的？"),
    HumanMessage("请问我叫什么名字？"),
]
llm.invoke(messages)
\`\`\`
`,
    },
    {
      type: 'svg',
      content: `<svg viewBox="0 0 580 460" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;">
  <defs>
    <marker id="arrowW" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#ffffff"/>
    </marker>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- ===== ROUND 1 ===== -->
  <text x="10" y="22" fill="#42b883" font-size="13" font-weight="bold" letter-spacing="1">ROUND 1</text>

  <!-- Context stack: 1 message -->
  <rect x="10" y="32" width="190" height="38" rx="6" fill="#141428" stroke="#42b883" stroke-width="1.5"/>
  <text x="22" y="56" fill="#ffffff" font-size="12">👤 你好，我叫李明</text>

  <!-- Arrow -->
  <line x1="200" y1="51" x2="275" y2="51" stroke="#ffffff" stroke-width="1.5" marker-end="url(#arrowW)"/>

  <!-- LLM -->
  <rect x="280" y="28" width="70" height="46" rx="10" fill="#2a2a1e" stroke="#ffc107" stroke-width="2" filter="url(#glow)"/>
  <text x="315" y="56" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">LLM</text>

  <!-- Arrow -->
  <line x1="350" y1="51" x2="400" y2="51" stroke="#ffffff" stroke-width="1.5" marker-end="url(#arrowW)"/>

  <!-- Response -->
  <rect x="405" y="32" width="170" height="38" rx="6" fill="#1a2e1a" stroke="#42b883" stroke-width="1.5"/>
  <text x="417" y="56" fill="#ffffff" font-size="12">🤖 你好李明！</text>

  <!-- ===== DIVIDER ===== -->
  <line x1="10" y1="90" x2="570" y2="90" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- ===== ROUND 2 ===== -->
  <text x="10" y="112" fill="#42b883" font-size="13" font-weight="bold" letter-spacing="1">ROUND 2</text>

  <!-- Context stack: 3 messages (GROWING!) -->
  <rect x="10" y="122" width="190" height="106" rx="6" fill="#141428" stroke="#42b883" stroke-width="2"/>
  <text x="190" y="118" fill="#42b883" font-size="10" text-anchor="end">↑ 上下文增长！</text>

  <!-- Previous: user msg (faded) -->
  <rect x="18" y="130" width="174" height="26" rx="4" fill="rgba(255,255,255,0.04)"/>
  <text x="28" y="148" fill="rgba(255,255,255,0.35)" font-size="11">👤 你好，我叫李明</text>

  <!-- Previous: ai msg (faded) -->
  <rect x="18" y="160" width="174" height="26" rx="4" fill="rgba(255,255,255,0.04)"/>
  <text x="28" y="178" fill="rgba(255,255,255,0.35)" font-size="11">🤖 你好李明！</text>

  <!-- NEW: user msg (highlighted) -->
  <rect x="18" y="190" width="174" height="28" rx="4" fill="#1a3a2a" stroke="#42b883" stroke-width="1"/>
  <text x="28" y="209" fill="#ffffff" font-size="12" font-weight="bold">👤 我叫什么名字？</text>

  <!-- Arrow (ALL messages) -->
  <line x1="200" y1="175" x2="275" y2="175" stroke="#ffffff" stroke-width="2" marker-end="url(#arrowW)"/>
  <text x="238" y="168" fill="#42b883" font-size="9" text-anchor="middle">全部发送</text>

  <!-- LLM -->
  <rect x="280" y="152" width="70" height="46" rx="10" fill="#2a2a1e" stroke="#ffc107" stroke-width="2" filter="url(#glow)"/>
  <text x="315" y="180" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">LLM</text>

  <!-- Arrow -->
  <line x1="350" y1="175" x2="400" y2="175" stroke="#ffffff" stroke-width="1.5" marker-end="url(#arrowW)"/>

  <!-- Response -->
  <rect x="405" y="156" width="170" height="38" rx="6" fill="#1a2e1a" stroke="#42b883" stroke-width="1.5"/>
  <text x="417" y="180" fill="#ffffff" font-size="12">🤖 你叫李明！</text>

  <!-- ===== DIVIDER ===== -->
  <line x1="10" y1="245" x2="570" y2="245" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- ===== ROUND 3 ===== -->
  <text x="10" y="267" fill="#42b883" font-size="13" font-weight="bold" letter-spacing="1">ROUND 3</text>

  <!-- Context stack: 5 messages (EVEN BIGGER!) -->
  <rect x="10" y="277" width="190" height="150" rx="6" fill="#141428" stroke="#42b883" stroke-width="2"/>
  <text x="190" y="273" fill="#42b883" font-size="10" text-anchor="end">↑ 越来越长！</text>

  <!-- Previous messages (faded, compact) -->
  <rect x="18" y="285" width="174" height="24" rx="3" fill="rgba(255,255,255,0.04)"/>
  <text x="28" y="302" fill="rgba(255,255,255,0.3)" font-size="10">👤 你好，我叫李明</text>

  <rect x="18" y="311" width="174" height="24" rx="3" fill="rgba(255,255,255,0.04)"/>
  <text x="28" y="328" fill="rgba(255,255,255,0.3)" font-size="10">🤖 你好李明！</text>

  <rect x="18" y="337" width="174" height="24" rx="3" fill="rgba(255,255,255,0.04)"/>
  <text x="28" y="354" fill="rgba(255,255,255,0.3)" font-size="10">👤 我叫什么名字？</text>

  <rect x="18" y="363" width="174" height="24" rx="3" fill="rgba(255,255,255,0.04)"/>
  <text x="28" y="380" fill="rgba(255,255,255,0.3)" font-size="10">🤖 你叫李明！</text>

  <!-- NEW: user msg (highlighted) -->
  <rect x="18" y="391" width="174" height="28" rx="4" fill="#1a3a2a" stroke="#42b883" stroke-width="1"/>
  <text x="28" y="410" fill="#ffffff" font-size="12" font-weight="bold">👤 谢谢你！</text>

  <!-- Arrow (ALL messages) -->
  <line x1="200" y1="352" x2="275" y2="352" stroke="#ffffff" stroke-width="2" marker-end="url(#arrowW)"/>
  <text x="238" y="345" fill="#42b883" font-size="9" text-anchor="middle">全部发送</text>

  <!-- LLM -->
  <rect x="280" y="329" width="70" height="46" rx="10" fill="#2a2a1e" stroke="#ffc107" stroke-width="2" filter="url(#glow)"/>
  <text x="315" y="357" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">LLM</text>

  <!-- Arrow -->
  <line x1="350" y1="352" x2="400" y2="352" stroke="#ffffff" stroke-width="1.5" marker-end="url(#arrowW)"/>

  <!-- Response -->
  <rect x="405" y="333" width="170" height="38" rx="6" fill="#1a2e1a" stroke="#42b883" stroke-width="1.5"/>
  <text x="417" y="357" fill="#ffffff" font-size="12">🤖 不客气，李明！</text>

  <!-- ===== KEY INSIGHT — dramatic reveal ===== -->
  <rect x="10" y="432" width="560" height="24" rx="4" fill="rgba(66,184,131,0.1)" stroke="#42b883" stroke-width="1.5"/>
  <text x="290" y="449" fill="#42b883" font-size="13" text-anchor="middle" font-weight="bold">模型没有记忆 · 每次调用都从零开始 · 你必须把完整历史重新喂给它</text>
</svg>`,
    },
  ],
} satisfies SlideContent
