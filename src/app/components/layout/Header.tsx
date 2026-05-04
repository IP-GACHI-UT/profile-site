import Link from 'next/link';
import Container from '../common/Container';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur">
      <Container className="flex h-full max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-7 w-1.5 rounded-full bg-accent shadow-[0_0_18px_rgba(122,162,247,0.45)]"
          />
          <span className="flex flex-col">
            <span className="text-lg font-semibold text-text-primary">
              toWell
            </span>
            <span className="text-xs font-medium text-text-muted">
              記事と開発ログのポータル
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/posts"
            className="text-sm font-medium text-text-secondary transition hover:text-text-primary"
          >
            投稿一覧
          </Link>
          <Button href="/posts/form">
            <span>投稿する</span>
          </Button>
        </div>
      </Container>
    </header>
  );
}
