import { listEntries } from '../src/lib/content';

async function main() {
  const posts = await listEntries('posts');
  const devlog = await listEntries('devlog');

  const all = [...posts, ...devlog];

  // posts/devlog 横断でslugユニーク
  const seen = new Map<string, string>();
  for (const e of all) {
    const s = e.frontMatter.slug;
    const prev = seen.get(s);
    if (prev) {
      throw new Error(`[content-check] duplicate slug: "${s}"\n- ${prev}\n- ${e.filePath}`);
    }
    seen.set(s, e.filePath);
  }

  console.log(`[content-check] OK entries=${all.length}`);
}

main().catch((e) => {
  console.error(String(e?.stack ?? e));
  process.exit(1);
});
