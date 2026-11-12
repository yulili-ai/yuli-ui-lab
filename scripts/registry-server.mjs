import http from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { compose } from './compose.mjs'
const root=resolve(import.meta.dirname,'..')
const server=http.createServer(async(req,res)=>{
  const send=(status,body)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(body))}
  try{
    const url=new URL(req.url,'http://127.0.0.1:4174')
    if(req.method==='GET'&&url.pathname==='/api/health')return send(200,{status:'ok',project:root,supervisorPid:process.ppid,scope:'loopback-only',mode:'mcp-search-and-rule-composition'})
    if(req.method==='GET'&&/^\/r\/[a-z0-9-]+\.json$/.test(url.pathname)){
      if(process.env.REGISTRY_TOKEN&&req.headers.authorization!==`Bearer ${process.env.REGISTRY_TOKEN}`)return send(401,{error:'Unauthorized'})
      return send(200,JSON.parse(await readFile(resolve(root,'registry-dist',url.pathname.split('/').pop()),'utf8')))
    }
    if(req.method==='POST'&&url.pathname==='/api/compose'){
      // Restrict browser writes to this local UI; no filesystem mutation is performed.
      if(req.headers.origin&&!['http://127.0.0.1:5173','http://localhost:5173'].includes(req.headers.origin))return send(403,{error:'Origin not allowed'})
      let body='';for await(const chunk of req){body+=chunk;if(body.length>8192)return send(413,{error:'需求过长'})}
      const {prompt}=JSON.parse(body);if(typeof prompt!=='string'||!prompt.trim())return send(400,{error:'请输入页面需求'})
      return send(200,await compose(prompt))
    }
    send(404,{error:'Not found'})
  }catch(e){send(e.code==='ENOENT'?404:500,{error:e.message})}
})
server.listen(4174,'127.0.0.1',()=>console.log('Yuli registry: http://127.0.0.1:4174'))
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)))
