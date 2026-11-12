import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table,TableHeader,TableBody,TableRow,TableHead,TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
const rows=[{name:'空间智能工作台',owner:'产品设计',status:'进行中'},{name:'AI 助手组件集',owner:'体验设计',status:'待审核'},{name:'品牌视觉规范',owner:'设计系统',status:'已发布'}]
export function ProjectTable(){const [query,setQuery]=useState('');const filtered=rows.filter(r=>r.name.includes(query));return <Card><CardHeader><CardTitle>项目列表</CardTitle><CardDescription>团队工作一目了然 · 以下为演示数据</CardDescription><Input aria-label="搜索项目" placeholder="搜索项目名称…" value={query} onChange={e=>setQuery(e.target.value)}/></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>项目名称</TableHead><TableHead>负责人</TableHead><TableHead>状态</TableHead></TableRow></TableHeader><TableBody>{filtered.map(r=><TableRow key={r.name}><TableCell className="font-medium">{r.name}</TableCell><TableCell>{r.owner}</TableCell><TableCell><Badge variant="secondary">{r.status}</Badge></TableCell></TableRow>)}{filtered.length===0&&<TableRow><TableCell colSpan={3}>没有匹配的项目，请换个关键词。</TableCell></TableRow>}</TableBody></Table></CardContent></Card>}
