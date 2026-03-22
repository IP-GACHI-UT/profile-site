import Link from 'next/link';
import type { ContentEntry } from '@/lib/content';

export default function ArticleCard({ entry }: { entry: ContentEntry }) {
  const { slug, title, description } = entry.frontMatter;

  return (
    <Link href={`/posts/${slug}`}>
      <div className="border p-4 rounded-lg cursor-pointer">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
