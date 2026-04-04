import type { SlideContent } from '@/types'

export default {
  title: '传统 RAG：切分 + 向量化',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# 传统 RAG 管道

把"图书馆"搬进大模型，只需五步：

1. **文档切分** — 大文档拆成小块 (Chunk)
2. **Embedding** — 每个块转为高维向量
3. **向量存储** — 存入向量数据库
4. **检索匹配** — 问题向量化，找最近邻
5. **增强生成** — 检索结果 + 问题 → LLM

\`\`\`python
# 传统 RAG 核心流程
chunks = split(document)
vectors = [embed(chunk) for chunk in chunks]
store(vectors)  # 存入向量数据库

query_vec = embed(user_question)
results = similarity_search(query_vec, top_k=5)
answer = llm.generate(question, context=results)
\`\`\`

> **局限**：纯语义匹配，精确关键词匹配弱，缺乏结构化推理能力。
`,
    },
    {
      type: 'svg',
      content: `<svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="chunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="embedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="storeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#42b883"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <linearGradient id="retrieveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="genGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <linearGradient id="flowLine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#42b883" stop-opacity="0.1"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrDown" markerWidth="6" markerHeight="8" refX="3" refY="7" orient="auto">
      <polygon points="0 0,6 0,3 8" fill="rgba(255,255,255,0.4)"/>
    </marker>
  </defs>

  <!-- HUD corners -->
  <path d="M 10 10 L 10 35 M 10 10 L 35 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 590 10 L 590 35 M 590 10 L 565 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 10 510 L 10 485 M 10 510 L 35 510" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 590 510 L 590 485 M 590 510 L 565 510" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="32" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">TRADITIONAL RAG PIPELINE // 传统检索增强生成管道</text>

  <!-- ===== STEP 1: 文档切分 ===== -->
  <rect x="60" y="52" width="480" height="72" rx="10" fill="#1a1a30" stroke="#8b5cf6" stroke-width="1.5"/>
  <circle cx="76" cy="66" r="4" fill="#8b5cf6">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="88" y="70" font-size="9" fill="rgba(255,255,255,0.25)" font-family="monospace">01</text>

  <!-- Big document -->
  <rect x="85" y="78" width="40" height="36" rx="4" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1"/>
  <line x1="92" y1="86" x2="118" y2="86" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <line x1="92" y1="92" x2="115" y2="92" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <line x1="92" y1="98" x2="110" y2="98" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <line x1="92" y1="104" x2="117" y2="104" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>

  <!-- Cut line animation -->
  <line x1="128" y1="96" x2="165" y2="96" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.5">
    <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1s" repeatCount="indefinite"/>
  </line>

  <!-- Small chunks -->
  <rect x="170" y="78" width="28" height="20" rx="3" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1" opacity="0.8"/>
  <rect x="202" y="78" width="28" height="20" rx="3" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1" opacity="0.8"/>
  <rect x="234" y="78" width="28" height="20" rx="3" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1" opacity="0.8"/>
  <rect x="170" y="102" width="28" height="20" rx="3" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1" opacity="0.6"/>
  <rect x="202" y="102" width="28" height="20" rx="3" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1" opacity="0.6"/>
  <rect x="234" y="102" width="28" height="20" rx="3" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1" opacity="0.6"/>

  <text x="310" y="92" font-size="11" fill="#8b5cf6" font-weight="600">文档切分</text>
  <text x="310" y="106" font-size="9" fill="rgba(255,255,255,0.3)">Chunking</text>

  <!-- Flow arrow 1→2 -->
  <line x1="300" y1="126" x2="300" y2="148" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" marker-end="url(#arrDown)"/>

  <!-- ===== STEP 2: Embedding ===== -->
  <rect x="60" y="148" width="480" height="72" rx="10" fill="#0d1a2a" stroke="#0ea5e9" stroke-width="1.5"/>
  <circle cx="76" cy="162" r="4" fill="#0ea5e9">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
  </circle>
  <text x="88" y="166" font-size="9" fill="rgba(255,255,255,0.25)" font-family="monospace">02</text>

  <!-- Chunk → vector arrows -->
  <rect x="85" y="168" width="22" height="16" rx="3" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1"/>
  <line x1="110" y1="176" x2="140" y2="176" stroke="#0ea5e9" stroke-width="1.5" marker-end="url(#arrDown)" opacity="0.6" transform="rotate(0,125,176)">
    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
  </line>

  <!-- Vector representation -->
  <text x="148" y="180" font-size="9" fill="#0ea5e9" font-family="monospace">[0.23, -0.45, 0.78, ...]</text>

  <!-- Embedding model icon -->
  <rect x="310" y="162" width="100" height="40" rx="8" fill="#1a2a3a" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="360" y="180" font-size="10" text-anchor="middle" fill="#0ea5e9" font-weight="600">Embedding</text>
  <text x="360" y="194" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">向量化模型</text>

  <text x="450" y="180" font-size="11" fill="#0ea5e9" font-weight="600">向量化</text>
  <text x="450" y="194" font-size="9" fill="rgba(255,255,255,0.3)">Embedding</text>

  <!-- Flow arrow 2→3 -->
  <line x1="300" y1="222" x2="300" y2="244" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" marker-end="url(#arrDown)"/>

  <!-- ===== STEP 3: 向量存储 ===== -->
  <rect x="60" y="244" width="480" height="72" rx="10" fill="#0d1f17" stroke="#42b883" stroke-width="1.5"/>
  <circle cx="76" cy="258" r="4" fill="#42b883">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <text x="88" y="262" font-size="9" fill="rgba(255,255,255,0.25)" font-family="monospace">03</text>

  <!-- Vector DB grid (honeycomb style) -->
  <g transform="translate(100, 260)">
    <!-- Row 1 -->
    <circle cx="0" cy="0" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.6"/>
    <circle cx="20" cy="0" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.6"/>
    <circle cx="40" cy="0" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.6"/>
    <circle cx="60" cy="0" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.6"/>
    <circle cx="80" cy="0" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.6"/>
    <!-- Row 2 -->
    <circle cx="10" cy="18" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.4"/>
    <circle cx="30" cy="18" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.4"/>
    <circle cx="50" cy="18" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.4"/>
    <circle cx="70" cy="18" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.4"/>
    <!-- Row 3 -->
    <circle cx="0" cy="36" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.3"/>
    <circle cx="20" cy="36" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.3"/>
    <circle cx="40" cy="36" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.3"/>
    <circle cx="60" cy="36" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.3"/>
    <circle cx="80" cy="36" r="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1" opacity="0.3"/>

    <!-- Pulsing highlight on specific cells -->
    <circle cx="40" cy="0" r="8" fill="#42b883" opacity="0.3">
      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="50" cy="18" r="8" fill="#42b883" opacity="0.3">
      <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2s" begin="0.5s" repeatCount="indefinite"/>
    </circle>
  </g>

  <text x="310" y="276" font-size="11" fill="#42b883" font-weight="600">向量存储</text>
  <text x="310" y="290" font-size="9" fill="rgba(255,255,255,0.3)">Vector Store (Milvus / Pinecone)</text>

  <!-- Flow arrow 3→4 -->
  <line x1="300" y1="318" x2="300" y2="340" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" marker-end="url(#arrDown)"/>

  <!-- ===== STEP 4: 检索匹配 ===== -->
  <rect x="60" y="340" width="480" height="72" rx="10" fill="#1a1a20" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="76" cy="354" r="4" fill="#f59e0b">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1.5s" repeatCount="indefinite"/>
  </circle>
  <text x="88" y="358" font-size="9" fill="rgba(255,255,255,0.25)" font-family="monospace">04</text>

  <!-- Query vector -->
  <text x="90" y="380" font-size="9" fill="#f59e0b" font-family="monospace">Q: [0.21, -0.43, 0.76, ...]</text>

  <!-- Similarity search visualization -->
  <g transform="translate(260, 360)">
    <!-- Space dots -->
    <circle cx="0" cy="5" r="4" fill="#2a3a2a" opacity="0.5"/>
    <circle cx="20" cy="15" r="4" fill="#2a3a2a" opacity="0.5"/>
    <circle cx="45" cy="8" r="4" fill="#42b883" opacity="0.7">
      <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="60" cy="20" r="4" fill="#2a3a2a" opacity="0.5"/>
    <circle cx="80" cy="5" r="4" fill="#42b883" opacity="0.7">
      <animate attributeName="r" values="4;6;4" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="95" cy="18" r="4" fill="#2a3a2a" opacity="0.5"/>

    <!-- Search radius -->
    <circle cx="45" cy="8" r="20" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3 3" opacity="0.4">
      <animate attributeName="r" values="15;25;15" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.5s" repeatCount="indefinite"/>
    </circle>
  </g>

  <text x="430" y="375" font-size="11" fill="#f59e0b" font-weight="600">检索匹配</text>
  <text x="430" y="389" font-size="9" fill="rgba(255,255,255,0.3)">Similarity Search</text>

  <!-- Flow arrow 4→5 -->
  <line x1="300" y1="414" x2="300" y2="436" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" marker-end="url(#arrDown)"/>

  <!-- ===== STEP 5: 增强生成 ===== -->
  <rect x="60" y="436" width="480" height="62" rx="10" fill="#1a1a30" stroke="#ef4444" stroke-width="1.5"/>
  <circle cx="76" cy="450" r="4" fill="#ef4444">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="2s" repeatCount="indefinite"/>
  </circle>
  <text x="88" y="454" font-size="9" fill="rgba(255,255,255,0.25)" font-family="monospace">05</text>

  <!-- Context + Question → LLM -->
  <rect x="90" y="450" width="70" height="24" rx="6" fill="#2a3a2a" stroke="#42b883" stroke-width="1"/>
  <text x="125" y="466" font-size="9" text-anchor="middle" fill="#42b883">检索结果</text>

  <text x="172" y="466" font-size="12" fill="rgba(255,255,255,0.3)">+</text>

  <rect x="185" y="450" width="60" height="24" rx="6" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1"/>
  <text x="215" y="466" font-size="9" text-anchor="middle" fill="#8b5cf6">问题</text>

  <!-- Arrow -->
  <line x1="252" y1="462" x2="290" y2="462" stroke="#ef4444" stroke-width="1.5" opacity="0.5">
    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite"/>
  </line>

  <!-- LLM box -->
  <rect x="295" y="448" width="50" height="28" rx="8" fill="url(#chunkGrad)" opacity="0.8"/>
  <text x="320" y="466" font-size="8" text-anchor="middle" fill="white" font-weight="bold">LLM</text>

  <!-- Output arrow -->
  <line x1="348" y1="462" x2="380" y2="462" stroke="#42b883" stroke-width="1.5" opacity="0.5"/>

  <!-- Answer -->
  <rect x="385" y="448" width="60" height="28" rx="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5"/>
  <text x="415" y="466" font-size="9" text-anchor="middle" fill="#42b883" font-weight="600">回答 ✓</text>

  <text x="480" y="466" font-size="11" fill="#ef4444" font-weight="600">增强生成</text>

  <!-- ===== Data flow particle ===== -->
  <circle r="3" fill="#8b5cf6" opacity="0.8" filter="url(#glow)">
    <animate attributeName="fill" values="#8b5cf6;#0ea5e9;#42b883;#f59e0b;#ef4444" dur="5s" repeatCount="indefinite"/>
    <animateMotion dur="5s" repeatCount="indefinite"
      path="M 300 88 L 300 184 L 300 280 L 300 376 L 300 467"/>
  </circle>

  <circle r="2" fill="#42b883" opacity="0.4">
    <animateMotion dur="5s" begin="-0.5s" repeatCount="indefinite"
      path="M 300 88 L 300 184 L 300 280 L 300 376 L 300 467"/>
  </circle>

  <!-- Sparkle effects -->
  <circle cx="200" cy="95" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" begin="0s" repeatCount="indefinite"/>
  </circle>
  <circle cx="350" cy="185" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <circle cx="150" cy="280" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" begin="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="320" cy="375" r="1.5" fill="white" opacity="0">
    <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" begin="3s" repeatCount="indefinite"/>
  </circle>
</svg>`,
    },
  ],
} satisfies SlideContent
