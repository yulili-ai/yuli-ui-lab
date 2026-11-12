import {readFile,writeFile} from 'node:fs/promises'
import {spawnSync} from 'node:child_process'
import {catalog} from './compose.mjs'
const registry=JSON.parse(await readFile('registry.json','utf8'))
const css=await readFile('src/index.css','utf8')
const root=css.match(/:root\{([^}]+)\}/)?.[1]
if(!root)throw new Error('找不到品牌变量')
const light=Object.fromEntries([...root.matchAll(/--([\w-]+):\s*([^;]+)/g)].map(m=>[m[1],m[2].trim()]))
light['card-foreground']=light.foreground;light.popover=light.card;light['popover-foreground']=light.foreground;light['secondary-foreground']=light.foreground;light['accent-foreground']=light.foreground;light.input=light.border;light.ring=light.primary
registry.items=registry.items.filter(i=>i.type==='registry:block')
registry.items.forEach(i=>i.registryDependencies=['@yuli/theme',...catalog.find(c=>c.name===i.name).base.map(name=>`@yuli/${name}`)])
for(const name of ['button','card','badge','input','textarea','table','tabs','separator']){
 registry.items.push({name,type:'registry:ui',title:`Yuli ${name}`,description:`从官方 shadcn/ui 拉取并统一到本地工具导入路径的 ${name} 基础组件。`,dependencies:['radix-ui','class-variance-authority'],registryDependencies:['@yuli/utils','@yuli/theme'],files:[{path:`src/components/ui/${name}.tsx`,type:'registry:ui'}],meta:{version:'0.1.0',owner:'Yuli UI / shadcn',status:'demo',keywords:[name]}})
}
registry.items.push({name:'utils',type:'registry:lib',title:'样式合并工具',description:'共享 cn 工具，统一私有组件的样式合并入口。',dependencies:['clsx','tailwind-merge'],registryDependencies:[],files:[{path:'src/lib/utils.ts',type:'registry:lib',target:'lib/utils.ts'}],meta:{version:'0.1.0',owner:'Yuli UI',status:'demo',keywords:['cn','utils']}})
const theme=Object.fromEntries([...css.match(/@theme inline \{([^}]+)\}/)[1].matchAll(/--(radius-[\w-]+):\s*([^;]+)/g)].map(m=>[m[1],m[2].trim()]))
registry.items.push({name:'theme',type:'registry:theme',title:'Yuli 品牌主题',description:'由 src/index.css 的品牌变量生成，供业务组件安装时共享。',registryDependencies:[],files:[],cssVars:{light,theme},meta:{version:'0.1.0',owner:'Yuli UI',status:'demo',keywords:['主题','品牌','theme']}})
await writeFile('registry.json',JSON.stringify(registry,null,2)+'\n')
const result=spawnSync(process.execPath,['node_modules/shadcn/dist/index.js','build','-o','registry-dist'],{stdio:'inherit'})
process.exit(result.status??1)
