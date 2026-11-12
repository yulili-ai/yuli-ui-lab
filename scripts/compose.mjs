import { withMcp,textOf } from './mcp-client.mjs'
export const catalog=[
 {name:'page-header',exportName:'PageHeader',title:'品牌页头',description:'页面标题与上下文，统一信息层级。',keywords:['标题','页头','概览','header','dashboard'],base:['badge']},
 {name:'metric-grid',exportName:'MetricGrid',title:'指标卡组',description:'用三列指标快速呈现关键数据。',keywords:['指标','数据','统计','看板','概览','metric','dashboard'],base:['card']},
 {name:'project-table',exportName:'ProjectTable',title:'项目表格',description:'含搜索、状态和空结果反馈的项目清单。',keywords:['项目','表格','列表','搜索','table','project'],base:['card','table','badge','input']},
 {name:'action-panel',exportName:'ActionPanel',title:'交付检查面板',description:'让规范检查有明确动作与反馈。',keywords:['检查','规范','交付','审核','清单','check'],base:['card','button']}
]
export function selectComponents(prompt){
 const value=prompt.toLowerCase()
 const matched=catalog.filter(c=>c.keywords.some(k=>value.includes(k)))
 if(!matched.length)return []
 return catalog.filter(c=>c.name==='page-header'||matched.includes(c))
}
export function generateSource(prompt,items){
 const imports=items.map(i=>`import { ${i.exportName} } from '@/components/brand/${i.name}'`).join('\n')
 const elements=items.map(i=>i.name==='page-header'?`      <PageHeader title={${JSON.stringify(prompt.slice(0,42))}} description="由 Yuli UI 资产库组合 · 演示数据" />`:`      <${i.exportName} />`).join('\n')
 return `${imports}\n\nexport default function GeneratedPage() {\n  return (\n    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6">\n${elements}\n    </main>\n  )\n}\n`
}
export async function compose(prompt){
 const start=Date.now(),selected=selectComponents(prompt)
 if(!selected.length)return {prompt,items:[],trace:[],code:'',durationMs:Date.now()-start,mode:'rules',message:'暂时没有匹配资产。当前支持项目、指标、表格与交付检查；请在 AI 对话中处理新场景。'}
 const trace=[]
 await withMcp(async client=>{
  for(const item of selected){
   const args={registries:['@yuli'],query:item.name,limit:5,offset:0}
   const result=await client.callTool({name:'search_items_in_registries',arguments:args})
   const content=textOf(result)
   if(result.isError||!content.includes(item.name))throw new Error(`MCP 未能找到 ${item.name}: ${content.slice(0,150)}`)
   trace.push({tool:'search_items_in_registries',arguments:args,result:content})
  }
  const args={items:selected.map(i=>`@yuli/${i.name}`)}
  const result=await client.callTool({name:'view_items_in_registries',arguments:args})
  if(result.isError)throw new Error(textOf(result))
  trace.push({tool:'view_items_in_registries',arguments:args,result:textOf(result)})
  for(const item of selected){
   const args={registries:['@yuli'],query:item.name}
   const result=await client.callTool({name:'get_item_examples_from_registries',arguments:args})
   if(result.isError||!textOf(result).includes(item.exportName))throw new Error(`未读取到 ${item.name} 的源代码`)
   trace.push({tool:'get_item_examples_from_registries',arguments:args,result:textOf(result)})
  }
 })
 return {prompt,items:selected,trace,code:generateSource(prompt,selected),durationMs:Date.now()-start,mode:'rules'}
}
