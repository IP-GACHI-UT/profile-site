import Link from 'next/link';
import { getAuthorByName } from '@/lib/authors';

type Props = {
  authorName: string;
};

function createInitial(name: string) {
  return name.slice(0, 1).toUpperCase();
}

export default function AuthorCard({ authorName }: Props) {
  const author = getAuthorByName(authorName);

  return (
    <aside className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-800">
          {createInitial(author.name)}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gray-500">
            Author
          </p>
          <h2 className="text-xl font-semibold text-gray-950">{author.name}</h2>
          <p className="text-sm text-gray-600">{author.role}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-gray-600">{author.bio}</p>

      {author.site ? (
        <div className="mt-5">
          <Link
            href={author.site}
            className="text-sm font-medium text-emerald-700 underline-offset-4 hover:underline"
          >
            著者のプロフィールを見る
          </Link>
        </div>
      ) : null}
    </aside>
  );
}
