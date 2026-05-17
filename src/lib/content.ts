import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import { postCategoryValues } from '@/lib/post-categories';
import { isValidSlug, slugRegex } from '@/lib/slug';

const postsDir = path.join(process.cwd(), 'content', 'posts');

const baseFrontMatterSchema = z.object({
  title: z.string().min(1),
  date: z.preprocess(normalizeDateValue, z.string().min(1)),
  slug: z.string().regex(slugRegex),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)),
  draft: z.boolean(),
});

export const postFrontMatterSchema = baseFrontMatterSchema.extend({
  author: z.string().min(1),
  category: z.enum(postCategoryValues),
});

export type PostFrontMatter = z.infer<typeof postFrontMatterSchema>;

export type PostEntry = {
  kind: 'posts';
  filePath: string;
  frontMatter: PostFrontMatter;
  body: string;
};

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === 'object' && error !== null && 'code' in error;
}

function normalizeDateValue(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

export function parsePostFrontMatter(data: unknown): PostFrontMatter {
  return postFrontMatterSchema.parse(data);
}

export async function readPostFile(filePath: string): Promise<PostEntry> {
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = matter(raw);

  let frontMatter: PostFrontMatter;
  try {
    frontMatter = parsePostFrontMatter(parsed.data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[content] invalid post front matter: ${filePath}\n${message}`,
    );
  }

  return {
    kind: 'posts',
    filePath,
    frontMatter,
    body: parsed.content,
  };
}

export async function listPosts(): Promise<PostEntry[]> {
  const files = (await fs.readdir(postsDir)).filter((file) =>
    file.endsWith('.mdx'),
  );

  const posts: PostEntry[] = [];

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const post = await readPostFile(filePath);
    const expectedFileName = `${post.frontMatter.slug}.mdx`;

    if (file !== expectedFileName) {
      throw new Error(
        `[content] filename must match slug: file="${file}" expected="${expectedFileName}"`,
      );
    }

    posts.push(post);
  }

  return posts.sort((a, b) =>
    a.frontMatter.date < b.frontMatter.date ? 1 : -1,
  );
}

export async function listPublishedPosts(): Promise<PostEntry[]> {
  const posts = await listPosts();

  return posts.filter((post) => !post.frontMatter.draft);
}

export async function getAdjacentPosts(slug: string): Promise<{
  newerPost: PostEntry | null;
  olderPost: PostEntry | null;
}> {
  const posts = await listPublishedPosts();
  const currentIndex = posts.findIndex(
    (post) => post.frontMatter.slug === slug,
  );

  return {
    newerPost: currentIndex > 0 ? posts[currentIndex - 1] : null,
    olderPost:
      currentIndex >= 0 && currentIndex < posts.length - 1
        ? posts[currentIndex + 1]
        : null,
  };
}

export async function getPostBySlug(slug: string): Promise<PostEntry | null> {
  if (!isValidSlug(slug)) {
    return null;
  }

  const filePath = path.join(postsDir, `${slug}.mdx`);

  try {
    const post = await readPostFile(filePath);

    if (post.frontMatter.slug !== slug) {
      throw new Error(
        `[content] frontmatter slug mismatch: ${post.frontMatter.slug} != ${slug}`,
      );
    }

    return post;
  } catch (error: unknown) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

export function shouldHideDraft(
  entry: Pick<PostEntry, 'frontMatter'>,
): boolean {
  return process.env.NODE_ENV === 'production' && entry.frontMatter.draft;
}
