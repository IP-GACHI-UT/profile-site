import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import { Scroll50Tracker } from '@/app/components/Scroll50Tracker';
import { getEntryBySlug, listEntries } from '@/lib/content';

export async function generateStaticParams() {
  const entries = await listEntries('posts');

  return entries
    .filter((entry) => !entry.frontMatter.draft)
    .map((entry) => ({ slug: entry.frontMatter.slug }));
}

export async function generateMetadata({
  params,
}: {
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

  if (!entry) {
    notFound();
  }

  if (process.env.NODE_ENV === 'production' && entry.frontMatter.draft) {
    notFound();
  }

  return (
    <>
      <Scroll50Tracker />

      <main className="px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link
              href="/posts"
              className="text-sm text-gray-500 transition hover:text-gray-800"
            >
              ← 投稿一覧へ戻る
            </Link>
          </div>

          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
            <header className="mb-10 border-b border-gray-200 pb-6">
              <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>投稿者: {entry.frontMatter.author}</span>
                <span>投稿日: {entry.frontMatter.date}</span>
              </div>

              <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
                {entry.frontMatter.title}
              </h1>

              <p className="text-base leading-7 text-gray-600">
                {entry.frontMatter.description}
              </p>

              {entry.frontMatter.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.frontMatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="article-content">
              <MDXRemote source={entry.body} />
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
