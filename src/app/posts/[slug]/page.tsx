import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { Scroll50Tracker } from '@/app/components/Scroll50Tracker';
import { getEntryBySlug, listEntries } from '@/lib/content';

export async function generateStaticParams() {
  const entries = await listEntries('posts');
  return entries
    .filter((e) => !e.frontMatter.draft)
    .map((e) => ({ slug: e.frontMatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  // Next.js App Router v16+ treats `params` as a Promise in some dynamic APIs.
  // Await it before accessing `params.slug`.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug('posts', slug);
  if (
    !entry ||
    (process.env.NODE_ENV === 'production' && entry.frontMatter.draft)
  ) {
    return {};
  }
  return {
    title: entry.frontMatter.title,
    description: entry.frontMatter.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug('posts', slug);
  if (!entry) notFound();
  if (process.env.NODE_ENV === 'production' && entry.frontMatter.draft)
    notFound();

  return (
    <>
      <Scroll50Tracker />
      <main style={{ padding: 24 }}>
        <h1>{entry.frontMatter.title}</h1>
        <MDXRemote source={entry.body} />
      </main>
    </>
  );
}
