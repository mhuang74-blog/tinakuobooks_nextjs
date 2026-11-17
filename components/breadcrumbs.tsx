import Link from 'next/link'

export type Crumb = {
  label: string
  href?: string
  legacy?: boolean
}

type Props = {
  items: Crumb[]
}

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          return (
            <li key={`${item.label}-${item.href ?? "current"}`}>
              {item.href && !isCurrent ? (
                item.legacy ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined}>{item.label}</span>
              )}
              {!isCurrent ? <span aria-hidden="true">/</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
