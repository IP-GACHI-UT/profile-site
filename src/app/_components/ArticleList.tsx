import { listEntries } from '@/lib/content';
import ArticleCard from './ArticleCard';

/**
 * 記事一覧に渡す props
 * @param heading 記事一覧の見出し。省略した場合は「記事一覧」になる。
 * @param limit 表示する記事の最大数。省略した場合は全ての記事を表示する。
 */
type Props = {
  heading?: string;
  limit?: number;
};

/**
 * 公開中の記事一覧を表示する。
 * @param heading 一覧の見出し。省略した場合は「記事一覧」になる。
 * @param limit 表示する記事の最大数。省略した場合は全ての記事を表示する。
 */
export default async function ArticleList({
  heading = '記事一覧',
  limit,
}: Props) {
  const allEntries = await listEntries('posts');
  const publishedEntries = allEntries.filter((e) => !e.frontMatter.draft);

  const entries =
    typeof limit === 'number'
      ? publishedEntries.slice(0, limit)
      : publishedEntries;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">{heading}</h2>

      {entries.length === 0 ? (
        <p className="text-gray-600">まだ投稿がありません。</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {entries.map((entry) => (
            <ArticleCard key={entry.frontMatter.slug} entry={entry} />
          ))}
        </div>
      )}
    </section>
  );
}
