import Container from '@/app/components/common/Container';
import PostList from '@/app/components/post/PostList';
import { listPublishedPosts } from '@/lib/content';

export default async function Home() {
  const posts = await listPublishedPosts();

  return (
    <main className="pb-14">
      <Container>
        <section className="mb-7 pt-10 pb-3">
          <p className="section-label">ゲーム × 開発 × 実践知</p>
          <div className="mt-4 max-w-3xl space-y-3">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              ゲームと開発の知見を共有する
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
              複数の開発者が、ゲームのプレイ感想・技術・開発事情・リリース情報を共有するメディアです。
            </p>
          </div>
        </section>

        <section>
          <div className="mb-5 border-l-2 border-accent pl-4">
            <h2 className="text-lg font-bold tracking-tight text-text-primary lg:text-xl">
              最新の記事
            </h2>
          </div>
          <PostList posts={posts} />
        </section>
      </Container>
    </main>
  );
}
