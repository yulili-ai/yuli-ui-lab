import {mkdir,writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'
const root=resolve(import.meta.dirname,'..')
const args=[resolve(root,'node_modules/shadcn/dist/index.js'),'mcp','--cwd',root]
await mkdir(resolve(root,'.codex'),{recursive:true})
await mkdir(resolve(root,'.cursor'),{recursive:true})
await writeFile(resolve(root,'.codex/config.toml'),`[mcp_servers.yuli_ui]\ncommand = ${JSON.stringify(process.execPath)}\nargs = ${JSON.stringify(args)}\ncwd = ${JSON.stringify(root)}\n`)
await writeFile(resolve(root,'.cursor/mcp.json'),JSON.stringify({mcpServers:{shadcn:{command:'node',args}}},null,2)+'\n')
console.log('已按当前项目位置生成 Codex / Cursor 的项目级 MCP 配置。')
