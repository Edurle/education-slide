# 阶段 3：服务端 Agent + SSE 动画联动

## 目标

* 将 Agent 执行移至服务端，避免 API Key 暴露在前端
* 通过 SSE 实现实时状态推送
* 前端专注于动画渲染和用户交互
* 支持 LangChain Agent 真实调用

## 技术选型

| 配置项 | 选择 |
|--------|------|
| 服务端框架 | Express |
| 服务端端口 | 3001 |
| 通信协议 | SSE (Server-Sent Events) |
| 会话恢复 | 不支持（简化实现）|

## 架构

```
AgentDemo.vue → HTTP/SSE → Server (Express:3001) → Agent.ts → SSE Events → Diagram.vue
```

## 目录结构

```
server/
├── package.json           # 服务端依赖
├── tsconfig.json          # TS 配置
└── src/
    ├── index.ts           # Express 入口
    ├── routes/
    │   └── agent.ts       # Agent API 路由
    ├── agents/
    │   ├── BaseAgent.ts   # 基类，包含 SSE 推送
    │   ├── QAAgent.ts     # 问答 Agent (Input → LLM → Output)
    │   └── ToolAgent.ts   # 工具调用 Agent (Input → LLM → Tools → LLM → Output)
    └── types/
        └── index.ts       # 服务端类型定义

src/
├── api/
│   └── agent.ts           # 前端 API 封装 (fetch + SSE 解析)
└── components/
    └── AgentDemo.vue      # Agent 演示组件
```

## 任务清单

| 步骤 | 做什么 | 怎么做 | 状态 |
|------|--------|--------|------|
| 3.1 | 搭建服务端基础 | Express + TypeScript，端口 3001 | ✅ 完成 |
| 3.2 | 封装服务端 Agent | BaseAgent、QAAgent、ToolAgent | ✅ 完成 |
| 3.3 | 实现 SSE 事件流 | `/api/agent/run` 端点，返回 `text/event-stream` | ✅ 完成 |
| 3.4 | 前端 API 层 | `src/api/agent.ts` 封装 fetch + SSE 解析 | ✅ 完成 |
| 3.5 | AgentDemo.vue | 调用 API，通过 SSE 事件触发 Diagram 动画 | ✅ 完成 |
| 3.6 | 集成测试 | 输入任务，验证 SSE 事件 → 动画同步 | ✅ 完成 |

## SSE 事件格式

```typescript
// 事件类型
type AgentEventType =
  | 'node_status'      // 节点状态变化
  | 'edge_activate'    // 边激活（流动动画开始）
  | 'edge_deactivate'  // 边停用
  | 'action'           // Agent 动作说明
  | 'result'           // 最终结果
  | 'error'            // 错误

// 事件示例
event: node_status
data: {"nodeId":"llm","status":"running"}

event: edge_activate
data: {"edgeId":"e1"}

event: action
data: {"action":"正在调用 LLM 进行推理..."}

event: result
data: {"result":"北京今天天气晴朗..."}
```

## API 端点

### POST /api/agent/run

启动 Agent 执行，返回 SSE 流。

**Request:**
```json
{
  "agentType": "qa" | "tool",
  "input": "用户输入"
}
```

**Response:** `text/event-stream`

### GET /api/agent/tools

获取可用工具列表。

**Response:**
```json
{
  "tools": [
    { "name": "get_weather", "description": "获取指定城市的天气信息" },
    { "name": "calculate", "description": "执行数学计算" },
    { "name": "search", "description": "搜索信息" }
  ]
}
```

### GET /health

健康检查端点。

## Agent 流程

### QAAgent (问答)

```
Input → LLM → Output
```

节点: `input`, `llm`, `output`
边: `e1` (input→llm), `e3` (llm→output)

### ToolAgent (工具调用)

```
Input → LLM → Tools → LLM → Output
```

节点: `input`, `llm`, `tools`, `output`
边: `e1` (input→llm), `e2` (llm→tools), `e2-reverse` (tools→llm), `e3` (llm→output)

## 开发命令

```bash
# 安装依赖
npm install                    # 前端依赖
cd server && npm install       # 服务端依赖

# 启动开发服务器（同时启动前后端）
npm run dev

# 单独启动
npm run dev:client             # 仅前端 (Vite)
npm run dev:server             # 仅服务端 (Express)

# 清理端口
npm run clean                  # 清理所有端口
npm run clean:client           # 清理前端端口 (5173, 5174)
npm run clean:server           # 清理服务端端口 (3001)

# 构建
npm run build
```

## 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | 否（不配置则使用演示模式）|

## 演示模式

未配置 `OPENAI_API_KEY` 时，Agent 会使用模拟响应，演示完整的动画流程。

## 约束

* AgentDemo 不修改 MarkdownRenderer 的内容
* Diagram 动画必须与 SSE 事件完全同步
* 所有 Agent 示例保持最小可复现逻辑
* 服务端端口固定为 3001
* 前端通过 Vite proxy 访问服务端 API
