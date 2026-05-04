import Link from 'next/link';
import { getAuthorByName } from '@/lib/authors';
import type { PostEntry } from '@/lib/content';

type Props = {
  post: PostEntry;
};

export default function PostListItem({ post }: Props) {
  const { slug, title, date, author, category } = post.frontMatter;
  const authorProfile = getAuthorByName(author);

  return (
    <li className="border-b border-border">
      <Link
        href={`/posts/${slug}`}
        className="block py-7 transition-opacity duration-200 hover:opacity-70"
      >
        <article className="space-y-3">
          <p className="text-sm font-medium text-text-muted">
            {authorProfile.name} · <time dateTime={date}>{date}</time>
          </p>

          <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
            {title}
          </h2>

          <span className="category-pill">{category}</span>
        </article>
      </Link>
    </li>
  );
}
