import test from 'node:test'
import assert from 'node:assert/strict'
import {selectComponents,generateSource} from './compose.mjs'
test('known requests reuse only matching blocks',()=>{assert.deepEqual(selectComponents('项目列表和指标').map(i=>i.name),['page-header','metric-grid','project-table']);assert.deepEqual(selectComponents('交付检查').map(i=>i.name),['page-header','action-panel'])})
test('unknown requests have no fabricated match',()=>assert.deepEqual(selectComponents('制作一个太空游戏'),[]))
test('prompt remains a string literal in generated TSX',()=>{const source=generateSource('项目 </script> " {evil()} ',selectComponents('项目'));assert.ok(source.includes('title={"项目 </script> \\" {evil()} "}'.replace('\\\\"','\\"')));assert.ok(source.includes('ProjectTable'))})
