import { ArrowLeft, ArrowUpRight, Layers3 } from 'lucide-react'
import { PageHeader } from '@/components/brand/page-header'
import { MetricGrid } from '@/components/brand/metric-grid'
import { ProjectTable } from '@/components/brand/project-table'
import { ActionPanel } from '@/components/brand/action-panel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

// AI composed after reading DESIGN.md, yuli-ui-composer, and MCP source examples.
// Data describes this local artifact; project rows remain illustrative fixtures.
export default function GeneratedPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8">
      <nav aria-label="页面导航" className="flex flex-wrap items-center justify-between gap-4">
        <Button variant="ghost" size="sm" asChild><a href="./"><ArrowLeft data-icon="inline-start"/>返回资产工作台</a></Button>
        <Badge variant="outline">AI 编写示例 · 本地演示</Badge>
      </nav>
      <PageHeader eyebrow="YULI / DESIGN OPERATIONS" title="好设计，从复用开始。" description="团队项目、组件资产与交付检查，在同一套设计语言下协作。"/>
      <MetricGrid items={[
        {label:'可复用业务模块',value:'04',note:'本项目实际资产数量'},
        {label:'共享品牌主题',value:'01',note:'随组件依赖分发，避免逐页改色'},
        {label:'本页复用模块',value:'04',note:'页头、指标卡、项目表格、检查面板'},
      ]}/>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <ProjectTable/>
        <div className="flex flex-col gap-6">
          <ActionPanel/>
          <Card>
            <CardHeader><CardDescription>这页如何产生</CardDescription><CardTitle>资产有来源，结果可追溯。</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm leading-7 text-muted-foreground">AI 读取项目 Skill 和品牌规范，通过 MCP 查看组件源码，再重新组织布局、标题和数据。页面直接引用已有组件。</p>
              <div className="flex flex-wrap gap-2"><Badge variant="secondary"><Layers3 data-icon="inline-start"/>@yuli</Badge><Badge variant="secondary">共享品牌变量</Badge></div>
              <Button variant="outline" asChild><a href="./">查看资产与生成流程<ArrowUpRight data-icon="inline-end"/></a></Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <footer className="border-t pt-5 text-xs leading-6 text-muted-foreground">此页为本次 AI 协作产物，不连接真实业务系统。项目列表为演示数据；交付检查标记仅在当前页面内有效。</footer>
    </main>
  )
}
