# Chapter 2 视觉重设计 —「数据工厂」方案设计文档

**日期**: 2026-04-04
**范围**: `src/slides/chapter2-agent-basics/02-perception.ts` ~ `06-mcp.ts`（5 页课件）
**方案**: 数据工厂 — 工业流程可视化（HUD + 管道 + 传送带）

---

## Context

Chapter 2 的 02-06 课件目前仅使用纯文本 + 表格，零动画。而同章的 01-llm-vs-agent 已有精致的 SVG 动画（轨道粒子、脉冲环、弧线箭头），形成严重的视觉落差。用户希望对 02-06 进行全面视觉重设计，要求「天马行空、令人赞叹」，面向混合观众（技术 + 非技术）。

## 视觉语言

### 统一风格：工业蓝图 / HUD（Heads-Up Display）

- **管道 (Pipes)**: 带流动虚线动画的粗线，表示数据流方向
- **工站 (Stations)**: 圆角矩形，带扫描线、LED 状态灯（idle 暗 → running 琥珀脉冲 → done 绿）
- **传送带 (Conveyors)**: 水平/垂直矩形轨道，`stroke-dasharray` + `stroke-dashoffset` 动画
- **HUD 装饰**: 角落支架、坐标读数、细十字准线、六角形背景网格、底部状态栏
- **粒子效果**: 沿管道/传送带流动的发光粒子，`animateMotion` 驱动

### 配色

| 角色 | 色值 | 用途 |
|------|------|------|
| 主色 | `#0ea5e9` (sky blue) | 管道、主框架、HUD 元素 |
| 警告/工具 | `#f59e0b` (amber) | 工具调用、tool_calls 相关 |
| 成功/完成 | `#42b883` (green) | 完成状态、最终答案 |
| 推理/LLM | `#8b5cf6` / `#6366f1` (purple) | LLM 节点、核心处理 |
| 问题/错误 | `#ef4444` (red) | 问题标注、虚线框 |
| 背景 | `#0a0a1a` / `#0d0d1a` | 深空背景 |
| 卡片 | `#141428` / `#111128` | 工站/节点背景 |

### 技术方案

- **所有 5 页**均使用 `type: 'svg'` 内容类型，通过 `SvgRenderer`（`v-html`）渲染
- **动画**：SVG SMIL（`<animate>`、`<animateMotion>`、`<animateTransform>`）
- **无需新组件**，无需新依赖，无需修改现有组件
- 每页 SVG 约 200-350 行，与 `01-llm-vs-agent.ts` 的 ~200 行 SVG 质量一致

### SVG viewBox 尺寸

所有 SVG 统一使用与 01 基准一致的坐标系：

| 布局类型 | viewBox |
|----------|---------|
| `vertical`（全宽） | `0 0 960 500` |
| `split-right`（右 60%） | `0 0 600 520` |

### Markdown 内容策略

保留现有课件的核心文字内容（标题、代码块、关键概念），适当精简以配合 SVG 可视化。SVG 作为视觉主体，markdown 仅保留必要的代码示例和简短说明。

---

## 逐页设计

### 02 — 智能体如何感知世界（输入管道）

**布局**: `vertical` — 单一大 SVG

**结构**:
1. **问题区（上半）**: 红色虚线框，四个模态图标（图像/音频/视频/传感器）飘浮
2. **方案一 — 原生多模态（左下栏）**: 三条输入管道（IMG/AUD/TXT）汇入中央处理室（旋转齿轮图标），统一输出到「理解+生成」框。底部迷你流程图。
3. **方案二 — 智能体端转换（右下栏）**: 三个转换工站 — OCR（扫描线动画）、工具调用（🔧图标）、描述生成（AI图标）— 管道汇聚到统一「文本」输出框。

**关键动画**:
- 模态图标区管道 `stroke-dashoffset` 流动
- OCR 扫描线左右扫动（`y` 属性 animate）
- 转换工站到输出框的彩色粒子（`animateMotion`）
- LED 呼吸灯

### 03 — 思考-行动循环（传送带流水线）

**布局**: `split-right` — 左 40% 文字+代码，右 60% SVG

**SVG 结构**:
- 矩形传送带回路：LLM（左）→ Think（上）→ Act（右）→ Observe（下）→ 回到 LLM
- 每段传送带：`stroke-dasharray="8 4"` + `stroke-dashoffset` 流动动画
- 数据立方体沿传送带运行，经每个工站变色（紫→蓝→琥珀→绿）
- 工站图标：Think=旋转齿轮（`animateTransform rotate`），Act=闪电，Observe=眼睛
- 数据立方体后面有两颗渐隐跟随粒子（拖尾效果）
- HUD 角落支架、底部进度条（宽度 animate）

**左侧代码面板**: Python 代码块，`while not task_complete` 循环

### 04 — 任务结束判定（质检关卡）

**布局**: `split-right` — 左 40% 文字+代码，右 60% SVG（与 Slide.vue 固定的 40/60 比例一致）

**SVG 结构**:
- 主传送带：LLM 输出块从左向右移动
- **扫描门（中）**: 框架结构 + 水平扫描光束上下扫动（矩形 `rect` 的 `y` 属性 `<animate>`）+ X光半透明区域
- **分叉路由（菱形）**: 有 `tool_calls` → 上方拱形侧环进入「工具执行站」→ 返回主传送带；无 `tool_calls` → 直通出货门
- **出货门（右）**: 绿色脉冲发光（`opacity` + `stroke-width` animate）
- **最终答案区**: 出货门下方，爆裂粒子效果（4 颗径向扩散粒子）
- 底部迷你流程图：LLM → SCAN → 菱形分叉 → TOOL EXEC / EXIT ✓

**左侧代码**: Python `while True` 循环，`if not output.tool_calls: break` 行呼吸高亮

### 05 — 工具调用（调度面板）

**布局**: `vertical` — SVG 场景 + ConfigurableAgent 交互组件

**SVG 结构**:
- **顶部洞察条**: 「工具调用的本质是输出一段特殊格式的文本」
- **中心 LLM 引擎**: 旋转齿轮（`animateTransform rotate`）+ 脉冲环扩散
- **三个工具终端**（半圆排列）:
  - `weather_search`（琥珀）— 云图标
  - `calculator`（绿）— 数字图标
  - `database_query`（蓝）— 数据库圆柱图标
- **调度线**: LLM → 各工具终端，`stroke-dasharray` 流动
- **JSON 载荷气泡**: 沿调度线漂浮的半透明 JSON 片段（`name`/`args` 高亮）
- **粒子**: 双向 — 调度粒子（彩色）去，结果粒子（半透明）回
- **底部结构分解**: 三步依次高亮 — STEP1 地址(name) → STEP2 货物(args) → STEP3 框架执行
- **实时交互区**: 虚线框标注，保留 ConfigurableAgent 组件（config 与 agentType 与现有 05-tool-calling.ts 保持一致）

### 06 — MCP 协议（通用适配器）

**布局**: `vertical` — 单一大 SVG

**结构**:
1. **左上问题区**: 红色虚线框「各自为政」
2. **三种框架**（不同几何形状代表不兼容）:
   - 三角形: LangChain（`bind_tools`）
   - 五边形: OpenAI SDK（`function_call`）
   - 菱形: Claude API（`tool_use`）
3. **中央六角 MCP 适配器**: 旋转虚线外环 + 脉冲发光 + 三色 LED 指示连接状态
4. **右侧三个统一矩形**: Resources / Prompts / Tools，全标注 `STANDARD ✓`
5. **管道粒子流**: 左侧彩色粒子（琥珀/绿/紫）汇入六角 → 右侧统一蓝色粒子输出
6. **底部对比卡片**: 红色 BEFORE（各自为政）vs 绿色 AFTER MCP（统一标准）

**关键动画**:
- 框架形状边框呼吸灯（三色错开）
- 六角外环旋转 `stroke-dashoffset`
- 脉冲扩散圈（`r` + `opacity` animate）
- 三条输入管道和三条输出管道的粒子流
- 六角中心适配器图标（双线汇聚箭头）

---

## 共享组件与模式

### SVG Defs 模板

每页 SVG 共享的 `defs` 包括：
- `filter#glow` — 高斯模糊 + 合并（用于节点/粒子发光）
- `filter#glowSmall` — 小范围发光（用于跟随粒子）
- `linearGradient` — 各颜色的线性渐变（用于节点填充）
- `radialGradient` — 径向渐变（用于脉冲背景）
- `marker#arrowhead` — 箭头标记

### HUD 装饰

每页都包含：
- 四角 L 形支架（固定尺寸 `M x,y L x,y` 路径）
- 底部状态栏（`rect` + `monospace` 文字）
- 背景六角网格（极低透明度 `opacity: 0.03-0.06`）

### 动画参数

| 动画类型 | 典型参数 |
|----------|----------|
| 管道流动 | `stroke-dasharray="8 4"`, `dur="1s"`, `stroke-dashoffset` 从 `0` 到 `-24` |
| LED 呼吸 | `opacity` 从 `0.3` 到 `1` 再回 `0.3`, `dur="2s"`, 错开 `begin` |
| 粒子运动 | `animateMotion`, `dur="2-3s"`, 沿路径 |
| 脉冲扩散 | `r` 从小到大 + `opacity` 从高到零, `dur="2-3s"` |
| 齿轮旋转 | `animateTransform type="rotate"`, `dur="4-6s"` |

---

## 实现文件清单

| 文件 | 改动类型 |
|------|----------|
| `src/slides/chapter2-agent-basics/02-perception.ts` | 重写：markdown+table → svg+markdown |
| `src/slides/chapter2-agent-basics/03-think-act-loop.ts` | 重写：diagram+markdown → split-right(svg+markdown) |
| `src/slides/chapter2-agent-basics/04-task-completion.ts` | 重写：markdown → split-right(svg+markdown) |
| `src/slides/chapter2-agent-basics/05-tool-calling.ts` | 重写：保留 configurable-agent，上方加 svg 场景 |
| `src/slides/chapter2-agent-basics/06-mcp.ts` | 重写：markdown+table → svg+markdown |
| `src/components/Diagram.vue` | 不改动 |
| `src/components/SvgRenderer.vue` | 不改动 |
| `src/components/Slide.vue` | 不改动 |
| `src/types/index.d.ts` | 不改动（已支持 `type: 'svg'`） |

## 验证

1. `npm run dev` 启动开发服务器
2. 浏览器访问课件页面，逐页检查 02-06
3. 验证：SVG 动画流畅、布局正确、交互组件（05 的 ConfigurableAgent）正常工作
4. `npm run type-check` 通过
5. `npm run build` 成功
