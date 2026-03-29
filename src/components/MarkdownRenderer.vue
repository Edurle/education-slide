<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItKatex from '@traptitech/markdown-it-katex'
import hljs from 'highlight.js'

const props = defineProps<{
  content: string
}>()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str: string, lang: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch {
        // fallback to default
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})

md.use(markdownItKatex, {
  throwOnError: false,
  output: 'html',
})

const renderedHtml = computed(() => md.render(props.content))
</script>

<template>
  <div class="markdown-body" v-html="renderedHtml"></div>
</template>

<style>
.markdown-body {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: #42b883;
}

.markdown-body p {
  margin: 1em 0;
}

.markdown-body strong {
  color: rgba(255, 255, 255, 0.95);
}

.markdown-body a {
  color: #42b883;
}

.markdown-body code {
  background: rgba(66, 184, 131, 0.1);
  color: #42b883;
  padding: 0.15em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
}

.markdown-body pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.markdown-body hr {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 1.5em 0;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 1.5em;
}

.markdown-body li {
  margin: 0.3em 0;
}

.markdown-body blockquote {
  border-left: 3px solid rgba(66, 184, 131, 0.3);
  padding-left: 1em;
  color: rgba(255, 255, 255, 0.6);
  margin: 1em 0;
}

/* Highlight.js theme - GitHub Dark */
.hljs {
  background: #161625;
  padding: 1em;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow-x: auto;
}

.hljs code {
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-title,
.hljs-section,
.hljs-doctag,
.hljs-name,
.hljs-strong {
  color: #ff7b72;
}

.hljs-string,
.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-class .hljs-title,
.hljs-built_in {
  color: #a5d6ff;
}

.hljs-comment,
.hljs-quote {
  color: #8b949e;
}

.hljs-number,
.hljs-literal,
.hljs-regexp {
  color: #79c0ff;
}

.hljs-function {
  color: #d2a8ff;
}

.hljs-params {
  color: #ffa657;
}

/* KaTeX styles */
.katex {
  font-size: 1.1em;
}

.katex-display {
  margin: 1.5em 0;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
