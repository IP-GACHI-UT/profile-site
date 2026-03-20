import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b px-6 py-4 sticky">
      <div className="flex justify-between items-center">
        {/* ロゴ */}
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">Profile Site</span>
        </Link>

        {/* 投稿ページ */}
        <Link href="/posts/new">
          <button className="text-sm text-gray-500" type="button">
            <span>投稿</span>
          </button>
        </Link>
      </div>
    </header>
  );
}
