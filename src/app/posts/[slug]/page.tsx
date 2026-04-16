import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import ArticleProse from '@/app/components/article/ArticleProse';
import AuthorCard from '@/app/components/article/AuthorCard';
import Container from '@/app/components/common/Container';
import { Scroll50Tracker } from '@/app/components/Scroll50Tracker';
import {
  getPostBySlug,
  listPublishedPosts,
  shouldHideDraft,
} from '@/lib/content';

export async function generateStaticParams() {
  const entries = await listPublishedPosts();

  return entries.map((entry) => ({ slug: entry.frontMatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getPostBySlug(slug);

  if (!entry || shouldHideDraft(entry)) {
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
  const entry = await getPostBySlug(slug);

  if (!entry) {
    notFound();
  }

  if (shouldHideDraft(entry)) {
    notFound();
  }

  return (
    <>
      <Scroll50Tracker />

      <main className="py-14">
        <Container className="max-w-5xl space-y-8">
          <div className="mb-6">
            <Link
              href="/posts"
              className="text-sm text-gray-500 transition hover:text-gray-800"
            >
              ← 投稿一覧へ戻る
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
              <header className="mb-10 border-b border-gray-200 pb-6">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span>投稿者: {entry.frontMatter.author}</span>
                  <span>投稿日: {entry.frontMatter.date}</span>
                </div>

                <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-950 md:text-4xl">
                  {entry.frontMatter.title}
                </h1>

                <p className="text-base leading-7 text-gray-600">
                  {entry.frontMatter.description}
                </p>

                {entry.frontMatter.tags.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {entry.frontMatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </header>

              <ArticleProse>
                <MDXRemote source={entry.body} />
              </ArticleProse>
            </article>

            <div className="lg:sticky lg:top-24">
              <AuthorCard authorName={entry.frontMatter.author} />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
