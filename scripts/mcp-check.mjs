import { withMcp,textOf } from './mcp-client.mjs'
import { mkdir,writeFile } from 'node:fs/promises'
const evidence=await withMcp(async client=>{
 const {tools}=await client.listTools()
 console.log('MCP tools:',tools.map(t=>t.name).join(', '))
 if(process.argv.includes('--list')){console.log(JSON.stringify(tools,null,2));return {tools}}
 const calls=[]
 for(const [name,args] of [
  ['get_project_registries',{}],
  ['search_items_in_registries',{registries:['@yuli'],query:'指标',limit:10,offset:0}],
  ['view_items_in_registries',{items:['@yuli/metric-grid','@yuli/project-table']}],
  ['get_add_command_for_items',{items:['@yuli/metric-grid']}]
 ]){const result=await client.callTool({name,arguments:args});if(result.isError)throw new Error(textOf(result));calls.push({name,args,result});console.log(name,textOf(result).slice(0,200))}
 return {checkedAt:new Date().toISOString(),tools:tools.map(t=>t.name),calls}
})
await mkdir('evidence',{recursive:true});await writeFile('evidence/mcp-check.json',JSON.stringify(evidence,null,2))
