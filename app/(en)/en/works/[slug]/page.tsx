import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WorkDetail } from '@/components/work-detail'
import {
  getAllWorks,
  getTranslatedWorks,
  getWorkBySlugEn,
} from '@/lib/works'
import { buildMetadata, workAlternates, workImage } from '@/lib/seo'
import { getCollection } from '@/content/collections'
import { getAuthor } from '@/content/authors'

export const dynamicParams = false

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return getTranslatedWorks().map((work) => ({ slug: work.slugEn }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const work = getWorkBySlugEn(slug)
  if (!work) return {}

  return buildMetadata({
    locale: 'en',
    title: work.title.en,
    description: work.description.en,
    path: `/en/works/${work.slugEn}`,
    alternates: workAlternates(work),
    type: 'article',
    image: workImage(work),
    publishedTime: work.publication.yearOnly ? undefined : `${work.date}T00:00:00+08:00`,
    authors: [getAuthor(work.authorId).name.en],
    section: getCollection(work.collectionId).name.en,
    keywords: [work.title.en, work.title.zh, 'Tina Kuo'],
  })
}

export default async function EnWorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const work = getWorkBySlugEn(slug)
  if (!work) notFound()

  const translated = getTranslatedWorks()
  const index = translated.findIndex((candidate) => candidate.slug === work.slug)
  const newer = index > 0 ? translated[index - 1] : undefined
  const older = index >= 0 && index < translated.length - 1 ? translated[index + 1] : undefined
  const related = getAllWorks()
    .filter(
      (candidate) =>
        candidate.collectionId === work.collectionId &&
        candidate.slug !== work.slug &&
        candidate.slugEn !== '',
    )
    .slice(0, 3)

  return (
    <WorkDetail
      work={work}
      locale="en"
      newer={newer}
      older={older}
      related={related}
    />
  )
}
