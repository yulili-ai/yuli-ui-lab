import {readFile} from 'node:fs/promises'
import {resolve} from 'node:path'
const root=resolve(import.meta.dirname,'..')
try{
 const saved=JSON.parse(await readFile(resolve(root,'.local/runtime/server.json'),'utf8'))
 const response=await fetch('http://127.0.0.1:4174/api/health',{signal:AbortSignal.timeout(2000)})
 const live=await response.json()
 if(saved.root!==root||live.project!==root||live.supervisorPid!==saved.pid)throw new Error('当前服务不属于此次后台启动，未停止任何进程。')
 process.kill(saved.pid,'SIGTERM')
 console.log('已停止 Yuli UI 本地演示。')
}catch(error){console.error(error.message);process.exitCode=1}
