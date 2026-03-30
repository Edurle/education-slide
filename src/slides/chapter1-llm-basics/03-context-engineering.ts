import type { SlideContent } from '@/types'

export default {
  title: '上下文工程',
  items: [
    {
      type: 'svg',
      content: `<svg viewBox="0 0 1200 960" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#42b883;stop-opacity:0.6" />
      <stop offset="40%" style="stop-color:#42b883;stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:#42b883;stop-opacity:0" />
    </radialGradient>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Title (fixed, outside translate group) -->
  <text x="600" y="38" text-anchor="middle" fill="#42b883" font-size="28" font-weight="bold" letter-spacing="2">上下文工程</text>
  <text x="600" y="62" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="13" letter-spacing="1">大模型生成内容所依赖的所有信息</text>

  <!-- Diagram group: shifted down 30px for breathing room -->
  <g transform="translate(0,30)">

  <!-- ===== Floating Particles ===== -->
  <circle cx="100" cy="150" r="3" fill="rgba(66,184,131,0.5)" filter="url(#softGlow)">
    <animate attributeName="cx" values="100;140;80;125;100" dur="18s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="150;120;180;135;150" dur="14s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0.9;0.2;0.8;0.3" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="1100" cy="160" r="2.5" fill="rgba(139,92,246,0.5)" filter="url(#softGlow)">
    <animate attributeName="cx" values="1100;1070;1120;1085;1100" dur="16s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="160;190;140;175;160" dur="13s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.25;0.85;0.2;0.75;0.25" dur="5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="80" cy="500" r="3" fill="rgba(59,130,246,0.5)" filter="url(#softGlow)">
    <animate attributeName="cx" values="80;110;65;100;80" dur="17s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="500;470;530;485;500" dur="14s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0.85;0.2;0.8;0.3" dur="4.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="1120" cy="490" r="2.5" fill="rgba(66,184,131,0.45)" filter="url(#softGlow)">
    <animate attributeName="cx" values="1120;1090;1140;1105;1120" dur="20s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="490;520;465;505;490" dur="16s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.25;0.8;0.2;0.7;0.25" dur="5.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="300" cy="170" r="2.5" fill="rgba(139,92,246,0.45)" filter="url(#softGlow)">
    <animate attributeName="cx" values="300;330;285;320;300" dur="15s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="170;145;195;155;170" dur="12s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.2;0.8;0.15;0.7;0.2" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="900" cy="170" r="2.8" fill="rgba(66,184,131,0.45)" filter="url(#softGlow)">
    <animate attributeName="cx" values="900;930;885;920;900" dur="17s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="170;140;200;155;170" dur="13s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.25;0.8;0.15;0.75;0.25" dur="4.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="950" cy="650" r="2.8" fill="rgba(59,130,246,0.45)" filter="url(#softGlow)">
    <animate attributeName="cx" values="950;980;935;970;950" dur="18s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="650;625;675;635;650" dur="15s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.2;0.8;0.15;0.7;0.2" dur="5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="250" cy="640" r="2.5" fill="rgba(66,184,131,0.4)" filter="url(#softGlow)">
    <animate attributeName="cx" values="250;280;235;270;250" dur="15s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="640;615;665;625;640" dur="12s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.2;0.75;0.15;0.65;0.2" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="500" cy="250" r="2" fill="rgba(59,130,246,0.4)" filter="url(#softGlow)">
    <animate attributeName="cx" values="500;530;485;520;500" dur="13s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="250;230;270;240;250" dur="10s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.15;0.7;0.1;0.6;0.15" dur="3.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="700" cy="630" r="2.2" fill="rgba(139,92,246,0.4)" filter="url(#softGlow)">
    <animate attributeName="cx" values="700;725;680;715;700" dur="14s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="630;610;650;620;630" dur="11s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.15;0.7;0.1;0.6;0.15" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="180" cy="350" r="1.5" fill="rgba(255,255,255,0.3)">
    <animate attributeName="opacity" values="0.1;0.6;0.1" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="1020" cy="300" r="1.5" fill="rgba(255,255,255,0.25)">
    <animate attributeName="opacity" values="0.08;0.55;0.08" dur="3.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="600" cy="780" r="1.5" fill="rgba(255,255,255,0.25)">
    <animate attributeName="opacity" values="0.08;0.55;0.08" dur="2.8s" repeatCount="indefinite"/>
  </circle>

  <!-- ===== Outer ring (r=280) ===== -->
  <circle cx="600" cy="440" r="280" fill="none" stroke="rgba(139,92,246,0.03)" stroke-width="50"/>
  <circle cx="600" cy="440" r="280" fill="none" stroke="rgba(139,92,246,0.06)" stroke-width="0.5"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" from="0 600 440" to="360 600 440" dur="120s" repeatCount="indefinite"/>
    <circle cx="600" cy="440" r="280" fill="none" stroke="rgba(139,92,246,0.12)" stroke-width="1.2" stroke-dasharray="12 6"/>
  </g>

  <!-- ===== Inner ring (r=160) ===== -->
  <circle cx="600" cy="440" r="160" fill="none" stroke="rgba(59,130,246,0.04)" stroke-width="35"/>
  <circle cx="600" cy="440" r="160" fill="none" stroke="rgba(59,130,246,0.08)" stroke-width="0.5"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" from="360 600 440" to="0 600 440" dur="80s" repeatCount="indefinite"/>
    <circle cx="600" cy="440" r="160" fill="none" stroke="rgba(59,130,246,0.18)" stroke-width="1.2" stroke-dasharray="8 5"/>
  </g>

  <!-- ===== Core (pulsing) ===== -->
  <circle cx="600" cy="440" r="65" fill="url(#coreGlow)" opacity="0.5">
    <animate attributeName="r" values="60;72;60" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.35;0.6;0.35" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="600" cy="440" r="52" fill="rgba(66,184,131,0.06)" stroke="#42b883" stroke-width="2"/>
  <text x="600" y="434" text-anchor="middle" fill="#42b883" font-size="22" font-weight="bold" filter="url(#softGlow)">LLM</text>
  <text x="600" y="456" text-anchor="middle" fill="rgba(66,184,131,0.5)" font-size="10" letter-spacing="1">大模型</text>

  <!-- ===== Data Flow Streams ===== -->
  <!-- 狭义 streams (blue) — from inner ring cards to core -->
  <line x1="600" y1="356" x2="600" y2="388" stroke="rgba(59,130,246,0.15)" stroke-width="1"/>
  <line x1="600" y1="524" x2="600" y2="492" stroke="rgba(59,130,246,0.15)" stroke-width="1"/>
  <!-- 广义 streams (purple) — from outer ring to core -->
  <line x1="600" y1="160" x2="600" y2="375" stroke="rgba(139,92,246,0.15)" stroke-width="1"/>
  <line x1="880" y1="440" x2="665" y2="440" stroke="rgba(139,92,246,0.15)" stroke-width="1"/>
  <line x1="798" y1="638" x2="646" y2="486" stroke="rgba(139,92,246,0.15)" stroke-width="1"/>
  <line x1="600" y1="720" x2="600" y2="505" stroke="rgba(139,92,246,0.15)" stroke-width="1"/>
  <line x1="320" y1="440" x2="535" y2="440" stroke="rgba(139,92,246,0.15)" stroke-width="1"/>
  <line x1="402" y1="242" x2="554" y2="394" stroke="rgba(139,92,246,0.15)" stroke-width="1"/>

  <!-- ===== Animated Flow Particles ===== -->
  <!-- Prompt → core (short inner stream) -->
  <circle r="2.5" fill="rgba(59,130,246,0.7)" filter="url(#softGlow)">
    <animateMotion dur="1.8s" repeatCount="indefinite" path="M600,356 L600,395" begin="0s"/>
    <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.8s" repeatCount="indefinite" begin="0s"/>
  </circle>
  <circle r="2" fill="rgba(59,130,246,0.5)" filter="url(#softGlow)">
    <animateMotion dur="1.8s" repeatCount="indefinite" path="M600,356 L600,395" begin="0.9s"/>
    <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.8s" repeatCount="indefinite" begin="0.9s"/>
  </circle>
  <!-- 会话窗口 → core (short inner stream) -->
  <circle r="2.5" fill="rgba(59,130,246,0.7)" filter="url(#softGlow)">
    <animateMotion dur="1.8s" repeatCount="indefinite" path="M600,524 L600,485" begin="0.3s"/>
    <animate attributeName="opacity" values="0;0.8;0.8;0" dur="1.8s" repeatCount="indefinite" begin="0.3s"/>
  </circle>
  <circle r="2" fill="rgba(59,130,246,0.5)" filter="url(#softGlow)">
    <animateMotion dur="1.8s" repeatCount="indefinite" path="M600,524 L600,485" begin="1.2s"/>
    <animate attributeName="opacity" values="0;0.6;0.6;0" dur="1.8s" repeatCount="indefinite" begin="1.2s"/>
  </circle>
  <!-- 工具调用 → core -->
  <circle r="2.5" fill="rgba(139,92,246,0.7)" filter="url(#softGlow)">
    <animateMotion dur="2.8s" repeatCount="indefinite" path="M600,160 L600,375" begin="0s"/>
    <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.8s" repeatCount="indefinite" begin="0s"/>
  </circle>
  <circle r="2" fill="rgba(139,92,246,0.5)" filter="url(#softGlow)">
    <animateMotion dur="2.8s" repeatCount="indefinite" path="M600,160 L600,375" begin="1.4s"/>
    <animate attributeName="opacity" values="0;0.6;0.6;0" dur="2.8s" repeatCount="indefinite" begin="1.4s"/>
  </circle>
  <!-- MCP → core -->
  <circle r="2.5" fill="rgba(139,92,246,0.7)" filter="url(#softGlow)">
    <animateMotion dur="2.5s" repeatCount="indefinite" path="M880,440 L665,440" begin="0.3s"/>
    <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.5s" repeatCount="indefinite" begin="0.3s"/>
  </circle>
  <circle r="2" fill="rgba(139,92,246,0.5)" filter="url(#softGlow)">
    <animateMotion dur="2.5s" repeatCount="indefinite" path="M880,440 L665,440" begin="1.6s"/>
    <animate attributeName="opacity" values="0;0.6;0.6;0" dur="2.5s" repeatCount="indefinite" begin="1.6s"/>
  </circle>
  <!-- 网络搜索 → core -->
  <circle r="2.5" fill="rgba(139,92,246,0.7)" filter="url(#softGlow)">
    <animateMotion dur="2.8s" repeatCount="indefinite" path="M798,638 L646,486" begin="0.7s"/>
    <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.8s" repeatCount="indefinite" begin="0.7s"/>
  </circle>
  <circle r="2" fill="rgba(139,92,246,0.5)" filter="url(#softGlow)">
    <animateMotion dur="2.8s" repeatCount="indefinite" path="M798,638 L646,486" begin="2.1s"/>
    <animate attributeName="opacity" values="0;0.6;0.6;0" dur="2.8s" repeatCount="indefinite" begin="2.1s"/>
  </circle>
  <!-- Skill → core -->
  <circle r="2.5" fill="rgba(139,92,246,0.7)" filter="url(#softGlow)">
    <animateMotion dur="2.8s" repeatCount="indefinite" path="M600,720 L600,505" begin="0.2s"/>
    <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.8s" repeatCount="indefinite" begin="0.2s"/>
  </circle>
  <circle r="2" fill="rgba(139,92,246,0.5)" filter="url(#softGlow)">
    <animateMotion dur="2.8s" repeatCount="indefinite" path="M600,720 L600,505" begin="1.6s"/>
    <animate attributeName="opacity" values="0;0.6;0.6;0" dur="2.8s" repeatCount="indefinite" begin="1.6s"/>
  </circle>
  <!-- 文件检索 → core -->
  <circle r="2.5" fill="rgba(139,92,246,0.7)" filter="url(#softGlow)">
    <animateMotion dur="2.5s" repeatCount="indefinite" path="M320,440 L535,440" begin="0.5s"/>
    <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.5s" repeatCount="indefinite" begin="0.5s"/>
  </circle>
  <circle r="2" fill="rgba(139,92,246,0.5)" filter="url(#softGlow)">
    <animateMotion dur="2.5s" repeatCount="indefinite" path="M320,440 L535,440" begin="1.8s"/>
    <animate attributeName="opacity" values="0;0.6;0.6;0" dur="2.5s" repeatCount="indefinite" begin="1.8s"/>
  </circle>
  <!-- RAG → core -->
  <circle r="2.5" fill="rgba(139,92,246,0.7)" filter="url(#softGlow)">
    <animateMotion dur="2.8s" repeatCount="indefinite" path="M402,242 L554,394" begin="0.4s"/>
    <animate attributeName="opacity" values="0;0.8;0.8;0" dur="2.8s" repeatCount="indefinite" begin="0.4s"/>
  </circle>
  <circle r="2" fill="rgba(139,92,246,0.5)" filter="url(#softGlow)">
    <animateMotion dur="2.8s" repeatCount="indefinite" path="M402,242 L554,394" begin="1.9s"/>
    <animate attributeName="opacity" values="0;0.6;0.6;0" dur="2.8s" repeatCount="indefinite" begin="1.9s"/>
  </circle>

  <!-- ===== 狭义上下文 Cards (blue) — INSIDE inner ring ===== -->

  <!-- Prompt — above core, inside inner ring -->
  <rect x="515" y="304" width="170" height="52" rx="8" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.25)" stroke-width="1"/>
  <circle cx="535" cy="323" r="4" fill="rgba(59,130,246,0.6)"/>
  <text x="547" y="328" fill="rgba(59,130,246,0.9)" font-size="14" font-weight="600">Prompt</text>
  <text x="535" y="347" fill="rgba(255,255,255,0.45)" font-size="10.5">用户输入的指令或问题</text>

  <!-- 会话窗口 — below core, inside inner ring -->
  <rect x="507" y="524" width="186" height="52" rx="8" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.25)" stroke-width="1"/>
  <circle cx="527" cy="543" r="4" fill="rgba(59,130,246,0.6)"/>
  <text x="539" y="548" fill="rgba(59,130,246,0.9)" font-size="14" font-weight="600">会话窗口</text>
  <text x="527" y="567" fill="rgba(255,255,255,0.45)" font-size="10.5">当前对话的历史消息</text>

  <!-- ===== 广义上下文 Cards (purple) — outside outer ring ===== -->

  <!-- 工具调用 — 0° top -->
  <rect x="515" y="64" width="170" height="52" rx="8" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.25)" stroke-width="1"/>
  <circle cx="535" cy="83" r="4" fill="rgba(139,92,246,0.6)"/>
  <text x="547" y="88" fill="rgba(139,92,246,0.9)" font-size="14" font-weight="600">工具调用</text>
  <text x="535" y="107" fill="rgba(255,255,255,0.45)" font-size="10.5">执行外部操作的能力</text>

  <!-- MCP — 90° right -->
  <rect x="910" y="414" width="170" height="52" rx="8" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.25)" stroke-width="1"/>
  <circle cx="930" cy="433" r="4" fill="rgba(139,92,246,0.6)"/>
  <text x="942" y="438" fill="rgba(139,92,246,0.9)" font-size="14" font-weight="600">MCP</text>
  <text x="930" y="457" fill="rgba(255,255,255,0.45)" font-size="10.5">标准化工具调用协议</text>

  <!-- 网络搜索 — 135° lower-right -->
  <rect x="763" y="662" width="170" height="52" rx="8" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.25)" stroke-width="1"/>
  <circle cx="783" cy="681" r="4" fill="rgba(139,92,246,0.6)"/>
  <text x="795" y="686" fill="rgba(139,92,246,0.9)" font-size="14" font-weight="600">网络搜索</text>
  <text x="783" y="705" fill="rgba(255,255,255,0.45)" font-size="10.5">实时获取互联网信息</text>

  <!-- Skill — 180° bottom -->
  <rect x="515" y="760" width="170" height="52" rx="8" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.25)" stroke-width="1"/>
  <circle cx="535" cy="779" r="4" fill="rgba(139,92,246,0.6)"/>
  <text x="547" y="784" fill="rgba(139,92,246,0.9)" font-size="14" font-weight="600">Skill</text>
  <text x="535" y="803" fill="rgba(255,255,255,0.45)" font-size="10.5">封装的能力模块</text>

  <!-- 文件检索 — 270° left -->
  <rect x="120" y="414" width="170" height="52" rx="8" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.25)" stroke-width="1"/>
  <circle cx="140" cy="433" r="4" fill="rgba(139,92,246,0.6)"/>
  <text x="152" y="438" fill="rgba(139,92,246,0.9)" font-size="14" font-weight="600">文件检索</text>
  <text x="140" y="457" fill="rgba(255,255,255,0.45)" font-size="10.5">搜索和读取本地文件</text>

  <!-- RAG — 315° upper-left -->
  <rect x="268" y="167" width="170" height="52" rx="8" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.25)" stroke-width="1"/>
  <circle cx="288" cy="186" r="4" fill="rgba(139,92,246,0.6)"/>
  <text x="300" y="191" fill="rgba(139,92,246,0.9)" font-size="14" font-weight="600">RAG</text>
  <text x="288" y="210" fill="rgba(255,255,255,0.45)" font-size="10.5">检索外部知识辅助生成</text>

  <!-- ===== Bottom Takeaway ===== -->
  <rect x="340" y="870" width="520" height="42" rx="8" fill="rgba(66,184,131,0.06)" stroke="rgba(66,184,131,0.2)" stroke-width="1"/>
  <text x="600" y="896" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="14" letter-spacing="2" font-weight="500">正确的信息 · 正确的格式 · 正确的时机</text>

  </g><!-- end translate(0,30) -->
</svg>`,
    },
  ],
} satisfies SlideContent
