import Link from 'next/link';
import type { ContentEntry } from '@/lib/content';

/**
 * 投稿カードに渡す props
 * @prop entry 投稿エントリー。ContentEntryのうち、'posts'に特化した型を使用する。
 */
type Props = {
  entry: ContentEntry<'posts'>;
};

/**
 * 本文プレビューを生成する。
 * 最大文字数を超えた分は省略記号付きで切り詰める。
 * @param body 本文の文字列
 * @param maxLength プレビューの最大文字数。デフォルトは120文字。
 * @returns プレビュー用の文字列
 */
function createPreviewText(body: string, maxLength: number = 120) {
  const normalizedBody = body.replace(/\s+/g, ' ').trim();

  if (normalizedBody.length <= maxLength) {
    return normalizedBody;
  }

  return `${normalizedBody.slice(0, maxLength)}...`;
}

/**
 * 投稿エントリーをカード表示する。
 * カードには、タイトル、投稿者、投稿日、そして本文のプレビューが表示される。
 * カード全体が投稿の詳細ページへのリンクになっている。
 * @param entry 投稿エントリー。ContentEntryのうち、'posts'に特化した型を使用する。
 * @returns 投稿カードのJSX要素
 */
export default function ArticleCard({ entry }: Props) {
  const { slug, title, date, author } = entry.frontMatter;
  const previewText = createPreviewText(entry.body);

  return (
    <Link href={`/posts/${slug}`} className="block">
      <article className="cursor-pointer rounded-lg border p-4 transition hover:shadow-md">
        <div className="mb-2 flex flex-col gap-1 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <span>投稿者: {author}</span>
          <span>投稿日: {date}</span>
        </div>

        <h3 className="mb-2 text-xl font-semibold">{title}</h3>

        <p className="text-gray-700">{previewText}</p>
      </article>
    </Link>
  );
}
