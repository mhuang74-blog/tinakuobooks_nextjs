import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WorkDetail } from '@/components/work-detail'
import {
  getAllWorks,
  getNewerWork,
  getOlderWork,
  getRelatedWorks,
  getWorkBySlug,
} from '@/lib/works'
import { buildMetadata, workAlternates, workImage } from '@/lib/seo'
import { getCollection } from '@/content/collections'
import { getAuthor } from '@/content/authors'

export const dynamicParams = false

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return getAllWorks().flatMap((work) => [
    { slug: work.slug },
    { slug: encodeURIComponent(work.slug) },
  ])
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const slug = decodeURIComponent((await params).slug)
  const work = getWorkBySlug(slug)
  if (!work) return {}

  return buildMetadata({
    locale: 'zh',
    title: work.title.zh,
    description: work.description.zh,
    path: `/${work.slug}`,
    alternates: workAlternates(work),
    type: 'article',
    image: workImage(work),
    publishedTime: `${work.date}T00:00:00+08:00`,
    authors: [getAuthor(work.authorId).name.zh],
    section: getCollection(work.collectionId).name.zh,
    keywords: [work.title.zh, '郭瀞婷', 'Tina Kuo'],
  })
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const slug = decodeURIComponent((await params).slug)
  const work = getWorkBySlug(slug)
  if (!work) notFound()

  return (
    <WorkDetail
      work={work}
      locale="zh"
      newer={getNewerWork(work)}
      older={getOlderWork(work)}
      related={getRelatedWorks(work)}
    />
  )
}
