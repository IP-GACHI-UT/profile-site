import type { PostEntry } from '@/lib/content';
import PostListItem from './PostListItem';

type Props = {
  posts: PostEntry[];
  emptyMessage?: string;
};

export default function PostList({
  posts,
  emptyMessage = 'まだ投稿がありません。',
}: Props) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface px-6 py-10 text-center text-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className="post-list-divider">
      {posts.map((post) => (
        <PostListItem key={post.frontMatter.slug} post={post} />
      ))}
    </ul>
  );
}
