import type { SlideContent } from '@/types'

export default {
  title: '大模型的本质',
  items: [
    {
      type: 'markdown',
      content: `# 大模型的本质是什么？

大模型本质是 **自回归文本补全**：
基于已有上文，逐词预测并生成下一个最可能的字，循环往复直至完成。
`,
    },
    {
      type: 'svg',
      content: `
<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- 输入文本 -->
  <text x="50" y="50" font-family="monospace" font-size="16" fill="#374151">输入：</text>
  <text x="100" y="50" font-family="monospace" font-size="16" fill="#1f2937" font-weight="bold">"今天天气"</text>

  <!-- 箭头和过程 -->
  <rect x="50" y="70" width="500" height="78" rx="8" fill="#f3f4f6" stroke="#e5e7eb" stroke-width="2"/>

  <!-- 文本片段 -->
  <text x="70" y="105" font-family="monospace" font-size="14" fill="#6b7280">今</text>
  <text x="95" y="105" font-family="monospace" font-size="14" fill="#6b7280">天</text>
  <text x="120" y="105" font-family="monospace" font-size="14" fill="#6b7280">天</text>
  <text x="145" y="105" font-family="monospace" font-size="14" fill="#6b7280">气</text>

  <!-- 箭头 -->
  <path d="M 170 100 L 200 100" stroke="url(#textGrad)" stroke-width="2" marker-end="url(#arrowhead)"/>

  <!-- 预测下一个词 -->
  <rect x="210" y="85" width="60" height="30" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1"/>
  <text x="220" y="105" font-family="monospace" font-size="14" fill="#3b82f6">真</text>

  <text x="280" y="105" font-family="monospace" font-size="12" fill="#9ca3af">/</text>

  <rect x="295" y="85" width="60" height="30" rx="4" fill="#f3e8ff" stroke="#8b5cf6" stroke-width="1"/>
  <text x="305" y="105" font-family="monospace" font-size="14" fill="#8b5cf6">很</text>

  <text x="365" y="105" font-family="monospace" font-size="12" fill="#9ca3af">/</text>

  <rect x="380" y="85" width="60" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
  <text x="390" y="105" font-family="monospace" font-size="14" fill="#f59e0b">不</text>

  <text x="460" y="105" font-family="monospace" font-size="14" fill="#9ca3af">...</text>

  <!-- 输出 -->
  <text x="50" y="180" font-family="monospace" font-size="16" fill="#374151">输出：</text>
  <text x="100" y="180" font-family="monospace" font-size="16" fill="#059669" font-weight="bold">"今天天气真好"</text>

  <!-- 概率标注 -->
  <text x="220" y="135" font-family="sans-serif" font-size="10" fill="#3b82f6">P=0.35</text>
  <text x="305" y="135" font-family="sans-serif" font-size="10" fill="#8b5cf6">P=0.28</text>
  <text x="390" y="135" font-family="sans-serif" font-size="10" fill="#f59e0b">P=0.15</text>
</svg>
`,
    },
    {
      type: 'markdown',
      content: `### 基于大模型本质回答问题
`,
    },
    {
      type: 'table',
      headers: ['问题', '原因'],
      rows: [
        ['编造事实', '**概率性生成** — 选择"最可能"的词，而非"正确"的词'],
        ['无法精确计算', '**效率与准确性** — 逐词预测无法保证数学精确'],
        ['无法回答时间', '**时效性** — 模型训练完成后无法获取新信息'],
      ],
    },
  ],
} satisfies SlideContent
