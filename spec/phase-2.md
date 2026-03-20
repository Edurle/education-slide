# 阶段 2：架构图动画展示

## 目标

* 构建 Diagram.vue 组件
* 使用 anime.js 展示 Agent 架构图
* 支持节点、箭头和状态动画
* 可嵌入 Slide，每页可展示不同的架构图

## 视觉规范

### 节点样式
- 形状：圆角矩形 (border-radius: 8px)
- 默认尺寸：120x50px
- 字体：14px, 居中对齐

### 状态颜色
| 状态 | 背景色 | 边框色 | 说明 |
|------|--------|--------|------|
| idle | #e8ecf0 | #b0b8c0 | 蓝灰色，未激活 |
| running | #fff3cd | #ffc107 | 黄色，执行中，边框闪烁 |
| done | #d4edda | #28a745 | 绿色，已完成 |

### 动画参数
- 状态切换时长：600ms
- 闪烁周期：1200ms (600ms 亮 → 600ms 暗)
- 缓动函数：easeInOutQuad

### 箭头样式
- 类型：实线 + 三角箭头
- 线型：straight（直线）或 polyline（折线）
- 动画：流动效果 (stroke-dashoffset 动画)
- 颜色：#6b7280

## 组件接口

### Props
```typescript
interface DiagramProps {
  nodes: Node[];           // 必需
  edges: Edge[];           // 必需
  nodeSize?: {             // 可选，覆盖默认尺寸
    width: number;
    height: number;
  };
  colors?: {               // 可选，覆盖默认颜色
    idle?: string;
    running?: string;
    done?: string;
  };
}
```

### 暴露方法
```typescript
interface DiagramExpose {
  highlightNode(id: string): void;                              // 高亮单个节点
  updateNodeStatus(id: string, status: NodeStatus): void;       // 更新节点状态
  reset(): void;                                                 // 重置所有节点为 idle
}
```

### 数据结构
```typescript
type NodeStatus = 'idle' | 'running' | 'done';

interface Node {
  id: string;
  label: string;
  x: number;      // 相对位置 (0-100)
  y: number;      // 相对位置 (0-100)
  status?: NodeStatus;  // 默认 'idle'
}

interface Edge {
  from: string;
  to: string;
  label?: string;  // 可选的边标签
  lineType?: 'straight' | 'polyline';  // 默认 'straight'
}
```

## 任务清单

| 步骤 | 做什么 | 怎么做 | 验证方式 |
|------|--------|--------|----------|
| 2.1 | 设计数据结构 | 定义 Node/Edge TypeScript 接口 | 类型检查通过 |
| 2.2 | 绘制静态节点 | SVG rect + text，使用 x/y 百分比定位 | 浏览器中可见节点 |
| 2.3 | 绘制箭头连接 | SVG line + marker-end，计算箭头角度 | 箭头正确指向目标节点 |
| 2.4 | 实现箭头流动动画 | anime.js stroke-dashoffset 动画 | 箭头有流动效果 |
| 2.5 | 实现状态切换 | anime.js 改变背景/边框色，600ms | 点击按钮切换状态可见颜色变化 |
| 2.6 | 实现 running 闪烁 | anime.js 循环动画边框透明度 | running 状态边框闪烁 |
| 2.7 | 暴露外部接口 | defineExpose({ highlightNode, updateNodeStatus, reset }) | 父组件可调用方法 |
| 2.8 | 自适应容器 | resize 监听 + 重新计算 SVG 尺寸 | 缩放窗口时图表自适应 |

## 约束

* 所有动画保持可控速度和可停止
* 节点/箭头位置使用百分比，保证不同容器可重用
* Diagram 与 MarkdownRenderer 分离，不依赖课件内容
* 使用 SVG 而非 DOM 元素，保证缩放清晰

## 依赖

* anime.js (npm install animejs)
* Vue 3 Composition API
