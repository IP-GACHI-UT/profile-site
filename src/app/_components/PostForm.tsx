'use client';
import { Send } from 'lucide-react';
import { useState } from 'react';
import Button from '@/app/components/ui/Button';
import { listAuthorNames } from '@/lib/authors';
import { postCategoryValues } from '@/lib/post-categories';

/**
 *  投稿フォームコンポーネント
 * @returns JSX.Element
 * @description
 * - タイトル、本文、投稿者を入力するフォーム
 * - 入力内容をMDX形式に変換してAPIに送信
 * - バリデーションとエラーハンドリングを実装
 */
export default function PostForm() {
  const authorOptions = listAuthorNames();
  const categoryOptions = [...postCategoryValues];
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const canSubmit =
    title.trim().length > 0 &&
    author.length > 0 &&
    category.length > 0 &&
    content.trim().length > 0;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = 'タイトルは必須です';
    if (!author) newErrors.author = '投稿者を選択してください';
    if (!category) newErrors.category = 'カテゴリを選択してください';
    if (!content.trim()) newErrors.content = '本文は必須です';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
category: ${yamlQuote(category)}
draft: false
---

${content}
`;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validate() || !canSubmit) return;

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
      // リセット
      setTitle('');
      setAuthor('');
      setCategory('');
      setContent('');
      setErrors({});
    } catch (_error) {
      alert(
        '投稿に失敗しました。ネットワーク状態を確認して再度お試しください。',
      );
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-left mb-4 text-gray-900 dark:text-white">
          記事を書く
        </h1>
        <p className="text-left text-gray-600 dark:text-gray-300 mb-8">
          開発日記でも、ゲームレビューでも、好きなことを書いてOK
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* タイトル */}
          <div>
            <label
              htmlFor="post-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              タイトル
            </label>
            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="記事のタイトルを入力"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title}
              </p>
            )}
          </div>

          {/* 投稿者 */}
          <div>
            <label
              htmlFor="post-author"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              投稿者
            </label>
            <select
              id="post-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">選択してください</option>
              {authorOptions.map((authorOption) => (
                <option key={authorOption} value={authorOption}>
                  {authorOption}
                </option>
              ))}
            </select>
            {errors.author && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.author}
              </p>
            )}
          </div>

          {/* カテゴリ */}
          <div>
            <label
              htmlFor="post-category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              カテゴリ
            </label>
            <select
              id="post-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">選択してください</option>
              {categoryOptions.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.category}
              </p>
            )}
          </div>

          {/* 本文 */}
          <div>
            <label
              htmlFor="post-content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              本文
            </label>
            <textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="記事の本文を入力（MDX形式で書いてもOK）"
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.content}
              </p>
            )}
          </div>

          {/* 投稿ボタン */}
          <div className="flex justify-end">
            <Button
              icon={Send}
              type="submit"
              disabled={!canSubmit}
              variant="primary"
            >
              投稿する
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
