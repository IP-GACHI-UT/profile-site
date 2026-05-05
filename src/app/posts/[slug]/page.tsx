import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import ArticleProse from '@/app/components/article/ArticleProse';
import AuthorCard from '@/app/components/article/AuthorCard';
import Container from '@/app/components/common/Container';
import { Scroll50Tracker } from '@/app/components/Scroll50Tracker';
import { getAuthorByName } from '@/lib/authors';
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

  const authorProfile = getAuthorByName(entry.frontMatter.author);

  return (
    <>
      <Scroll50Tracker />

      <main>
        <Container className="max-w-3xl py-12">
          <article>
            <header className="mb-10 border-b border-border pb-6">
              <p className="mb-3 text-sm text-text-muted">
                {authorProfile.name} · {entry.frontMatter.date}
              </p>

              <h1 className="text-3xl font-bold leading-tight text-text-primary md:text-4xl">
                {entry.frontMatter.title}
              </h1>
            </header>

            <ArticleProse>
              <MDXRemote source={entry.body} />
            </ArticleProse>

            <div className="mt-14">
              <AuthorCard authorName={entry.frontMatter.author} />
            </div>
          </article>
        </Container>
      </main>
    </>
  );
}
