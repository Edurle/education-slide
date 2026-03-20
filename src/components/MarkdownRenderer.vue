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
    return `<pre class="hljs"><code>${MarkdownIt.prototype.utils.escapeHtml(str)}</code></pre>`
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

/* Highlight.js theme - GitHub Dark */
.hljs {
  background: #0d1117;
  padding: 1em;
  border-radius: 6px;
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
