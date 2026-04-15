import ArticleList from './_components/ArticleList';

// ルートページのコンポーネント
export default function Home() {
  return (
    <section className="space-y-6 px-6 py-8">
      <h1 className="text-2xl font-bold">Profile</h1>

      <ArticleList heading="最新の投稿" limit={4} />
    </section>
  );
}
