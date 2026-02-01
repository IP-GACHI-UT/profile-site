import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

export type ContentKind = 'posts' | 'devlog';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isErrnoException(e: unknown): e is NodeJS.ErrnoException {
  return typeof e === 'object' && e !== null && 'code' in e;
}

export const frontMatterSchema = z.object({
  title: z.string().min(1),
  date: z.preprocess((v) => {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v;
}, z.string().min(1)),
  slug: z.string().regex(slugRegex),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)),
  draft: z.boolean(),
});

export type FrontMatter = z.infer<typeof frontMatterSchema>;

export type ContentEntry = {
  kind: ContentKind;
  filePath: string;
  frontMatter: FrontMatter;
  body: string;
};

const contentDir = (kind: ContentKind) =>
  path.join(process.cwd(), 'content', kind);

export async function listEntries(kind: ContentKind): Promise<ContentEntry[]> {
  const dir = contentDir(kind);
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.mdx'));

  const entries: ContentEntry[] = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);

    const fm = frontMatterSchema.parse(parsed.data);
    // ファイル名 = slug を強制（運用事故防止）
    const expected = `${fm.slug}.mdx`;
    if (file !== expected) {
      throw new Error(
        `[content] filename must match slug: file="${file}" expected="${expected}"`,
      );
    }

    entries.push({
      kind,
      filePath,
      frontMatter: fm,
      body: parsed.content,
    });
  }

  // date の降順に並べたいならここでソート（文字列前提の簡易）
  return entries.sort((a, b) => (a.frontMatter.date < b.frontMatter.date ? 1 : -1));
}

export async function getEntryBySlug(
  kind: ContentKind,
  slug: string,
): Promise<ContentEntry | null> {
  if (!slugRegex.test(slug)) return null;

  const filePath = path.join(contentDir(kind), `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);
    let fm: FrontMatter;
    try {
      fm = frontMatterSchema.parse(parsed.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`[content] invalid front matter: ${filePath}\n${msg}`);
    }

    // 二重安全（ファイル名と一致している前提）
    if (fm.slug !== slug) {
      throw new Error(`[content] frontmatter slug mismatch: ${fm.slug} != ${slug}`);
    }

    return { kind, filePath, frontMatter: fm, body: parsed.content };
  } catch (error: unknown) {
    if (isErrnoException(error) && error.code === 'ENOENT') return null;
    throw error;
  }
}
