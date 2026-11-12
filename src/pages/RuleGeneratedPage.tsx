import { PageHeader } from '@/components/brand/page-header'
import { MetricGrid } from '@/components/brand/metric-grid'
import { ProjectTable } from '@/components/brand/project-table'

export default function GeneratedPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
      <PageHeader title={"做一个项目概览，包含指标和项目列表"} description="由 Yuli UI 资产库组合 · 演示数据" />
      <MetricGrid />
      <ProjectTable />
    </main>
  )
}
