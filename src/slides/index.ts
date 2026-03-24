import type { SlideContent } from '@/types'

// 使用 Vite glob import 自动加载所有幻灯片
const slideModules = import.meta.glob<SlideContent>('./**/*.ts', {
  eager: true,
  import: 'default'
})

// 课程结构配置
export const courseConfig = {
  title: 'AI Agent 入门教程',
  chapters: [
    {
      id: 'chapter1-llm-basics',
      title: '第一章：大模型基础',
      slides: [
        { id: '01-intro-questions', title: '引入：大模型的局限性' },
        { id: '02-llm-essence', title: '大模型的本质' },
        { id: '03-context-engineering', title: '上下文工程' },
        { id: '04-single-call', title: '单次模型调用' },
        { id: '05-multi-turn-memory', title: '多轮对话与记忆' },
        { id: '06-memory-demo', title: '记忆能力演示' },
      ]
    },
    {
      id: 'chapter2-agent-basics',
      title: '第二章：智能体基础',
      slides: [
        { id: '01-llm-vs-agent', title: '大模型 vs 智能体' },
        { id: '02-perception', title: '智能体如何感知世界' },
        { id: '03-think-act-loop', title: '思考-行动循环' },
        { id: '04-task-completion', title: '任务结束判定' },
        { id: '05-tool-calling', title: '工具调用演示' },
        { id: '06-mcp', title: 'MCP 协议' },
      ]
    }
  ]
}

// 获取幻灯片内容
export function getSlide(chapterId: string, slideId: string): SlideContent | undefined {
  const key = `./${chapterId}/${slideId}.ts`
  return slideModules[key]
}

// 获取所有幻灯片（按章节顺序）
export function getAllSlides(): { chapterId: string; slideId: string; content: SlideContent }[] {
  const slides: { chapterId: string; slideId: string; content: SlideContent }[] = []

  for (const chapter of courseConfig.chapters) {
    for (const slide of chapter.slides) {
      const content = getSlide(chapter.id, slide.id)
      if (content) {
        slides.push({ chapterId: chapter.id, slideId: slide.id, content })
      }
    }
  }

  return slides
}
