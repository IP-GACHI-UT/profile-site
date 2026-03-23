'use client';
import { useState } from 'react';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      author,
    };

    console.log('投稿データ', postData);

    alert('投稿しました！');
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
          <select
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
        <button type="submit" style={{ padding: '10px 20px' }}>
          投稿
        </button>
      </form>
    </>
  );
}
