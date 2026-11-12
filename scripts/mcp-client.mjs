import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { resolve } from 'node:path'
export async function withMcp(run){
 const root=resolve(import.meta.dirname,'..')
 const transport=new StdioClientTransport({command:process.execPath,args:[resolve(root,'node_modules/shadcn/dist/index.js'),'mcp','--cwd',root],cwd:root,stderr:'pipe'})
 const client=new Client({name:'yuli-ui-lab',version:'0.1.0'})
 try{await client.connect(transport);return await run(client)}finally{await client.close()}
}
export function textOf(result){return result.content?.filter(c=>c.type==='text').map(c=>c.text).join('\n')??''}
