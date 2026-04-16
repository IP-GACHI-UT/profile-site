import Container from '@/app/components/common/Container';
import SectionLabel from '@/app/components/common/SectionLabel';
import PostList from '@/app/components/post/PostList';
import { listPublishedPosts } from '@/lib/content';

export default async function PostsPage() {
  const posts = await listPublishedPosts();

  return (
    <main className="py-16">
      <Container className="space-y-10">
        <SectionLabel
          label="Posts"
          title="投稿一覧"
          description="公開中の記事を時系列で並べています。気になるテーマから読み進められます。"
        />
        <PostList posts={posts} />
      </Container>
    </main>
  );
}
