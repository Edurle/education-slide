import type { SlideContent } from '@/types'

export default {
  title: '智能体如何感知世界',
  layout: 'vertical',
  items: [
    {
      type: 'svg',
      content: `<svg viewBox="0 0 960 520" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pipeH" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.03"/>
    </linearGradient>
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
  </defs>

  <!-- HUD corners -->
  <path d="M 15 15 L 15 40 M 15 15 L 40 15" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 945 15 L 945 40 M 945 15 L 920 15" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 15 505 L 15 480 M 15 505 L 40 505" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <path d="M 945 505 L 945 480 M 945 505 L 920 505" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <!-- Title -->
  <text x="480" y="42" font-size="14" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-family="monospace">PERCEPTION PIPELINE // 感知管道</text>

  <!-- TOP: Problem Area -->
  <rect x="40" y="60" width="880" height="90" rx="10" fill="#1a1a30" stroke="#ef4444" stroke-width="1" stroke-dasharray="6 3" opacity="0.7"/>
  <circle cx="60" cy="80" r="6" fill="#ef4444" opacity="0.6">
    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="78" y="85" font-size="11" fill="#ef4444" font-weight="600">PROBLEM</text>
  <text x="60" y="110" font-size="13" fill="rgba(255,255,255,0.5)">世界 ≠ 纯文本</text>

  <!-- Modality icons -->
  <g transform="translate(220, 90)">
    <rect x="0" y="0" width="36" height="28" rx="4" fill="#2a2a4a" stroke="#ef4444" stroke-width="1" opacity="0.5"/>
    <circle cx="10" cy="10" r="3" fill="#ef4444" opacity="0.3"/>
    <rect x="4" y="16" width="28" height="8" rx="2" fill="rgba(239,68,68,0.15)"/>
    <text x="18" y="45" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.25)">图像</text>
  </g>
  <g transform="translate(310, 90)">
    <rect x="0" y="0" width="36" height="28" rx="4" fill="#2a2a4a" stroke="#ef4444" stroke-width="1" opacity="0.5"/>
    <line x1="8" y1="14" x2="8" y2="8" stroke="#ef4444" stroke-width="2" opacity="0.4"/>
    <line x1="14" y1="14" x2="14" y2="4" stroke="#ef4444" stroke-width="2" opacity="0.4"/>
    <line x1="20" y1="14" x2="20" y2="6" stroke="#ef4444" stroke-width="2" opacity="0.4"/>
    <line x1="26" y1="14" x2="26" y2="10" stroke="#ef4444" stroke-width="2" opacity="0.4"/>
    <text x="18" y="45" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.25)">音频</text>
  </g>
  <g transform="translate(400, 90)">
    <rect x="0" y="0" width="36" height="28" rx="4" fill="#2a2a4a" stroke="#ef4444" stroke-width="1" opacity="0.5"/>
    <polygon points="15,8 15,20 27,14" fill="#ef4444" opacity="0.3"/>
    <text x="18" y="45" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.25)">视频</text>
  </g>
  <g transform="translate(490, 90)">
    <rect x="0" y="0" width="36" height="28" rx="4" fill="#2a2a4a" stroke="#ef4444" stroke-width="1" opacity="0.5"/>
    <circle cx="18" cy="14" r="6" fill="none" stroke="#ef4444" stroke-width="1" opacity="0.4"/>
    <circle cx="18" cy="14" r="2" fill="#ef4444" opacity="0.4"/>
    <text x="18" y="45" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.25)">传感器</text>
  </g>

  <!-- Arrow down -->
  <line x1="480" y1="155" x2="480" y2="175" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="3 3"/>

  <!-- LEFT: Solution 1 — Native Multimodal -->
  <rect x="40" y="185" width="420" height="290" rx="12" fill="#111128" stroke="#0ea5e9" stroke-width="1.5"/>
  <rect x="40" y="185" width="420" height="35" rx="12" fill="rgba(14, 165, 233, 0.08)"/>
  <rect x="40" y="205" width="420" height="15" fill="rgba(14, 165, 233, 0.08)"/>
  <circle cx="58" cy="202" r="4" fill="#0ea5e9" opacity="0.6">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="72" y="207" font-size="11" fill="#0ea5e9" font-weight="600">SOLUTION 01 — 原生多模态模型</text>

  <!-- Multimodal model box -->
  <rect x="80" y="240" width="160" height="80" rx="10" fill="#1a1a3a" stroke="#0ea5e9" stroke-width="1.5"/>
  <g transform="translate(160, 265)">
    <circle r="18" fill="url(#cyanGrad)" opacity="0.7"/>
    <text font-size="8" text-anchor="middle" fill="white" y="-2">GPT-4V</text>
    <text font-size="7" text-anchor="middle" fill="rgba(255,255,255,0.6)" y="8">Claude Vision</text>
  </g>
  <text x="160" y="305" font-size="9" text-anchor="middle" fill="rgba(255,255,255,0.35)">多模态模型</text>

  <!-- Input pipes -->
  <line x1="62" y1="260" x2="78" y2="260" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3" opacity="0.4">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
  </line>
  <line x1="62" y1="275" x2="78" y2="275" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" opacity="0.4">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1.2s" repeatCount="indefinite"/>
  </line>
  <line x1="62" y1="290" x2="78" y2="290" stroke="#42b883" stroke-width="2" stroke-dasharray="4 3" opacity="0.4">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="0.8s" repeatCount="indefinite"/>
  </line>
  <text x="58" y="264" font-size="8" fill="#ef4444" text-anchor="end">IMG</text>
  <text x="58" y="279" font-size="8" fill="#f59e0b" text-anchor="end">AUD</text>
  <text x="58" y="293" font-size="8" fill="#42b883" text-anchor="end">TXT</text>

  <!-- Output pipe -->
  <line x1="242" y1="280" x2="310" y2="280" stroke="#0ea5e9" stroke-width="3" stroke-dasharray="8 4" opacity="0.5">
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite"/>
  </line>
  <rect x="312" y="258" width="120" height="44" rx="8" fill="#0d2a3d" stroke="#0ea5e9" stroke-width="1"/>
  <text x="372" y="278" font-size="9" text-anchor="middle" fill="#0ea5e9">理解 + 生成</text>
  <text x="372" y="292" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">Unified Output</text>

  <!-- Flow particles -->
  <circle r="2.5" fill="#ef4444" opacity="0.7" filter="url(#glowSmall)">
    <animateMotion dur="1.5s" repeatCount="indefinite" path="M 62 260 L 78 260 L 160 265 L 242 280 L 312 280"/>
  </circle>
  <circle r="2.5" fill="#f59e0b" opacity="0.7" filter="url(#glowSmall)">
    <animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M 62 275 L 78 275 L 160 275 L 242 280 L 312 280"/>
  </circle>

  <text x="250" y="345" font-size="11" text-anchor="middle" fill="rgba(255,255,255,0.3)">模型本身就能看、能听</text>
  <text x="250" y="365" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">CAPABILITY: BUILT-IN</text>

  <!-- Mini flow diagram -->
  <rect x="100" y="385" width="60" height="24" rx="4" fill="#2a2a4a" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="130" y="401" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.35)">图像/音频</text>
  <line x1="162" y1="397" x2="185" y2="397" stroke="rgba(14,165,233,0.4)" stroke-width="1.5" stroke-dasharray="4 3">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
  </line>
  <rect x="188" y="385" width="80" height="24" rx="4" fill="rgba(14,165,233,0.15)" stroke="#0ea5e9" stroke-width="1"/>
  <text x="228" y="401" font-size="8" text-anchor="middle" fill="#0ea5e9">多模态模型</text>
  <line x1="270" y1="397" x2="293" y2="397" stroke="rgba(14,165,233,0.4)" stroke-width="1.5" stroke-dasharray="4 3">
    <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite"/>
  </line>
  <rect x="296" y="385" width="60" height="24" rx="4" fill="#1a3a2a" stroke="#42b883" stroke-width="1"/>
  <text x="326" y="401" font-size="8" text-anchor="middle" fill="#42b883">理解生成</text>

  <!-- Divider -->
  <line x1="480" y1="200" x2="480" y2="460" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

  <!-- RIGHT: Solution 2 — Agent-side conversion -->
  <rect x="500" y="185" width="420" height="290" rx="12" fill="#111128" stroke="#f59e0b" stroke-width="1.5"/>
  <rect x="500" y="185" width="420" height="35" rx="12" fill="rgba(245, 158, 11, 0.06)"/>
  <rect x="500" y="205" width="420" height="15" fill="rgba(245, 158, 11, 0.06)"/>
  <circle cx="518" cy="202" r="4" fill="#f59e0b" opacity="0.6">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
  </circle>
  <text x="532" y="207" font-size="11" fill="#f59e0b" font-weight="600">SOLUTION 02 — 智能体端转换</text>

  <!-- Station 1: OCR -->
  <rect x="530" y="240" width="110" height="70" rx="8" fill="#1a1a3a" stroke="#f59e0b" stroke-width="1"/>
  <circle cx="545" cy="255" r="3" fill="#f59e0b" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
  </circle>
  <text x="555" y="258" font-size="9" fill="#f59e0b">OCR</text>
  <rect x="542" y="268" width="86" height="30" rx="4" fill="#0d0d1a"/>
  <text x="585" y="280" font-size="7" text-anchor="middle" fill="rgba(255,255,255,0.2)">AaBbCc</text>
  <line x1="544" y1="268" x2="626" y2="268" stroke="#f59e0b" stroke-width="1" opacity="0.6">
    <animate attributeName="y1" values="268;295;268" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="y2" values="268;295;268" dur="2s" repeatCount="indefinite"/>
  </line>
  <text x="585" y="303" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">图片→文字提取</text>

  <!-- Station 2: Tool calling -->
  <rect x="530" y="320" width="110" height="70" rx="8" fill="#1a1a3a" stroke="#42b883" stroke-width="1"/>
  <circle cx="545" cy="335" r="3" fill="#42b883" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
  </circle>
  <text x="555" y="338" font-size="9" fill="#42b883">工具调用</text>
  <g transform="translate(585, 358)">
    <circle r="8" fill="url(#greenGrad)" opacity="0.6"/>
    <text font-size="8" text-anchor="middle" fill="white" y="3">🔧</text>
  </g>
  <text x="585" y="383" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">图像分析工具</text>

  <!-- Station 3: Description -->
  <rect x="530" y="400" width="110" height="70" rx="8" fill="#1a1a3a" stroke="#8b5cf6" stroke-width="1"/>
  <circle cx="545" cy="415" r="3" fill="#8b5cf6" opacity="0.5">
    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="1s" repeatCount="indefinite"/>
  </circle>
  <text x="555" y="418" font-size="9" fill="#8b5cf6">描述生成</text>
  <g transform="translate(585, 440)">
    <circle r="8" fill="url(#purpleGrad)" opacity="0.6"/>
    <text font-size="7" text-anchor="middle" fill="white" y="3">AI</text>
  </g>
  <text x="585" y="463" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">视觉模型→文本描述</text>

  <!-- Output pipes from stations -->
  <line x1="642" y1="275" x2="700" y2="320" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite"/>
  </line>
  <line x1="642" y1="355" x2="700" y2="340" stroke="#42b883" stroke-width="2" stroke-dasharray="6 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.2s" repeatCount="indefinite"/>
  </line>
  <line x1="642" y1="435" x2="700" y2="360" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="6 4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.8s" repeatCount="indefinite"/>
  </line>

  <!-- Text output box -->
  <rect x="700" y="310" width="100" height="60" rx="10" fill="#0d2a3d" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="750" y="335" font-size="10" text-anchor="middle" fill="#0ea5e9" font-weight="bold">文本</text>
  <text x="750" y="350" font-size="8" text-anchor="middle" fill="rgba(255,255,255,0.3)">统一输出</text>
  <text x="750" y="360" font-size="7" text-anchor="middle" fill="rgba(255,255,255,0.2)">→ 送入 LLM</text>

  <!-- Conversion particles -->
  <circle r="2" fill="#f59e0b" opacity="0.6" filter="url(#glowSmall)">
    <animateMotion dur="2s" repeatCount="indefinite" path="M 642 275 L 700 320"/>
  </circle>
  <circle r="2" fill="#42b883" opacity="0.6" filter="url(#glowSmall)">
    <animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M 642 355 L 700 340"/>
  </circle>
  <circle r="2" fill="#8b5cf6" opacity="0.6" filter="url(#glowSmall)">
    <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M 642 435 L 700 360"/>
  </circle>

  <text x="710" y="410" font-size="11" text-anchor="middle" fill="rgba(255,255,255,0.3)">把非文本转换为文本</text>
  <text x="710" y="430" font-size="10" text-anchor="middle" fill="rgba(255,255,255,0.2)" font-family="monospace">CAPABILITY: AGENT-SIDE</text>

  <!-- Bottom status bar -->
  <rect x="40" y="485" width="880" height="20" rx="4" fill="rgba(255,255,255,0.02)"/>
  <text x="60" y="499" font-size="8" fill="rgba(255,255,255,0.12)" font-family="monospace">PERCEPTION.MODULE // DUAL-PATH INPUT SYSTEM</text>
  <text x="900" y="499" font-size="8" fill="rgba(255,255,255,0.12)" font-family="monospace" text-anchor="end">v2.0</text>
</svg>`,
    },
    {
      type: 'markdown',
      content: `> **核心洞察**：智能体感知世界有两条路径 — 要么使用**原生多模态模型**直接处理图像/音频（内置能力），要么通过**智能体端转换**把非文本信息转为文本再送入 LLM（外挂能力）。两种方案可以组合使用。`,
    },
  ],
} satisfies SlideContent
