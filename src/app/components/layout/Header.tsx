import Link from 'next/link';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="border-b px-6 py-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        {/* ロゴ */}
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">Profile Site</span>
        </Link>

        {/* 投稿ページ */}
        <Button href="/posts/new">
          <span>投稿</span>
        </Button>
      </div>
    </header>
  );
}
