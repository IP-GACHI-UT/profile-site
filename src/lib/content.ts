import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

// コンテンツの種類を表す型で、'posts'と'devlog'のどちらかになる。
export type ContentKind = 'posts' | 'devlog';

// スラッグの正規表現。小文字の英数字とハイフンのみを許可し、ハイフンは連続して使用できない。
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Node.jsのエラーオブジェクトかどうかを判定する。
 * @param e 判定する値
 * @returns NodeJS.ErrnoExceptionであればtrue、それ以外はfalse
 */
function isErrnoException(e: unknown): e is NodeJS.ErrnoException {
  return typeof e === 'object' && e !== null && 'code' in e;
}

/**
 * 日付の値を正規化する。DateオブジェクトであればISO形式の文字列に変換する。
 * @param value 正規化する値
 * @returns 正規化された日付文字列または元の値
 */
function normalizeDateValue(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

// コンテンツのフロントマターの基本的なスキーマを定義する。
// タイトル、日付、スラッグ、説明、タグ、ドラフト状態を含む。
const baseFrontMatterSchema = z.object({
  title: z.string().min(1),
  date: z.preprocess(normalizeDateValue, z.string().min(1)),
  slug: z.string().regex(slugRegex),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)),
  draft: z.boolean(),
});

/**
 * 投稿コンテンツのフロントマターのスキーマを定義する。
 * 基本的なフロントマターに加えて、著者フィールドを必須とする。
 */
export const postFrontMatterSchema = baseFrontMatterSchema.extend({
  author: z.string().min(1),
});

/**
 * 開発ログコンテンツのフロントマターのスキーマを定義する。
 * 基本的なフロントマターのみを使用し、追加のフィールドは必要ない。
 */
export const devlogFrontMatterSchema = baseFrontMatterSchema;

/**
 * コンテンツの種類ごとにフロントマターの型を定義する。
 * 'posts'はPostFrontMatter、'devlog'はDevlogFrontMatterを使用する。
 */
type FrontMatterByKind = {
  posts: z.infer<typeof postFrontMatterSchema>;
  devlog: z.infer<typeof devlogFrontMatterSchema>;
};

// コンテンツの種類に応じたフロントマターの型を定義する。
export type PostFrontMatter = FrontMatterByKind['posts'];

// 開発ログのフロントマターの型を定義する。
export type DevlogFrontMatter = FrontMatterByKind['devlog'];

// コンテンツのフロントマターの型を定義する。ContentKindに応じたフロントマターの型になる。
export type FrontMatter = FrontMatterByKind[ContentKind];

/**
 * コンテンツエントリーの型を定義する。
 * ContentKindに応じたフロントマターの型を持ち、ファイルパスと本文も含む。
 * @template K コンテンツの種類。ContentKindのいずれか。
 */
export type ContentEntry<K extends ContentKind = ContentKind> = {
  kind: K;
  filePath: string;
  frontMatter: FrontMatterByKind[K];
  body: string;
};

/**
 * コンテンツの種類ごとにフロントマターのスキーマを定義するオブジェクト。
 */
const frontMatterSchemaByKind = {
  posts: postFrontMatterSchema,
  devlog: devlogFrontMatterSchema,
} satisfies {
  [K in ContentKind]: z.ZodType<FrontMatterByKind[K]>;
};

// コンテンツディレクトリのパスを取得する関数。
const contentDir = (kind: ContentKind) =>
  path.join(process.cwd(), 'content', kind);

/**
 * 指定されたコンテンツの種類に応じたエントリーの一覧を取得する。
 * @param kind コンテンツの種類
 * @returns コンテンツエントリーの配列
 */
export async function listEntries<K extends ContentKind>(
  kind: K,
): Promise<ContentEntry<K>[]> {
  const dir = contentDir(kind);
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.mdx'));

  const entries: ContentEntry<K>[] = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);

    const fm = frontMatterSchemaByKind[kind].parse(
      parsed.data,
    ) as FrontMatterByKind[K];

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

  return entries.sort((a, b) =>
    a.frontMatter.date < b.frontMatter.date ? 1 : -1,
  );
}

/**
 * 指定されたスラッグに対応するコンテンツエントリーを取得する。
 * @param kind コンテンツの種類
 * @param slug コンテンツのスラッグ
 * @returns コンテンツエントリーまたはnull
 */
export async function getEntryBySlug<K extends ContentKind>(
  kind: K,
  slug: string,
): Promise<ContentEntry<K> | null> {
  if (!slugRegex.test(slug)) {
    return null;
  }

  const filePath = path.join(contentDir(kind), `${slug}.mdx`);

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);

    let fm: FrontMatterByKind[K];
    try {
      fm = frontMatterSchemaByKind[kind].parse(
        parsed.data,
      ) as FrontMatterByKind[K];
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(`[content] invalid front matter: ${filePath}\n${msg}`);
    }

    if (fm.slug !== slug) {
      throw new Error(
        `[content] frontmatter slug mismatch: ${fm.slug} != ${slug}`,
      );
    }

    return {
      kind,
      filePath,
      frontMatter: fm,
      body: parsed.content,
    };
  } catch (error: unknown) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}
