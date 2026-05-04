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
    <aside className="rounded-lg border border-border bg-surface p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-lg font-bold text-accent">
          {createInitial(author.name)}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-muted">
            Author
          </p>
          <h2 className="text-xl font-semibold text-text-primary">
            {author.name}
          </h2>
          <p className="text-sm text-text-secondary">{author.role}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-text-secondary">{author.bio}</p>

      {author.site ? (
        <div className="mt-5">
          <Link
            href={author.site}
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            著者のプロフィールを見る
          </Link>
        </div>
      ) : null}
    </aside>
  );
}
