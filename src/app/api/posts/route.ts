import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
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
