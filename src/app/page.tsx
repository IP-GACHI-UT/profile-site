import Container from '@/app/components/common/Container';
import SectionLabel from '@/app/components/common/SectionLabel';
import PostList from '@/app/components/post/PostList';
import { listPublishedPosts } from '@/lib/content';

// ルートページのコンポーネント
export default async function Home() {
  const posts = await listPublishedPosts();

  return (
    <main className="py-16">
      <Container className="space-y-10">
        <SectionLabel
          label="Profile"
          title="最新の投稿"
          description="新しく公開した記事を優先して表示しています。プロフィールサイト全体の更新をここから追えます。"
        />

        <PostList posts={posts.slice(0, 4)} />
      </Container>
    </main>
  );
}
