import Link from 'next/link';
import Container from '../common/Container';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 py-4 backdrop-blur">
      <Container className="flex items-center justify-between gap-4">
        <Link href="/" className="space-y-1">
          <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Profile Site
          </span>
          <span className="block text-xl font-bold text-gray-950">
            記事と開発ログのポータル
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/posts"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            投稿一覧
          </Link>
          <Button href="/posts/form">
            <span>投稿</span>
          </Button>
        </div>
      </Container>
    </header>
  );
}
