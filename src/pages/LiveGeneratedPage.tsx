import { useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, FileCheck2, Layers3, RotateCcw } from 'lucide-react'
import { PageHeader } from '@/components/brand/page-header'
import { MetricGrid } from '@/components/brand/metric-grid'
import { ProjectTable } from '@/components/brand/project-table'
import { ActionPanel } from '@/components/brand/action-panel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type DeliveryStatus = 'pending' | 'delivered'
type DeliveryRecord = {
  id: string
  title: string
  project: string
  owner: string
  version: string
  contents: string
  status: DeliveryStatus
}

// Local fixtures only. These records do not represent real projects or deliveries.
const SAMPLE_DELIVERIES: DeliveryRecord[] = [
  { id: 'sample-01', title: '控制台界面规范', project: '空间智能工作台', owner: '产品设计', version: 'v1.2', contents: '12 个页面 · 布局与状态说明', status: 'pending' },
  { id: 'sample-02', title: '对话组件交互稿', project: 'AI 助手组件集', owner: '体验设计', version: 'v0.8', contents: '8 个组件 · 交互与异常状态', status: 'pending' },
  { id: 'sample-03', title: '空间场景图标', project: '空间智能工作台', owner: '产品设计', version: 'v1.0', contents: '24 个图标 · SVG 导出规范', status: 'pending' },
  { id: 'sample-04', title: '品牌色彩与字体', project: '品牌视觉规范', owner: '设计系统', version: 'v1.0', contents: '2 份规范 · 色彩与文字层级', status: 'delivered' },
  { id: 'sample-05', title: '基础组件状态说明', project: 'AI 助手组件集', owner: '体验设计', version: 'v0.7', contents: '6 个组件 · 基础状态说明', status: 'delivered' },
]

function DeliveryList({ records, onStatusChange }: {
  records: DeliveryRecord[]
  onStatusChange: (record: DeliveryRecord, status: DeliveryStatus) => void
}) {
  return (
    <ul className="flex flex-col gap-4" aria-label="交付记录列表">
      {records.map(record => (
        <li key={record.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span className="hidden size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary sm:flex">
              <FileCheck2 className="size-5" aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-medium">{record.title}</h3>
                <Badge variant="outline">{record.version}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{record.project} · {record.owner}</p>
              <p className="text-xs text-muted-foreground">{record.contents}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
            <Badge variant={record.status === 'pending' ? 'secondary' : 'outline'}>
              {record.status === 'pending' ? '待交付' : '已交付'}
            </Badge>
            <Button
              variant={record.status === 'pending' ? 'default' : 'outline'}
              size="sm"
              aria-label={`${record.status === 'pending' ? '标记已交付' : '撤回交付'}：${record.title}`}
              onClick={() => onStatusChange(record, record.status === 'pending' ? 'delivered' : 'pending')}
            >
              {record.status === 'pending' ? <Check data-icon="inline-start" aria-hidden="true" /> : <RotateCcw data-icon="inline-start" aria-hidden="true" />}
              {record.status === 'pending' ? '标记已交付' : '撤回交付'}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function LiveGeneratedPage() {
  const [records, setRecords] = useState<DeliveryRecord[]>(() => SAMPLE_DELIVERIES.map(record => ({ ...record })))
  const [activeTab, setActiveTab] = useState<DeliveryStatus>('pending')
  const [feedback, setFeedback] = useState('选择一条待交付记录，标记后可在「已交付」中查看，也可以撤回。')
  const pendingTabRef = useRef<HTMLButtonElement>(null)
  const deliveredTabRef = useRef<HTMLButtonElement>(null)
  const pending = records.filter(record => record.status === 'pending')
  const delivered = records.filter(record => record.status === 'delivered')
  const completion = records.length === 0 ? 0 : Math.round(delivered.length / records.length * 100)

  function changeStatus(record: DeliveryRecord, status: DeliveryStatus) {
    setRecords(current => current.map(item => item.id === record.id ? { ...item, status } : item))
    setFeedback(status === 'delivered'
      ? `「${record.title}」已标记交付，可切换到「已交付」查看。列表与指标已更新，仅在本页生效。`
      : `「${record.title}」已撤回，已移回「待交付」。列表与指标已更新，仅在本页生效。`)
    // Keep keyboard focus in the current tab when the action's row leaves the list.
    const currentTabRef = activeTab === 'pending' ? pendingTabRef : deliveredTabRef
    currentTabRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <nav aria-label="工作台导航" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <a href="?" className="flex items-center gap-2" aria-label="Yuli UI 生成工作台">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Layers3 className="size-5" aria-hidden="true" /></span>
            <span className="font-semibold">yuli <span className="font-normal text-muted-foreground">/ ui</span></span>
            <Separator orientation="vertical" className="mx-2 hidden h-4 sm:block" />
            <span className="hidden text-sm text-muted-foreground sm:inline">设计资产交付</span>
          </a>
          <Badge variant="secondary">本地样例数据</Badge>
        </nav>
      </div>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
          <PageHeader
            eyebrow="YULI / 设计协作"
            title="设计资产交付工作台"
            description="从项目进展到资产交接，在一处核对规范、跟进交付。所有项目、记录与指标均为本地样例。"
          />
          <Button variant="outline" asChild><a href="?"><ArrowLeft data-icon="inline-start" aria-hidden="true" />返回生成工作台</a></Button>
        </div>

        <MetricGrid items={[
          { label: '待交付记录', value: String(pending.length).padStart(2, '0'), note: '本地样例 · 等待完成交接' },
          { label: '已交付记录', value: String(delivered.length).padStart(2, '0'), note: '本地样例 · 支持撤回到待交付' },
          { label: '交付完成率', value: `${completion}%`, note: `本地样例 · 已交付 ${delivered.length} / 全部 ${records.length} 条` },
        ]} />

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col gap-8">
            <section aria-label="样例项目概览" className="min-w-0"><ProjectTable /></section>

            <Card id="delivery-records">
              <CardHeader>
                <CardTitle><h2>交付记录</h2></CardTitle>
                <CardDescription>本地样例 · 共 {records.length} 条资产记录。标记交付后，记录列表与上方指标同步更新。</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={value => setActiveTab(value as DeliveryStatus)} className="gap-4">
                  <TabsList aria-label="交付状态" className="w-full sm:w-fit">
                    <TabsTrigger ref={pendingTabRef} value="pending">待交付 <span className="tabular-nums">{pending.length}</span></TabsTrigger>
                    <TabsTrigger ref={deliveredTabRef} value="delivered">已交付 <span className="tabular-nums">{delivered.length}</span></TabsTrigger>
                  </TabsList>
                  <TabsContent value="pending">
                    {pending.length > 0 ? <DeliveryList records={pending} onStatusChange={changeStatus} /> : (
                      <div className="flex flex-col items-start gap-4 py-8">
                        <p className="text-sm text-muted-foreground">全部样例记录已交付，当前没有待交付项。</p>
                        <Button variant="outline" onClick={() => { setActiveTab('delivered'); deliveredTabRef.current?.focus() }}>查看已交付记录<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></Button>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="delivered">
                    {delivered.length > 0 ? <DeliveryList records={delivered} onStatusChange={changeStatus} /> : (
                      <p className="py-8 text-sm text-muted-foreground">还没有已交付记录。在「待交付」中标记一条，便会显示在这里。</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t">
                <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-muted-foreground">{feedback}</p>
              </CardFooter>
            </Card>
          </div>

          <aside aria-label="交付检查与演示说明" className="flex min-w-0 flex-col gap-8">
            <div className="flex flex-col gap-2">
              <ActionPanel />
              <p className="px-2 text-xs leading-relaxed text-muted-foreground">检查标记用于本页自查，不代表自动审核通过，也不限制交付操作。</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle><h2>本次交付范围</h2></CardTitle>
                <CardDescription>一组可以反复操作的本地样例。</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <dl className="flex flex-col gap-4 text-sm">
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">覆盖项目</dt><dd>3 个样例项目</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">交付内容</dt><dd>界面 · 组件 · 规范</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">记录总数</dt><dd>{records.length} 条</dd></div>
                </dl>
                <Separator />
                <p className="text-sm leading-relaxed text-muted-foreground">项目列表展示项目阶段，交付记录展示单项资产的交接状态，两者分别管理。</p>
                <p className="text-sm leading-relaxed text-muted-foreground">搜索、检查与交付操作仅在当前页面有效，刷新后恢复初始样例；未连接外部业务系统。</p>
              </CardContent>
            </Card>
          </aside>
        </div>

        <footer className="flex flex-col gap-4">
          <Separator />
          <p className="text-xs text-muted-foreground">Yuli UI · 设计资产交付演示 · 所有业务数据均为本地样例</p>
        </footer>
      </main>
    </div>
  )
}
