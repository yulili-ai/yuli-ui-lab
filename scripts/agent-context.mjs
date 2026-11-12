import {withMcp,textOf} from './mcp-client.mjs'
const prompt=process.argv.slice(2).join(' ')
if(!prompt){console.error('用法：node scripts/agent-context.mjs "页面需求"');process.exit(1)}
await withMcp(async client=>{
 const tools=await client.listTools()
 console.log(JSON.stringify({prompt,availableTools:tools.tools.map(t=>t.name)}))
 for(const [name,args] of [
 ['list_items_in_registries',{registries:['@yuli'],limit:30,offset:0}],
 ['search_items_in_registries',{registries:['@yuli'],query:prompt,limit:10,offset:0}],
 ['view_items_in_registries',{items:['@yuli/page-header','@yuli/metric-grid','@yuli/project-table','@yuli/action-panel']}],
 ...['page-header','metric-grid','project-table','action-panel'].map(query=>['get_item_examples_from_registries',{registries:['@yuli'],query}])
 ]){const result=await client.callTool({name,arguments:args});console.log(JSON.stringify({tool:name,arguments:args,result},null,2));if(result.isError)throw new Error(textOf(result))}
})
