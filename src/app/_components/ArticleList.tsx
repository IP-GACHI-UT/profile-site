import { listEntries } from '@/lib/content';
import ArticleCard from './ArticleCard';

export default async function ArticleList() {
  const entries = (await listEntries('posts')).filter(
    (e) => !e.frontMatter.draft,
  );

  return (
    <>
      <h2>記事一覧</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {entries.map((entry) => (
          <ArticleCard key={entry.frontMatter.slug} entry={entry} />
        ))}
      </div>
    </>
  );
}
