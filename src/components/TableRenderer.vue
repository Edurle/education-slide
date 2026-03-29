<script setup lang="ts">
import { computed } from 'vue'

export type TableVariant = 'default' | 'striped' | 'bordered' | 'minimal'

const props = defineProps<{
  headers: string[]
  rows: string[][]
  variant?: TableVariant
  theme?: 'light' | 'dark'
}>()

const variantClass = computed(() => `table-${props.variant || 'default'}`)
const themeClass = computed(() => `table-${props.theme || 'dark'}`)

function renderCell(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}
</script>

<template>
  <div class="table-wrapper" :class="[variantClass, themeClass]">
    <table>
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, ri) in rows" :key="ri">
          <td v-for="(cell, ci) in row" :key="ci" v-html="renderCell(cell)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow: hidden;
  border-radius: 6px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92em;
}

th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #42b883;
}

td {
  padding: 0.6rem 1rem;
  vertical-align: top;
  line-height: 1.5;
}

tbody tr {
  transition: background-color 0.2s ease;
}

tbody tr:last-child td {
  border-bottom: none;
}

td :deep(strong) {
  color: #42b883;
  font-weight: 600;
}

/* ========== Light 主题（默认，用于深色背景） ========== */
.table-light {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.table-light thead {
  background: rgba(66, 184, 131, 0.1);
}

.table-light th {
  border-bottom: 2px solid rgba(66, 184, 131, 0.3);
}

.table-light td {
  color: rgba(0, 0, 0, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.table-light tbody tr:hover {
  background: rgba(66, 184, 131, 0.08);
}

/* striped */
.table-light.table-striped tbody tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.03);
}

.table-light.table-striped tbody tr:nth-child(even):hover {
  background: rgba(66, 184, 131, 0.1);
}

/* bordered */
.table-light.table-bordered {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.table-light.table-bordered td,
.table-light.table-bordered th {
  border: 1px solid rgba(0, 0, 0, 0.08);
}

/* minimal */
.table-light.table-minimal thead {
  background: transparent;
}

.table-light.table-minimal th {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0.75rem;
}

.table-light.table-minimal td {
  padding: 0.5rem 0.75rem;
  border-bottom: none;
}

/* ========== Dark 主题 ========== */
.table-dark {
  background: #141428;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.table-dark thead {
  background: rgba(66, 184, 131, 0.08);
}

.table-dark th {
  border-bottom: 2px solid rgba(66, 184, 131, 0.25);
}

.table-dark td {
  color: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.table-dark tbody tr:hover {
  background: rgba(66, 184, 131, 0.08);
}

/* striped */
.table-dark.table-striped tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.03);
}

.table-dark.table-striped tbody tr:nth-child(even):hover {
  background: rgba(66, 184, 131, 0.1);
}

/* bordered */
.table-dark.table-bordered {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.table-dark.table-bordered td,
.table-dark.table-bordered th {
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* minimal */
.table-dark.table-minimal thead {
  background: transparent;
}

.table-dark.table-minimal th {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.5rem 0.75rem;
}

.table-dark.table-minimal td {
  padding: 0.5rem 0.75rem;
  border-bottom: none;
}
</style>
