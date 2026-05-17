import { listPosts } from '../src/lib/content';

async function main() {
  const all = await listPosts();

  // 記事コンテンツ内で slug を一意に保つ
  const seen = new Map<string, string>();
  for (const e of all) {
    const slug = e.frontMatter.slug;
    const prev = seen.get(slug);
    if (prev) {
      throw new Error(
        `[content-check] duplicate slug: "${slug}"\n- ${prev}\n- ${e.filePath}`,
      );
    }
    seen.set(slug, e.filePath);
  }

  console.log(`[content-check] OK entries=${all.length}`);
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? (err.stack ?? err.message) : String(err);
  console.error(msg);
  process.exit(1);
});
