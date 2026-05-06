import Link from 'next/link';
import { getAuthorByName } from '@/lib/authors';
import type { PostEntry } from '@/lib/content';
import CategoryBadge from './CategoryBadge';

type Props = {
  post: PostEntry;
};

export default function PostListItem({ post }: Props) {
  const { slug, title, date, author, category } = post.frontMatter;
  const authorProfile = getAuthorByName(author);

  return (
    <li className="border-b border-[rgba(42,48,56,0.5)]">
      <Link
        href={`/posts/${slug}`}
        className="block py-6 transition-opacity duration-200 hover:opacity-70"
      >
        <article className="space-y-3">
          <p className="text-xs font-medium text-text-muted">
            {authorProfile.name} · <time dateTime={date}>{date}</time>
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-text-primary lg:text-xl">
            {title}
          </h2>

          <CategoryBadge category={category} />
        </article>
      </Link>
    </li>
  );
}
