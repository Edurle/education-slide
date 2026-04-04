import type { SlideContent } from '@/types'

export default {
  title: '为什么需要 RAG',
  layout: 'vertical',
  items: [
    {
      type: 'markdown',
      content: `# 为什么需要 RAG？

> LLM 再聪明，也不知道你公司昨天发生了什么。`,
    },
    {
      type: 'svg',
      content: `<svg viewBox="0 0 960 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="dataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#42b883"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrG" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#42b883"/>
    </marker>
    <marker id="arrCyan" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#0ea5e9"/>
    </marker>
  </defs>

  <!-- ===== LEFT: LLM — 封闭的大脑 ===== -->
  <rect x="20" y="30" width="280" height="300" rx="16" fill="#1a1a30" stroke="#3a3a5c" stroke-width="1.5"/>

  <text x="160" y="66" font-size="18" font-weight="bold" fill="#8b5cf6" text-anchor="middle" font-family="system-ui, sans-serif">大模型 LLM</text>
  <text x="160" y="86" font-size="12" fill="rgba(255,255,255,0.3)" text-anchor="middle">「知识冻结在训练时刻」</text>

  <!-- Brain icon -->
  <circle cx="160" cy="160" r="38" fill="url(#brainGrad)" opacity="0.8"/>
  <text x="160" y="156" font-size="14" text-anchor="middle" fill="white" font-weight="bold">大脑</text>
  <text x="160" y="172" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.7)">Brain</text>

  <!-- Knowledge boundary - flashing -->
  <circle cx="160" cy="160" r="52" fill="none" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.15;0.5;0.15" dur="3s" repeatCount="indefinite"/>
  </circle>

  <!-- Training data cutoff -->
  <rect x="60" y="220" width="200" height="28" rx="6" fill="#2a1a3a" stroke="#8b5cf6" stroke-width="1" opacity="0.6"/>
  <text x="160" y="239" font-size="11" text-anchor="middle" fill="rgba(255,255,255,0.5)">训练数据截止 2024</text>

  <!-- Limitations -->
  <text x="160" y="278" font-size="12" fill="rgba(255,255,255,0.25)" text-anchor="middle">不知道最新信息</text>
  <text x="160" y="298" font-size="12" fill="rgba(255,255,255,0.25)" text-anchor="middle">不掌握私有数据</text>
  <text x="160" y="318" font-size="12" fill="rgba(255,255,255,0.25)" text-anchor="middle">容易产生幻觉</text>

  <!-- ===== CENTER: The Gap ===== -->
  <!-- Gap visualization -->
  <rect x="340" y="60" width="60" height="250" rx="8" fill="#0d0d1a" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

  <!-- Lightning bolt gap indicator -->
  <text x="370" y="180" font-size="28" font-weight="bold" fill="#f59e0b" text-anchor="middle" opacity="0.6">⚡</text>
  <text x="370" y="210" font-size="11" fill="rgba(255,255,255,0.3)" text-anchor="middle">知识</text>
  <text x="370" y="226" font-size="11" fill="rgba(255,255,255,0.3)" text-anchor="middle">鸿沟</text>

  <!-- ===== RIGHT: Data World ===== -->
  <rect x="440" y="30" width="280" height="300" rx="16" fill="#0d1a2a" stroke="#0ea5e9" stroke-width="1.5">
    <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
  </rect>

  <text x="580" y="66" font-size="18" font-weight="bold" fill="#0ea5e9" text-anchor="middle" font-family="system-ui, sans-serif">外部世界</text>
  <text x="580" y="86" font-size="12" fill="rgba(255,255,255,0.3)" text-anchor="middle">「海量、实时、持续增长」</text>

  <!-- Data sources - small icons -->
  <!-- Documents -->
  <rect x="465" y="110" width="70" height="42" rx="8" fill="#1a2a3a" stroke="#0ea5e9" stroke-width="1" opacity="0.7"/>
  <text x="500" y="130" font-size="10" text-anchor="middle" fill="#0ea5e9">📄 文档</text>
  <text x="500" y="144" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Documents</text>

  <!-- Web pages -->
  <rect x="545" y="110" width="70" height="42" rx="8" fill="#1a2a3a" stroke="#0ea5e9" stroke-width="1" opacity="0.7"/>
  <text x="580" y="130" font-size="10" text-anchor="middle" fill="#0ea5e9">🌐 网页</text>
  <text x="580" y="144" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Web Pages</text>

  <!-- Database -->
  <rect x="625" y="110" width="70" height="42" rx="8" fill="#1a2a3a" stroke="#0ea5e9" stroke-width="1" opacity="0.7"/>
  <text x="660" y="130" font-size="10" text-anchor="middle" fill="#0ea5e9">🗄️ 数据库</text>
  <text x="660" y="144" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Database</text>

  <!-- APIs -->
  <rect x="465" y="165" width="70" height="42" rx="8" fill="#1a2a3a" stroke="#0ea5e9" stroke-width="1" opacity="0.7"/>
  <text x="500" y="185" font-size="10" text-anchor="middle" fill="#0ea5e9">🔗 API</text>
  <text x="500" y="199" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Services</text>

  <!-- Knowledge Graph -->
  <rect x="545" y="165" width="70" height="42" rx="8" fill="#1a2a3a" stroke="#0ea5e9" stroke-width="1" opacity="0.7"/>
  <text x="580" y="185" font-size="10" text-anchor="middle" fill="#0ea5e9">🕸️ 知识图谱</text>
  <text x="580" y="199" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">KG</text>

  <!-- Growing indicator -->
  <rect x="625" y="165" width="70" height="42" rx="8" fill="#1a2a3a" stroke="#0ea5e9" stroke-width="1" opacity="0.7"/>
  <text x="660" y="185" font-size="10" text-anchor="middle" fill="#0ea5e9">📊 报表</text>
  <text x="660" y="199" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Reports</text>

  <!-- Growing data particles -->
  <circle cx="490" cy="235" r="2" fill="#0ea5e9" opacity="0">
    <animate attributeName="opacity" values="0;0.6;0" dur="2s" begin="0s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="235;225" dur="2s" begin="0s" repeatCount="indefinite"/>
  </circle>
  <circle cx="560" cy="240" r="2" fill="#0ea5e9" opacity="0">
    <animate attributeName="opacity" values="0;0.6;0" dur="2.5s" begin="0.8s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="240;228" dur="2.5s" begin="0.8s" repeatCount="indefinite"/>
  </circle>
  <circle cx="650" cy="238" r="2" fill="#0ea5e9" opacity="0">
    <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin="1.5s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="238;224" dur="3s" begin="1.5s" repeatCount="indefinite"/>
  </circle>

  <!-- Data volume indicator -->
  <text x="580" y="275" font-size="12" fill="rgba(255,255,255,0.25)" text-anchor="middle">数据量持续指数级增长 ↗</text>
  <text x="580" y="295" font-size="12" fill="rgba(255,255,255,0.25)" text-anchor="middle">LLM 无法实时训练</text>

  <!-- ===== BOTTOM: RAG Bridge ===== -->
  <rect x="80" y="370" width="660" height="110" rx="14" fill="#0d1f17" stroke="#42b883" stroke-width="2">
    <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
  </rect>

  <text x="410" y="400" font-size="18" font-weight="bold" fill="#42b883" text-anchor="middle" font-family="system-ui, sans-serif">RAG — 检索增强生成</text>
  <text x="410" y="418" font-size="11" fill="rgba(255,255,255,0.3)" text-anchor="middle">Retrieval-Augmented Generation</text>

  <!-- Bridge flow: LLM → RAG pipeline -->
  <!-- Step 1: Retrieve -->
  <rect x="130" y="432" width="100" height="34" rx="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5"/>
  <text x="180" y="454" font-size="12" text-anchor="middle" fill="#42b883" font-weight="600">检索</text>

  <line x1="232" y1="449" x2="270" y2="449" stroke="#42b883" stroke-width="2" marker-end="url(#arrG)" opacity="0.7">
    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite"/>
  </line>

  <!-- Step 2: Augment -->
  <rect x="275" y="432" width="100" height="34" rx="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5"/>
  <text x="325" y="454" font-size="12" text-anchor="middle" fill="#42b883" font-weight="600">增强</text>

  <line x1="377" y1="449" x2="415" y2="449" stroke="#42b883" stroke-width="2" marker-end="url(#arrG)" opacity="0.7">
    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
  </line>

  <!-- Step 3: Generate -->
  <rect x="420" y="432" width="100" height="34" rx="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5"/>
  <text x="470" y="454" font-size="12" text-anchor="middle" fill="#42b883" font-weight="600">生成</text>

  <line x1="522" y1="449" x2="560" y2="449" stroke="#42b883" stroke-width="2" marker-end="url(#arrG)" opacity="0.7">
    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" begin="1s" repeatCount="indefinite"/>
  </line>

  <!-- Output -->
  <rect x="565" y="432" width="100" height="34" rx="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5"/>
  <text x="615" y="454" font-size="12" text-anchor="middle" fill="#42b883" font-weight="600">回答 ✓</text>

  <!-- Connecting lines from top sections to bridge -->
  <!-- LLM → bridge -->
  <line x1="160" y1="330" x2="180" y2="430" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite"/>
  </line>

  <!-- Data world → bridge -->
  <line x1="580" y1="330" x2="470" y2="430" stroke="#0ea5e9" stroke-width="1" stroke-dasharray="4 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite"/>
  </line>

  <!-- Flow particle along bridge -->
  <circle r="3" fill="#42b883" opacity="0.8" filter="url(#glow)">
    <animateMotion dur="4s" repeatCount="indefinite"
      path="M 180 449 L 325 449 L 470 449 L 615 449"/>
  </circle>
  <circle r="2" fill="#42b883" opacity="0.4">
    <animateMotion dur="4s" begin="-1s" repeatCount="indefinite"
      path="M 180 449 L 325 449 L 470 449 L 615 449"/>
  </circle>

  <!-- HUD corners -->
  <path d="M 10 10 L 10 35 M 10 10 L 35 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 950 10 L 950 35 M 950 10 L 925 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 10 490 L 10 465 M 10 490 L 35 490" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 950 490 L 950 465 M 950 490 L 925 490" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <!-- Status label -->
  <text x="780" y="400" font-size="9" fill="rgba(255,255,255,0.15)" font-family="monospace">RAG BRIDGE ACTIVE</text>
  <circle cx="770" cy="397" r="3" fill="#42b883" opacity="0.6">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
  </circle>
</svg>`,
    },
    {
      type: 'markdown',
      content: `> **核心洞察**：RAG 的思路很简单——既然 LLM 不可能"知道一切"，那就在回答之前先**检索**相关的外部知识，把检索到的内容**增强**到提示词中，再让 LLM **生成**回答。不是让大脑记住一切，而是给大脑配一个随时可查的"图书馆"。`,
    },
  ],
} satisfies SlideContent
