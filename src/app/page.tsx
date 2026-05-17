import Container from '@/app/components/common/Container';
import SectionLabel from '@/app/components/common/SectionLabel';
import PostList from '@/app/components/post/PostList';
import { listPublishedPosts } from '@/lib/content';

export default async function Home() {
  const posts = await listPublishedPosts();

  return (
    <main className="pb-14">
      <Container>
        <section className="mb-7 pt-10 pb-3">
          <SectionLabel
            label="ゲーム × 開発 × 実践知"
            title="ゲームと開発の知見を共有する"
            description="GtoWell は、ゲームのプレイ感想・技術・開発事情・リリース情報をまとめて読めるコンテンツサイトです。"
          />
        </section>

        <section>
          <div className="mb-5">
            <SectionLabel title="最新の記事" headingLevel={2} />
          </div>
          <PostList posts={posts} />
        </section>
      </Container>
    </main>
  );
}
