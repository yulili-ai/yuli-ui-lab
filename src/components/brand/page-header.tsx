import { Badge } from '@/components/ui/badge'
export function PageHeader({title,description,eyebrow='WORKSPACE'}:{title:string;description:string;eyebrow?:string}) {
  return <header className="flex flex-col gap-3"><div><Badge variant="secondary">{eyebrow}</Badge></div><h1 className="text-3xl font-semibold tracking-tight">{title}</h1><p className="text-sm text-muted-foreground">{description}</p></header>
}
