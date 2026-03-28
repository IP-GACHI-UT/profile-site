import ArticleList from './_components/ArticleList';

export default function Home() {
  return (
    // space-y-6
    // 子要素どうしの縦の間隔を空ける

    // px-6
    // 左右の余白を付ける

    // py-8
    // 上下の余白を付ける

    // text-2xl
    // 文字を大きくする

    // font-bold
    // 文字を太字にする
    <section className="space-y-6 px-6 py-8">
      <h1 className="text-2xl font-bold">Profile</h1>

      <ArticleList heading="最新の投稿" limit={4} />
    </section>
  );
}
