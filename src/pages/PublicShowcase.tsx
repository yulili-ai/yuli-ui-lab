import { ArrowUpRight, Boxes, Code2, Layers3, Workflow } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PageHeader } from '@/components/brand/page-header'
import { MetricGrid } from '@/components/brand/metric-grid'
import { ProjectTable } from '@/components/brand/project-table'
import { ActionPanel } from '@/components/brand/action-panel'
import LiveGeneratedPage from '@/pages/LiveGeneratedPage'
import GeneratedPage from '@/pages/GeneratedPage'

const repo='https://github.com/yulili-ai/yuli-ui-lab'
const roles=[
  ['组件库','保存可复用的实现','8 个基础组件、4 个业务模块及共享品牌主题。页面直接导入已有模块。',Boxes],
  ['MCP','让 AI 访问已有资产','通过官方 shadcn MCP 搜索 Registry，读取组件摘要和实际源码。',Code2],
  ['Skill','约定复用与验收流程','先读规范、检索资产、核对接口，再生成页面并检查构建和交互。',Workflow],
] as const

export default function PublicShowcase(){
 const query=new URLSearchParams(window.location.search)
 const demo=query.get('demo'),assets=query.get('view')==='assets'
 return <div className="min-h-screen bg-background text-foreground">
  <header className="border-b bg-card"><nav aria-label="项目导航" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
   <a href="./" className="flex items-center gap-2 font-semibold"><Layers3 className="text-primary" size={23}/>Yuli UI <span className="font-normal text-muted-foreground">/ Lab</span></a>
   <div className="flex flex-wrap items-center gap-4 text-sm"><a href="./?view=assets" className="hover:text-primary">组件资产</a><a href="./?demo=live" className="hover:text-primary">交互演示</a><a href="./live-evidence.html" className="hover:text-primary">执行记录</a><a href={repo} target="_blank" rel="noreferrer" className="hover:text-primary">GitHub ↗</a></div>
  </nav></header>
  {demo==='live'?<><div className="mx-auto max-w-7xl px-5 py-3 text-sm text-muted-foreground">已保存的 AI 生成结果 · 可体验交互 · 在线不执行 Codex / MCP · 刷新恢复样例</div><LiveGeneratedPage/></>:demo==='ai'?<GeneratedPage/>:assets?<main className="mx-auto max-w-7xl space-y-8 px-5 py-12 sm:px-8">
   <PageHeader title="可以被 AI 找到的设计资产" description="四个业务模块共享品牌变量。下方均为真实组件渲染，交互使用样例数据。" eyebrow="YULI / COMPONENT LIBRARY"/>
   <div className="flex flex-wrap gap-2"><Badge variant="secondary">8 个基础组件</Badge><Badge variant="secondary">4 个业务组件</Badge><Badge variant="outline">14 个 Registry 条目，含工具与主题</Badge></div>
   <div className="grid items-start gap-6 lg:grid-cols-2">
    <Card><CardHeader><CardTitle>PageHeader · 品牌页头</CardTitle><CardDescription>标题、说明与上下文层级。</CardDescription></CardHeader><CardContent><PageHeader title="项目工作空间" description="复用统一信息层级与品牌样式。"/></CardContent></Card>
    <Card><CardHeader><CardTitle>MetricGrid · 指标卡组</CardTitle><CardDescription>接收数据属性，呈现关键指标。</CardDescription></CardHeader><CardContent><MetricGrid/></CardContent></Card>
    <div className="space-y-3"><h2 className="font-semibold">ProjectTable · 项目表格</h2><ProjectTable/></div>
    <div className="space-y-3"><h2 className="font-semibold">ActionPanel · 交付检查</h2><ActionPanel/></div>
   </div>
   <p className="text-sm text-muted-foreground">查看 <a href={`${repo}/tree/main/src/components`} className="text-primary underline">组件源码</a> 或 <a href="./r/registry.json" className="text-primary underline">公开 Registry 目录</a>。本地原型中的自有资产在本次发布中公开展示，不代表已经建立企业权限系统。</p>
  </main>:<main className="mx-auto max-w-7xl space-y-12 px-5 py-12 sm:px-8 sm:py-20">
   <section className="max-w-4xl space-y-6"><Badge variant="secondary">个人探索项目 · AI 协作实现</Badge><p className="text-xs font-semibold tracking-widest text-primary">DESIGN ASSETS → AI WORKFLOW</p><h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">让已有设计资产，<br/>进入 AI 生成流程。</h1><p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">基于 shadcn 的组件资产库，连接 MCP 与 Skill。验证从输入需求、查找已有组件，到生成一致页面并完成验收的工作流。</p><div className="flex flex-wrap gap-3"><Button asChild size="lg"><a href="./?demo=live">体验 AI 生成页面<ArrowUpRight data-icon="inline-end"/></a></Button><Button variant="outline" asChild size="lg"><a href="./live-evidence.html">查看真实执行记录</a></Button></div><p className="text-sm text-muted-foreground">这里展示已生成的页面和历史证据。重新调用 AI 需要拉取项目，在本地 Codex 中运行。</p></section>
   <section aria-label="架构分工" className="grid gap-6 md:grid-cols-3">{roles.map(([name,title,description,Icon])=><Card key={name}><CardHeader><Icon className="mb-4 text-primary" size={24}/><CardDescription>{name}</CardDescription><CardTitle>{title}</CardTitle></CardHeader><CardContent className="text-sm leading-relaxed text-muted-foreground">{description}</CardContent></Card>)}</section>
   <section className="space-y-5"><h2 className="text-2xl font-semibold">一次可追溯的生成过程</h2><p className="max-w-3xl leading-relaxed text-muted-foreground">验证需求是“设计资产交付工作台”：指标、可搜索项目列表、交付检查，以及交付和撤回后同步更新的记录。Codex 按 Skill 读取规范，通过原生 MCP 查找并读取组件，再编写页面。</p><ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['01','输入需求','拆解内容模块与交互'],['02','检索与读取','MCP 返回组件和真实接口'],['03','AI 编写页面','复用四个业务组件，新增交付逻辑'],['04','检查结果','构建与指定浏览器操作通过']].map(([n,title,text])=><li key={n} className="rounded-xl border bg-card p-5"><span className="text-sm text-primary">{n}</span><h3 className="my-2 font-semibold">{title}</h3><p className="text-sm text-muted-foreground">{text}</p></li>)}</ol></section>
   <section className="grid gap-6 lg:grid-cols-2"><Card><CardHeader><CardDescription>2026 年 11 月 12 日执行记录</CardDescription><CardTitle>已经验证了什么</CardTitle></CardHeader><CardContent><ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed"><li>12 次成功的原生组件 MCP 调用，含搜索、摘要、源码和审核清单。</li><li>直接复用 PageHeader、MetricGrid、ProjectTable、ActionPanel。</li><li>TypeScript 与 Vite 构建通过。</li><li>交付、撤回、指标联动、搜索无结果和待交付空状态经过实际操作。</li></ul></CardContent></Card><Card><CardHeader><CardDescription>事实边界</CardDescription><CardTitle>原型验证，尚无团队提效结论</CardTitle></CardHeader><CardContent><p className="text-sm leading-relaxed text-muted-foreground">项目名称、交付记录与完成率均为样例。工具调用次数不是效率评分。当前未接入真实业务、企业权限和团队使用统计，也未开展效率对照实验。具体实现与测试由 Codex 协助完成。</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">该项目展示资产分层、可调用性、复用规则与验证过程。下一步应在真实任务中评估含审核返工的总用时、验收质量和资产维护成本。</p></CardContent></Card></section>
   <section className="rounded-2xl border bg-card p-6 sm:p-8"><h2 className="text-2xl font-semibold">在本地复现</h2><p className="my-4 max-w-3xl leading-relaxed text-muted-foreground">拉取公开仓库、安装依赖并启动本地服务；在 Codex 中接入 yuli_ui MCP 和项目 Skill，再输入自己的需求。公开网站不会连接访客电脑或代替访客调用 AI。</p><Button variant="outline" asChild><a href={`${repo}#本地运行`}>查看运行说明<ArrowUpRight data-icon="inline-end"/></a></Button></section>
  </main>}
  <footer className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 border-t px-5 py-6 text-xs text-muted-foreground"><span>Yuli UI Lab · 个人原型 · 样例数据</span><div className="flex gap-4"><a href="./">项目说明</a><a href="https://ui.shadcn.com/docs/registry" target="_blank" rel="noreferrer">Built on shadcn/ui</a><a href={`${repo}/blob/main/THIRD-PARTY-LICENSE-shadcn.md`}>开源组件许可</a></div></footer>
 </div>
}
