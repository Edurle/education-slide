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
      id: 'example',
      title: '示例章节',
      slides: [
        { id: '01-what-is-agent', title: '什么是 Agent' },
        { id: '02-architecture', title: 'Agent 架构' },
        { id: '03-agent-demo', title: 'Agent 演示' },
        { id: '04-langchain-agent-demo', title: 'LangChain Agent 演示' },
        { id: '04-features', title: 'Agent 特性' },
        { id: '05-status-test', title: 'Diagram 状态测试' },
        { id: '06-custom-agent', title: '多工具 Agent 架构' },
        { id: '07-svg-test', title: 'SVG 渲染测试' },
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
