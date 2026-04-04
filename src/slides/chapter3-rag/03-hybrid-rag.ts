import type { SlideContent } from '@/types'

export default {
  title: '混合 RAG：多路召回',
  layout: 'split-right',
  items: [
    {
      type: 'markdown',
      content: `# 混合 RAG：三条路，更可靠

单一检索方式各有盲区。混合 RAG 用三路并行召回 + 重排序，取长补短：

| 检索方式 | 擅长 | 弱点 |
|---------|------|------|
| **向量检索** | 语义相似、模糊匹配 | 精确关键词 |
| **BM25** | 关键词精确匹配 | 语义理解弱 |
| **知识图谱** | 结构化关系推理 | 覆盖面有限 |

三路结果汇入 **Reranker**（重排序），统一打分去重后送入 LLM。

\`\`\`python
# 混合检索核心逻辑
vec_results = vector_search(query, top_k=10)
bm25_results = bm25_search(query, top_k=10)
kg_results = knowledge_graph_query(query)

# 重排序融合
final = rerank(vec_results + bm25_results + kg_results, top_k=5)
answer = llm.generate(query, context=final)
\`\`\`

> **核心洞察**：混合 RAG 的本质是"不把鸡蛋放在一个篮子里"——每种检索方式捕捉不同维度的相关性，Reranker 负责统一裁决。
`,
    },
    {
      type: 'svg',
      content: `<svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="vectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="bm25Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="kgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="rerankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#42b883"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <linearGradient id="llmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <marker id="arrCyan" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#0ea5e9"/>
    </marker>
    <marker id="arrAmber" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#f59e0b"/>
    </marker>
    <marker id="arrPurple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#8b5cf6"/>
    </marker>
    <marker id="arrGreen" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0,8 3,0 6" fill="#42b883"/>
    </marker>
  </defs>

  <!-- HUD corners -->
  <path d="M 10 10 L 10 35 M 10 10 L 35 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 590 10 L 590 35 M 590 10 L 565 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 10 510 L 10 485 M 10 510 L 35 510" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 590 510 L 590 485 M 590 510 L 565 510" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="300" y="32" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">HYBRID RAG // 混合检索增强生成</text>

  <!-- Query input at top -->
  <rect x="180" y="48" width="240" height="34" rx="8" fill="#1a1a30" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <text x="300" y="70" font-size="11" text-anchor="middle" fill="rgba(255,255,255,0.5)">用户问题 → Query</text>

  <!-- Fan-out lines from query -->
  <line x1="220" y1="82" x2="100" y2="118" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="300" y1="82" x2="300" y2="118" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="380" y1="82" x2="500" y2="118" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>

  <!-- ===== PATH 1: 向量检索 (Top) ===== -->
  <rect x="30" y="118" width="160" height="120" rx="10" fill="#0d1a2a" stroke="#0ea5e9" stroke-width="1.5"/>
  <circle cx="46" cy="132" r="3" fill="#0ea5e9">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="58" y="136" font-size="9" fill="rgba(255,255,255,0.25)" font-family="monospace">01</text>

  <text x="110" y="152" font-size="12" text-anchor="middle" fill="#0ea5e9" font-weight="600">向量检索</text>
  <text x="110" y="166" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Vector Search</text>

  <!-- Mini vector space -->
  <g transform="translate(60, 175)">
    <circle cx="5" cy="5" r="3" fill="#0ea5e9" opacity="0.4"/>
    <circle cx="20" cy="15" r="3" fill="#0ea5e9" opacity="0.4"/>
    <circle cx="35" cy="8" r="3" fill="#0ea5e9" opacity="0.4"/>
    <circle cx="50" cy="20" r="3" fill="#0ea5e9" opacity="0.4"/>
    <circle cx="65" cy="5" r="3" fill="#0ea5e9" opacity="0.4"/>
    <circle cx="80" cy="18" r="3" fill="#0ea5e9" opacity="0.4"/>
    <circle cx="95" cy="10" r="3" fill="#0ea5e9" opacity="0.4"/>

    <!-- Highlight nearest -->
    <circle cx="35" cy="8" r="6" fill="none" stroke="#0ea5e9" stroke-width="1.5" opacity="0.6">
      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="65" cy="5" r="6" fill="none" stroke="#0ea5e9" stroke-width="1.5" opacity="0.6">
      <animate attributeName="r" values="4;8;4" dur="2s" begin="0.5s" repeatCount="indefinite"/>
    </circle>
  </g>

  <text x="110" y="228" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.2)">语义相似度匹配</text>

  <!-- ===== PATH 2: BM25 检索 (Middle) ===== -->
  <rect x="210" y="118" width="160" height="120" rx="10" fill="#1a1a20" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="226" cy="132" r="3" fill="#f59e0b">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
  </circle>
  <text x="238" y="136" font-size="9" fill="rgba(255,255,255,0.25)" font-family="monospace">02</text>

  <text x="290" y="152" font-size="12" text-anchor="middle" fill="#f59e0b" font-weight="600">BM25 检索</text>
  <text x="290" y="166" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Keyword Matching</text>

  <!-- Keyword highlight visualization -->
  <g transform="translate(230, 178)">
    <text y="10" font-size="8" fill="rgba(255,255,255,0.2)">"人工智能在</text>
    <text x="60" y="10" font-size="8" fill="#f59e0b" font-weight="bold">医疗</text>
    <text x="80" y="10" font-size="8" fill="rgba(255,255,255,0.2)">领域的</text>
    <text y="25" font-size="8" fill="rgba(255,255,255,0.2)">应用与</text>
    <text x="35" y="25" font-size="8" fill="#f59e0b" font-weight="bold">诊断</text>
    <text x="55" y="25" font-size="8" fill="rgba(255,255,255,0.2)">突破</text>

    <!-- Highlight underline -->
    <rect x="60" y="12" width="20" height="2" rx="1" fill="#f59e0b" opacity="0.5">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite"/>
    </rect>
    <rect x="35" y="27" width="20" height="2" rx="1" fill="#f59e0b" opacity="0.5">
      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
    </rect>
  </g>

  <text x="290" y="228" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.2)">精确关键词匹配</text>

  <!-- ===== PATH 3: 知识图谱 (Bottom path) ===== -->
  <rect x="390" y="118" width="160" height="120" rx="10" fill="#1a1a30" stroke="#8b5cf6" stroke-width="1.5"/>
  <circle cx="406" cy="132" r="3" fill="#8b5cf6">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <text x="418" y="136" font-size="9" fill="rgba(255,255,255,0.25)" font-family="monospace">03</text>

  <text x="470" y="152" font-size="12" text-anchor="middle" fill="#8b5cf6" font-weight="600">知识图谱</text>
  <text x="470" y="166" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Knowledge Graph</text>

  <!-- Mini KG visualization -->
  <g transform="translate(430, 180)">
    <!-- Nodes -->
    <circle cx="0" cy="0" r="8" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="0" y="3" font-size="6" text-anchor="middle" fill="#8b5cf6">AI</text>

    <circle cx="40" cy="-5" r="8" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="40" y="-2" font-size="5" text-anchor="middle" fill="#8b5cf6">医疗</text>

    <circle cx="75" cy="10" r="8" fill="#2a2a4a" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="75" y="13" font-size="5" text-anchor="middle" fill="#8b5cf6">诊断</text>

    <!-- Edges -->
    <line x1="8" y1="-2" x2="32" y2="-4" stroke="#8b5cf6" stroke-width="1" opacity="0.5"/>
    <line x1="48" y1="-2" x2="67" y2="6" stroke="#8b5cf6" stroke-width="1" opacity="0.5"/>

    <!-- Edge labels -->
    <text x="20" y="-8" font-size="5" fill="rgba(255,255,255,0.2)" text-anchor="middle">应用于</text>
    <text x="57" y="-1" font-size="5" fill="rgba(255,255,255,0.2)" text-anchor="middle">赋能</text>

    <!-- Pulse on active path -->
    <circle cx="20" cy="-3" r="2" fill="#8b5cf6" opacity="0">
      <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="57" cy="2" r="2" fill="#8b5cf6" opacity="0">
      <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="1s" repeatCount="indefinite"/>
    </circle>
  </g>

  <text x="470" y="228" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.2)">结构化关系推理</text>

  <!-- ===== Converging arrows to Reranker ===== -->
  <line x1="110" y1="240" x2="230" y2="295" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4">
    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite"/>
  </line>
  <line x1="290" y1="240" x2="290" y2="295" stroke="#f59e0b" stroke-width="1.5" opacity="0.4">
    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="0.5s" repeatCount="indefinite"/>
  </line>
  <line x1="470" y1="240" x2="350" y2="295" stroke="#8b5cf6" stroke-width="1.5" opacity="0.4">
    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="1s" repeatCount="indefinite"/>
  </line>

  <!-- Particles flowing to Reranker -->
  <circle r="3" fill="#0ea5e9" opacity="0.7" filter="url(#glow)">
    <animateMotion dur="2s" repeatCount="indefinite"
      path="M 110 240 L 230 305"/>
  </circle>
  <circle r="3" fill="#f59e0b" opacity="0.7" filter="url(#glow)">
    <animateMotion dur="2s" begin="0.7s" repeatCount="indefinite"
      path="M 290 240 L 290 305"/>
  </circle>
  <circle r="3" fill="#8b5cf6" opacity="0.7" filter="url(#glow)">
    <animateMotion dur="2s" begin="1.4s" repeatCount="indefinite"
      path="M 470 240 L 350 305"/>
  </circle>

  <!-- ===== RERANKER ===== -->
  <rect x="180" y="290" width="220" height="60" rx="12" fill="#0d1f17" stroke="#42b883" stroke-width="2">
    <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite"/>
  </rect>
  <text x="290" y="318" font-size="14" text-anchor="middle" fill="#42b883" font-weight="bold">Reranker</text>
  <text x="290" y="336" font-size="9" text-anchor="middle" fill="rgba(255,255,255,0.3)">重排序 · 统一打分 · 去重</text>

  <!-- Arrow from Reranker to LLM -->
  <line x1="290" y1="352" x2="290" y2="388" stroke="#42b883" stroke-width="1.5" opacity="0.5">
    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite"/>
  </line>

  <!-- Top-K results indicator -->
  <text x="310" y="374" font-size="8" fill="rgba(255,255,255,0.2)" font-family="monospace">Top-K</text>

  <!-- ===== LLM Generation ===== -->
  <rect x="210" y="390" width="160" height="50" rx="10" fill="#1a1a30" stroke="#ef4444" stroke-width="1.5"/>
  <circle cx="226" cy="404" r="3" fill="#ef4444">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <text x="290" y="416" font-size="12" text-anchor="middle" fill="white" font-weight="600">LLM 生成</text>
  <text x="290" y="430" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">融合上下文生成回答</text>

  <!-- Output -->
  <line x1="370" y1="415" x2="410" y2="415" stroke="#42b883" stroke-width="1.5" marker-end="url(#arrGreen)" opacity="0.5"/>
  <rect x="415" y="400" width="80" height="30" rx="8" fill="#1a3e2a" stroke="#42b883" stroke-width="1.5"/>
  <text x="455" y="419" font-size="11" text-anchor="middle" fill="#42b883" font-weight="600">回答 ✓</text>

  <!-- ===== Status bar ===== -->
  <rect x="20" y="460" width="560" height="40" rx="6" fill="#0d0d1a" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <text x="40" y="484" font-size="8" fill="rgba(255,255,255,0.15)" font-family="monospace">RECALL PATHS: 3</text>
  <text x="180" y="484" font-size="8" fill="rgba(255,255,255,0.15)" font-family="monospace">MERGE: RERANK</text>
  <text x="340" y="484" font-size="8" fill="rgba(255,255,255,0.15)" font-family="monospace">STATUS: ACTIVE</text>
  <circle cx="430" cy="480" r="3" fill="#42b883" opacity="0.6">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
  </circle>
</svg>`,
    },
  ],
} satisfies SlideContent
