import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
const root=resolve(import.meta.dirname,'..')
const children=[spawn(process.execPath,['scripts/registry-server.mjs'],{cwd:root,stdio:'inherit'}),spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5173','--strictPort'],{cwd:root,stdio:'inherit'})]
let stopping=false
function stop(code=0){if(stopping)return;stopping=true;for(const c of children)c.kill('SIGTERM');setTimeout(()=>process.exit(code),500)}
children.forEach(c=>c.on('exit',code=>stop(code??1)))
process.on('SIGINT',()=>stop());process.on('SIGTERM',()=>stop())
if(process.env.YULI_OPEN_BROWSER==='1'&&process.platform==='darwin'){
 const deadline=Date.now()+15000
 const openWhenReady=async()=>{
  if(stopping)return
  try{const result=await fetch('http://127.0.0.1:5173');if(result.ok){spawn('open',['http://127.0.0.1:5173'],{stdio:'ignore'});return}}catch{}
  if(Date.now()<deadline)setTimeout(openWhenReady,250)
 }
 void openWhenReady()
}
