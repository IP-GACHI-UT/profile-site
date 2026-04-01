import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  // 本番環境ではコンテンツ書き込みAPIを無効化（注入・任意ファイル書き込み対策）
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 404 });
  }

  const { mdx, slug } = await req.json();
  const safeSlug = typeof slug === 'string' ? slug : '';
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(safeSlug)) {
    return NextResponse.json({ message: 'slugが不正です' }, { status: 400 });
  }

  const fileName = `${safeSlug}.mdx`;
  const filePath = path.join(process.cwd(), 'content/posts', fileName);

  fs.writeFileSync(filePath, mdx);

  return NextResponse.json({ message: '保存成功' });
}
