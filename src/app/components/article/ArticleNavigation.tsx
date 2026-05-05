import Link from 'next/link';
import type { PostEntry } from '@/lib/content';

type Props = {
  newerPost: PostEntry | null;
  olderPost: PostEntry | null;
};

function ArticleNavigationLink({
  direction,
  post,
}: {
  direction: 'newer' | 'older';
  post: PostEntry;
}) {
  const alignClass = direction === 'older' ? 'md:text-right' : '';

  return (
    <Link
      href={`/posts/${post.frontMatter.slug}`}
      className={`block rounded-lg border border-border bg-surface p-5 transition-colors duration-200 hover:border-accent hover:bg-accent-soft ${alignClass}`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        {direction === 'newer' ? '新しい記事' : '古い記事'}
      </span>
      <strong className="mt-2 block text-base leading-7 text-text-primary">
        {post.frontMatter.title}
      </strong>
    </Link>
  );
}

export default function ArticleNavigation({ newerPost, olderPost }: Props) {
  if (!newerPost && !olderPost) {
    return null;
  }

  return (
    <nav
      className="mt-14 border-t border-border pt-8"
      aria-label="記事ナビゲーション"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {newerPost ? (
          <ArticleNavigationLink direction="newer" post={newerPost} />
        ) : (
          <div aria-hidden="true" />
        )}

        {olderPost ? (
          <ArticleNavigationLink direction="older" post={olderPost} />
        ) : null}
      </div>
    </nav>
  );
}
