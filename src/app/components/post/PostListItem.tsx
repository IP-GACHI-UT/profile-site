import Link from 'next/link';
import { getAuthorByName } from '@/lib/authors';
import type { PostEntry } from '@/lib/content';

type Props = {
  post: PostEntry;
};

function createPreviewText(body: string, maxLength: number = 120) {
  const normalizedBody = body.replace(/\s+/g, ' ').trim();

  if (normalizedBody.length <= maxLength) {
    return normalizedBody;
  }

  return `${normalizedBody.slice(0, maxLength)}...`;
}

export default function PostListItem({ post }: Props) {
  const { slug, title, date, author, tags } = post.frontMatter;
  const authorProfile = getAuthorByName(author);
  const previewText = createPreviewText(post.body);

  return (
    <li>
      <Link href={`/posts/${slug}`} className="group block h-full">
        <article className="flex h-full flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
          <div className="flex items-start justify-between gap-4 text-sm text-gray-500">
            <div>
              <p className="font-medium text-gray-700">{authorProfile.name}</p>
              <p>{authorProfile.role}</p>
            </div>
            <time dateTime={date}>{date}</time>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-950 transition group-hover:text-emerald-700">
              {title}
            </h2>
            <p className="text-sm leading-7 text-gray-600">{previewText}</p>
          </div>

          {tags.length > 0 ? (
            <div className="mt-auto flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      </Link>
    </li>
  );
}
