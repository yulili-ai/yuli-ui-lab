import { useState } from 'react'
import { Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
export function ActionPanel(){const [done,setDone]=useState(false);return <Card><CardHeader><CardTitle>交付前，再检查一次</CardTitle><CardDescription>从视觉规范到组件用法，让每次交付都有据可查。</CardDescription></CardHeader><CardContent><ul className="flex flex-col gap-2 text-sm text-muted-foreground"><li>✓ 使用品牌语义色与统一圆角</li><li>✓ 复用组件库中的已有模块</li><li>✓ 保留空状态与交互反馈</li></ul></CardContent><CardFooter><Button variant="outline" onClick={()=>setDone(!done)}>{done?'已标记检查完成':'标记检查完成'}</Button></CardFooter></Card>}
