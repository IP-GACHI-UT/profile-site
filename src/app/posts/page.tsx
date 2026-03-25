import ArticleList from '../_components/ArticleList';

export default function PostsPage() {
  return (
    <section className="space-y-6 px-6 py-8">
      <h1 className="text-2xl font-bold">投稿一覧</h1>
      <ArticleList heading="公開中の記事" />
    </section>
  );
}
