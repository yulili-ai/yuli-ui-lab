import { spawn } from 'node:child_process'
import { mkdir, open, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
const root=resolve(import.meta.dirname,'..')
const ui='http://127.0.0.1:5173'
const api='http://127.0.0.1:4174/api/health'
async function health(){
 try{const [page,response]=await Promise.all([fetch(ui,{signal:AbortSignal.timeout(1500)}),fetch(api,{signal:AbortSignal.timeout(1500)})]);const data=await response.json();return page.ok&&data.project===root&&data.status==='ok'}catch{return false}
}
if(await health()){
 console.log(`演示已在运行：${ui}`)
}else{
 await mkdir(resolve(root,'.local/runtime'),{recursive:true})
 const logPath=resolve(root,'.local/runtime/server.log')
 const log=await open(logPath,'a')
 const child=spawn(process.execPath,['scripts/dev.mjs'],{cwd:root,detached:true,stdio:['ignore',log.fd,log.fd],env:{...process.env,YULI_OPEN_BROWSER:'0'}})
 let failed
 child.on('error',error=>{failed=error})
 child.unref()
 await log.close()
 const deadline=Date.now()+15000
 let ready=false
 while(Date.now()<deadline&&!failed){if(await health()){ready=true;break}await new Promise(r=>setTimeout(r,300))}
 if(!ready){console.error(`启动失败，请查看 ${logPath}`);if(failed)console.error(failed.message);process.exitCode=1}
 else{await writeFile(resolve(root,'.local/runtime/server.json'),JSON.stringify({pid:child.pid,root,startedAt:new Date().toISOString()},null,2));console.log(`演示已在后台启动：${ui}\n说明与入口：${ui}/guide.html\n关闭当前终端不会结束演示。`)}
}
