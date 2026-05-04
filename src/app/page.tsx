import Container from '@/app/components/common/Container';
import PostList from '@/app/components/post/PostList';
import { listPublishedPosts } from '@/lib/content';

export default async function Home() {
  const posts = await listPublishedPosts();

  return (
    <main className="pb-16">
      <Container>
        <section className="mb-8 pt-12 pb-4">
          <p className="text-sm font-semibold text-blue-700">
            ゲーム × 開発 × 実践知
          </p>
          <div className="mt-4 max-w-3xl space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-950 md:text-5xl">
              ゲームと開発の知見を共有する
            </h1>
            <p className="max-w-2xl text-base leading-7 text-gray-600">
              複数の開発者が、ゲームのプレイ感想・技術・開発事情・リリース情報を共有するメディアです。
            </p>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-blue-600" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-950">
              最新の記事
            </h2>
          </div>
          <PostList posts={posts.slice(0, 4)} />
        </section>
      </Container>
    </main>
  );
}
