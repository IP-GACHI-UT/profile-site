import { listEntries } from '../src/lib/content';

async function main() {
  const posts = await listEntries('posts');
  const devlog = await listEntries('devlog');
  const all = [...posts, ...devlog];

  // posts/devlog 横断で slug ユニーク
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
  const msg = err instanceof Error ? err.stack ?? err.message : String(err);
  console.error(msg);
  process.exit(1);
});
