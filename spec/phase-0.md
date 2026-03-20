# 阶段 0：环境搭建

## 目标

* 搭建 Vue 3 + TypeScript 项目
* 集成 Markdown 渲染、highlight.js、KaTeX
* 安装 animate.js
* 安装 LangChain 1.2 TS

## 前置要求

* Node.js >= 22.x
* npm

## 任务清单

| 步骤  | 做什么              | 怎么做                                                                    | 规范/约束                         |
| --- | ---------------- | ---------------------------------------------------------------------- | ----------------------------- |
| 0.1 | 创建 Vue 3 + TS 项目 | 使用 Vite：`npm create vite@latest vue-agent-course -- --template vue-ts` | 使用 TypeScript 模板，项目名规范化       |
| 0.2 | 安装 Markdown 渲染库  | `npm install markdown-it markdown-it-katex highlight.js`               | 保证版本兼容，支持公式和代码高亮              |
| 0.3 | 安装 animate.js    | `npm install animejs`                                              | 使用 animateplus 或最新 animate.js |
| 0.4 | 安装 LangChain TS  | `npm install langchain @langchain/core`                                         | 安装langchain核心组件          |
| 0.5 | 配置全局样式           | 引入 highlight.js 样式和 KaTeX 样式                                           | 确保代码块、公式渲染一致                  |
| 0.6 | 安装 LangChain OpenAI | `npm install @langchain/openai` | 安装OpenAI api方便调用llm |
| 0.7 | 创建目录结构 | 创建 `components/`, `agents/`, `slides/`, `utils/`, `types/` 文件夹及占位文件 | 见下方目录结构 |
| 0.8 | 配置 TypeScript | 设置 `tsconfig.json`（paths 别名、严格模式） | 见下方 tsconfig 配置 |
| 0.9 | 配置环境变量 | 创建 `.env.example` 和 `.env` | 添加 `VITE_OPENAI_API_KEY` |
| 0.10 | 添加类型声明 | 安装缺失的类型库：`npm install -D @types/markdown-it` | 缺失类型时安装对应 @types 包 |
| 0.11 | 验证环境 | 运行 `npm run dev` 确认项目启动成功 | 浏览器访问 http://localhost:5173 |

## 约束

* 所有依赖必须通过 npm 安装，版本明确
* 项目结构应预留 `components/`, `agents/`, `slides/`, `utils/` 文件夹
* 保持 TypeScript 严格模式 (`"strict": true`)
* Node.js 最低版本 22.x
* **禁止使用 TSX**，统一使用 `.vue` 单文件组件

## 目录结构

```
src/
├── components/
│   └── .gitkeep
├── agents/
│   └── .gitkeep
├── slides/
│   └── .gitkeep
├── utils/
│   └── .gitkeep
├── types/
│   └── index.d.ts          # 全局类型声明
├── App.vue
├── main.ts
└── vite-env.d.ts
```

## tsconfig.json 配置

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## vite.config.ts 配置

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```

## 环境变量

`.env.example`:
```
VITE_OPENAI_API_KEY=your_api_key_here
```

`.env` (本地使用，不提交到 git):
```
VITE_OPENAI_API_KEY=sk-xxx...
```

## 验收清单

- [ ] `npm run dev` 成功启动开发服务器
- [ ] 浏览器访问 http://localhost:5173 显示 Vue 默认页面
- [ ] `npm run build` 成功构建
- [ ] `npm run type-check` 无类型错误
- [ ] 所有依赖已安装，`package.json` 中版本明确
- [ ] `.env` 文件已创建（不提交到 git）
- [ ] `.gitignore` 包含 `.env` 和 `node_modules/`
- [ ] TypeScript 代码示例能正确渲染和高亮
- [ ] 数学公式能正确渲染（行内 `$...$` 和块级 `$$...$$`）

## 验收测试页面

在 `src/App.vue` 中临时添加以下内容进行验证：

```vue
<template>
  <div class="container">
    <h1>环境验证</h1>

    <h2>代码高亮测试</h2>
    <pre><code class="language-typescript">
interface User {
  name: string
  age: number
}

const greet = (user: User): string => {
  return `Hello, ${user.name}!`
}
    </code></pre>

    <h2>公式渲染测试</h2>
    <p>行内公式：$E = mc^2$</p>
    <p>块级公式：</p>
    <p>$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'katex/dist/katex.min.css'

onMounted(() => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block as HTMLElement)
  })
})
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
```
