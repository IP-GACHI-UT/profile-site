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
            label="GtoWell"
            title="エンジニアによるアプリ開発備忘録"
            description="ゲームのプレイ感想・開発事情・リリース情報をお届けします。"
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
