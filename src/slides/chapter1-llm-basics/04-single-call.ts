import type { SlideContent } from '@/types'

export default {
  title: '单次模型调用',
  layout: 'vertical',
  items: [
    {
      type: 'svg',
      content: `<svg viewBox="0 0 900 720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowW2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#ffffff"/>
    </marker>
    <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#42b883"/>
    </marker>
    <filter id="glow2">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="llmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#42b883;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.08"/>
    </linearGradient>
  </defs>

  <!-- ===== Title ===== -->
  <text x="450" y="32" text-anchor="middle" fill="#42b883" font-size="22" font-weight="bold" letter-spacing="1">单次模型调用发生了什么？</text>

  <!-- ===== STEP 1: Code ===== -->
  <text x="30" y="72" fill="rgba(255,255,255,0.3)" font-size="11" font-weight="bold" letter-spacing="2">STEP 1</text>
  <text x="90" y="72" fill="rgba(255,255,255,0.6)" font-size="11">你的代码</text>

  <!-- Code block -->
  <rect x="30" y="82" width="340" height="48" rx="8" fill="#1a1a2e" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="46" y="112" font-family="monospace" font-size="14" fill="#c084fc">llm</text>
  <text x="74" y="112" font-family="monospace" font-size="14" fill="#ffffff">.</text>
  <text x="82" y="112" font-family="monospace" font-size="14" fill="#42b883">invoke</text>
  <text x="130" y="112" font-family="monospace" font-size="14" fill="#ffffff">(</text>
  <text x="140" y="112" font-family="monospace" font-size="14" fill="#fbbf24">"你好，告诉我今天的日期"</text>
  <text x="354" y="112" font-family="monospace" font-size="14" fill="#ffffff">)</text>

  <!-- Arrow down -->
  <path d="M 200 130 L 200 155" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrowW2)"/>

  <!-- ===== STEP 2: API Request Construction ===== -->
  <text x="30" y="178" fill="rgba(255,255,255,0.3)" font-size="11" font-weight="bold" letter-spacing="2">STEP 2</text>
  <text x="90" y="178" fill="rgba(255,255,255,0.6)" font-size="11">SDK 构造 API 请求</text>

  <!-- API Request block -->
  <rect x="30" y="190" width="500" height="145" rx="8" fill="#141428" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>

  <!-- Left label -->
  <rect x="30" y="190" width="5" height="145" rx="2" fill="#3b82f6"/>

  <!-- Request header -->
  <text x="50" y="212" font-family="monospace" font-size="11" fill="rgba(255,255,255,0.35)">POST /v1/chat/completions</text>

  <!-- messages array -->
  <text x="50" y="236" font-family="monospace" font-size="12" fill="rgba(255,255,255,0.5)">messages: [</text>

  <!-- System message -->
  <rect x="64" y="245" width="450" height="24" rx="4" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" stroke-width="0.5"/>
  <text x="76" y="262" font-family="monospace" font-size="11.5" fill="#60a5fa">{ role: </text>
  <text x="133" y="262" font-family="monospace" font-size="11.5" fill="#42b883">"system"</text>
  <text x="197" y="262" font-family="monospace" font-size="11.5" fill="#60a5fa">, content: </text>
  <text x="285" y="262" font-family="monospace" font-size="11.5" fill="#fbbf24">"你是一个有用的助手"</text>
  <text x="498" y="262" font-family="monospace" font-size="11.5" fill="#60a5fa"> }</text>

  <!-- User message (highlighted) -->
  <rect x="64" y="273" width="450" height="24" rx="4" fill="rgba(66,184,131,0.1)" stroke="rgba(66,184,131,0.35)" stroke-width="1"/>
  <text x="76" y="290" font-family="monospace" font-size="11.5" fill="#60a5fa">{ role: </text>
  <text x="133" y="290" font-family="monospace" font-size="11.5" fill="#42b883">"user"</text>
  <text x="180" y="290" font-family="monospace" font-size="11.5" fill="#60a5fa">, content: </text>
  <text x="268" y="290" font-family="monospace" font-size="11.5" fill="#fbbf24">"你好，告诉我今天的日期"</text>
  <text x="498" y="290" font-family="monospace" font-size="11.5" fill="#60a5fa"> }</text>

  <text x="50" y="326" font-family="monospace" font-size="12" fill="rgba(255,255,255,0.5)">]</text>

  <!-- Animated scan line -->
  <rect x="30" y="190" width="500" height="145" rx="8" fill="none" stroke="#42b883" stroke-width="1.5" opacity="0">
    <animate attributeName="opacity" values="0;0.6;0" dur="3s" repeatCount="indefinite"/>
  </rect>

  <!-- Arrow down to LLM -->
  <path d="M 280 335 L 280 365" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrowW2)"/>
  <text x="300" y="356" fill="rgba(255,255,255,0.3)" font-size="10">HTTPS</text>

  <!-- ===== STEP 3: LLM Processing ===== -->
  <text x="560" y="178" fill="rgba(255,255,255,0.3)" font-size="11" font-weight="bold" letter-spacing="2">STEP 3</text>
  <text x="620" y="178" fill="rgba(255,255,255,0.6)" font-size="11">模型逐词预测</text>

  <!-- LLM box -->
  <rect x="560" y="190" width="310" height="145" rx="10" fill="url(#llmGrad)" stroke="rgba(66,184,131,0.25)" stroke-width="1.5" filter="url(#glow2)"/>

  <!-- LLM label -->
  <text x="715" y="218" text-anchor="middle" fill="#42b883" font-size="20" font-weight="bold" filter="url(#glow2)">LLM</text>

  <!-- Pulsing ring -->
  <circle cx="715" cy="213" r="22" fill="none" stroke="#42b883" stroke-width="1" opacity="0">
    <animate attributeName="r" values="22;40;22" dur="2.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
  </circle>

  <!-- Token prediction visualization -->
  <text x="580" y="252" fill="rgba(255,255,255,0.4)" font-size="10">输入:</text>
  <text x="615" y="252" fill="rgba(255,255,255,0.7)" font-size="11" font-family="monospace">你好，告诉我今天的日期</text>

  <text x="580" y="274" fill="rgba(255,255,255,0.4)" font-size="10">逐词预测:</text>

  <!-- Token blocks appearing one by one -->
  <rect x="580" y="282" width="48" height="22" rx="4" fill="rgba(66,184,131,0.15)" stroke="rgba(66,184,131,0.4)" stroke-width="1">
    <animate attributeName="opacity" values="0;0;1" dur="2s" repeatCount="indefinite"/>
  </rect>
  <text x="590" y="298" font-size="12" fill="#42b883" font-weight="bold">
    抱歉
    <animate attributeName="opacity" values="0;0;1" dur="2s" repeatCount="indefinite"/>
  </text>

  <rect x="634" y="282" width="48" height="22" rx="4" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.4)" stroke-width="1">
    <animate attributeName="opacity" values="0;0;0;1" dur="3s" repeatCount="indefinite"/>
  </rect>
  <text x="643" y="298" font-size="12" fill="#60a5fa" font-weight="bold">
    ，我
    <animate attributeName="opacity" values="0;0;0;1" dur="3s" repeatCount="indefinite"/>
  </text>

  <rect x="688" y="282" width="48" height="22" rx="4" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.4)" stroke-width="1">
    <animate attributeName="opacity" values="0;0;0;0;1" dur="4s" repeatCount="indefinite"/>
  </rect>
  <text x="697" y="298" font-size="12" fill="#a78bfa" font-weight="bold">
    无法
    <animate attributeName="opacity" values="0;0;0;0;1" dur="4s" repeatCount="indefinite"/>
  </text>

  <rect x="742" y="282" width="48" height="22" rx="4" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.4)" stroke-width="1">
    <animate attributeName="opacity" values="0;0;0;0;0;1" dur="5s" repeatCount="indefinite"/>
  </rect>
  <text x="751" y="298" font-size="12" fill="#fbbf24" font-weight="bold">
    获取
    <animate attributeName="opacity" values="0;0;0;0;0;1" dur="5s" repeatCount="indefinite"/>
  </text>

  <text x="800" y="298" fill="rgba(255,255,255,0.3)" font-size="13">...</text>

  <!-- Probability bars -->
  <text x="580" y="328" fill="rgba(255,255,255,0.25)" font-size="9">每个位置选择概率最高的词 → 自回归生成</text>

  <!-- Arrow down from LLM -->
  <path d="M 715 335 L 715 365" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrowW2)"/>

  <!-- ===== STEP 4: What model actually sees ===== -->
  <text x="30" y="390" fill="rgba(255,255,255,0.3)" font-size="11" font-weight="bold" letter-spacing="2">真实面貌</text>
  <text x="110" y="390" fill="rgba(255,255,255,0.6)" font-size="11">模型眼中只有一段文本</text>

  <rect x="30" y="400" width="840" height="100" rx="8" fill="#141428" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <rect x="30" y="400" width="5" height="100" rx="2" fill="#f59e0b"/>

  <text x="50" y="424" font-family="monospace" font-size="12" fill="#f59e0b">&lt;|im_start|&gt;system</text>
  <text x="235" y="424" font-family="monospace" font-size="12" fill="rgba(255,255,255,0.3)">你是一个有用的助手</text>
  <text x="430" y="424" font-family="monospace" font-size="12" fill="#f59e0b">&lt;|im_end|&gt;</text>

  <text x="50" y="448" font-family="monospace" font-size="12" fill="#42b883">&lt;|im_start|&gt;user</text>
  <text x="218" y="448" font-family="monospace" font-size="12" fill="#ffffff" font-weight="bold">你好，告诉我今天的日期</text>
  <text x="430" y="448" font-family="monospace" font-size="12" fill="#42b883">&lt;|im_end|&gt;</text>

  <text x="50" y="472" font-family="monospace" font-size="12" fill="#60a5fa">&lt;|im_start|&gt;assistant</text>
  <text x="268" y="472" font-family="monospace" font-size="11" fill="rgba(255,255,255,0.2)">← 模型从这里开始续写</text>

  <!-- Blinking cursor -->
  <rect x="250" y="462" width="8" height="14" rx="1" fill="#42b883" opacity="0">
    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/>
  </rect>

  <!-- Animated highlight flowing across the text -->
  <rect x="30" y="400" width="0" height="100" rx="8" fill="rgba(66,184,131,0.05)">
    <animate attributeName="width" values="0;840;840;0" dur="5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite"/>
  </rect>

  <!-- ===== STEP 5: Response ===== -->
  <path d="M 450 500 L 450 530" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrowW2)"/>

  <text x="30" y="555" fill="rgba(255,255,255,0.3)" font-size="11" font-weight="bold" letter-spacing="2">STEP 4</text>
  <text x="90" y="555" fill="rgba(255,255,255,0.6)" font-size="11">返回结果</text>

  <!-- Response block -->
  <rect x="30" y="565" width="840" height="52" rx="8" fill="#1a2e1a" stroke="rgba(66,184,131,0.3)" stroke-width="1.5"/>
  <rect x="30" y="565" width="5" height="52" rx="2" fill="#42b883"/>

  <text x="50" y="586" font-size="11" fill="rgba(255,255,255,0.4)">response.choices[0].message.content:</text>
  <text x="50" y="606" font-size="14" fill="#ffffff" font-weight="bold">"抱歉，我无法获取实时信息，因此不知道今天的具体日期。"</text>

  <!-- ===== KEY INSIGHTS ===== -->
  <rect x="30" y="640" width="840" height="70" rx="8" fill="rgba(66,184,131,0.05)" stroke="rgba(66,184,131,0.15)" stroke-width="1"/>

  <!-- Insight icons and text -->
  <circle cx="60" cy="660" r="10" fill="rgba(66,184,131,0.15)" stroke="#42b883" stroke-width="1"/>
  <text x="60" y="664" text-anchor="middle" fill="#42b883" font-size="11" font-weight="bold">1</text>
  <text x="78" y="665" fill="rgba(255,255,255,0.75)" font-size="12">模型只看到 <tspan fill="#f59e0b" font-family="monospace">纯文本</tspan>，不理解"代码"和"自然语言"的区别</text>

  <circle cx="60" cy="690" r="10" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1"/>
  <text x="60" y="694" text-anchor="middle" fill="#3b82f6" font-size="11" font-weight="bold">2</text>
  <text x="78" y="695" fill="rgba(255,255,255,0.75)" font-size="12">本质是 <tspan fill="#42b883" font-weight="bold">自回归文本补全</tspan> — 基于上文预测下一个最可能的词</text>

  <circle cx="520" cy="660" r="10" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" stroke-width="1"/>
  <text x="520" y="664" text-anchor="middle" fill="#8b5cf6" font-size="11" font-weight="bold">3</text>
  <text x="538" y="665" fill="rgba(255,255,255,0.75)" font-size="12">模型 <tspan fill="#ef4444" font-weight="bold">无法获取实时信息</tspan>，回答基于训练数据</text>

  <circle cx="520" cy="690" r="10" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1"/>
  <text x="520" y="694" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="bold">4</text>
  <text x="538" y="695" fill="rgba(255,255,255,0.75)" font-size="12">每次调用 <tspan fill="#42b883" font-weight="bold">无状态</tspan>，不记得之前的任何对话</text>
</svg>`,
    },
  ],
} satisfies SlideContent
