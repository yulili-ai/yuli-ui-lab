import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
export function MetricGrid({items=[{label:'进行中的项目',value:'12',note:'示例数据 · 本月'},{label:'待审核资产',value:'08',note:'示例数据 · 需要关注'},{label:'已发布组件',value:'24',note:'示例数据 · 资产总览'}]}:{items?:{label:string;value:string;note:string}[]}){
  return <section aria-label="关键指标" className="grid gap-4 sm:grid-cols-3">{items.map(i=><Card key={i.label}><CardHeader><CardDescription>{i.label}</CardDescription><CardTitle className="text-3xl tabular-nums">{i.value}</CardTitle></CardHeader><CardContent><p className="text-xs text-muted-foreground">{i.note}</p></CardContent></Card>)}</section>
}
