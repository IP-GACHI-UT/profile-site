'use client';
import { useState } from 'react';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const canSubmit =
    title.trim().length > 0 && content.trim().length > 0 && author.length > 0;

  const yamlQuote = (value: string) => JSON.stringify(value);

  // MDXファイルを作成する
  const createMDX = (slug: string) => {
    return `---
title: ${yamlQuote(title)}
date: ${yamlQuote(new Date().toISOString().slice(0, 10))}
slug: ${yamlQuote(slug)}
description: ${yamlQuote('投稿フォームから作成')}
tags: []
author: ${yamlQuote(author)}
draft: false
---

${content}
`;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const slug = Date.now().toString();
    const mdxContent = createMDX(slug);

    try {
      // APIに送信
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ mdx: mdxContent, slug }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        alert('投稿に失敗しました。時間をおいて再度お試しください。');
        return;
      }

      alert('投稿しました！');
    } catch (_error) {
      alert(
        '投稿に失敗しました。ネットワーク状態を確認して再度お試しください。',
      );
    }
  };

  return (
    <>
      <div>
        <h1>投稿ページ</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        {/* タイトル */}
        <div>
          <label htmlFor="post-title">タイトル</label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル入力"
            style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
          />
        </div>

        {/* 本文 */}
        <div>
          <label htmlFor="post-content">本文</label>
          <textarea
            id="post-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="本文を入力"
            rows={5}
            style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
          />
        </div>

        {/* 投稿者 */}
        <div>
          <label htmlFor="post-author">投稿者</label>
          <select
            id="post-author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
          >
            <option value="">選択してください</option>
            <option value="user1">ユーザー1</option>
            <option value="user2">ユーザー2</option>
          </select>
        </div>

        {/* 投稿ボタン */}
        <button
          type="submit"
          disabled={!canSubmit}
          style={{ padding: '10px 20px' }}
        >
          投稿
        </button>
      </form>
    </>
  );
}
