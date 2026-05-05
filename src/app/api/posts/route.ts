import fs from 'node:fs/promises';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const createPostRequestSchema = z.object({
  slug: z.string().regex(slugRegex),
  mdx: z.string().min(1),
});

export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  // 本番環境ではコンテンツ書き込みAPIを無効化（注入・任意ファイル書き込み対策）
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 404 });
  }

  let body: z.infer<typeof createPostRequestSchema>;
  try {
    body = createPostRequestSchema.parse(await req.json());
  } catch (_error: unknown) {
    return NextResponse.json(
      { message: 'リクエスト内容が不正です' },
      { status: 400 },
    );
  }

  const fileName = `${body.slug}.mdx`;
  const filePath = path.join(process.cwd(), 'content/posts', fileName);

  await fs.writeFile(filePath, body.mdx, 'utf8');

  return NextResponse.json({ message: '保存成功' });
}
