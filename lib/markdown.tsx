import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const components: Components = {
  a({ href, children }) {
    const external = typeof href === 'string' && /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  },
  img({ src, alt }) {
    return (
      <img
        src={typeof src === 'string' ? src : undefined}
        alt={alt ?? ''}
        loading="lazy"
        decoding="async"
      />
    )
  },
}

type Props = {
  children: string
  className?: string
  lang?: string
}

export function Markdown({ children, className, lang }: Props) {
  return (
    <div className={className} lang={lang}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
