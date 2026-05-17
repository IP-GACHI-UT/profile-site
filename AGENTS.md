## 目的

このリポジトリは、技術記事・開発ログ・ゲーム関連の記事を掲載するためのプロフィールサイトです。
変更時は、既存アーキテクチャを維持しつつ、小さく安全な差分で実装してください。

## 言語ルール

- ソースコード内のコメントは日本語で記述してください。
- PR説明、変更理由、補足説明、レビュー用の解説は日本語で記述してください。
- AI がコードを提案する場合も、説明文は日本語で記述してください。
- 変数名・関数名・型名・ファイル名は、既存実装との整合性を優先し、必要に応じて英語を使用して構いません。
- UI表示文言はサイトの設計方針に合わせて決定してください。

## リポジトリ構成

- `src/app` : Next.js App Router のページ、レイアウト、ルート単位のUI
- `src/app/_components` : 特定ページ専用のコンポーネント
- `src/app/components` : アプリ全体で再利用する共通コンポーネント
- `src/lib` : コンテンツ取得・整形・ドメインロジック
- `content/posts` : 記事コンテンツ（MDX）
- `scripts/content-check.ts` : コンテンツ検証スクリプト
- `tests` : E2E テスト
- `.storybook` : Storybook 設定

## 技術スタック

- Next.js App Router
- TypeScript
- React
- MDX
- Biome
- Jest
- Playwright
- Storybook
- pnpm

## 使用コマンド

- install: `pnpm install`
- dev: `pnpm dev`
- lint: `pnpm lint`
- lint fix: `pnpm lint:fix`
- format: `pnpm format`
- typecheck: `pnpm typecheck`
- content check: `pnpm content:check`
- test: `pnpm test`
- e2e: `pnpm test:e2e`
- storybook: `pnpm storybook`

## コンテンツルール

すべてのコンテンツは `content/posts` に配置してください。

各 `.mdx` ファイルには以下の front matter を必須とします。

- `title`
- `date`
- `slug`
- `description`
- `tags`
- `draft`

ルール:

- ファイル名は `slug.mdx` と一致させる
- slug は lowercase の kebab-case
- slug を重複させない
- コンテンツ変更時は `pnpm content:check` を通す

## 実装ルール

- 既存構成を優先し、大きな構成変更は必要がない限り行わない
- Server Component を基本とし、`use client` は必要な場合のみ追加する
- データ取得・整形ロジックは `src/lib` に寄せる
- ページ専用UIは `src/app/_components` に置く
- 共通UIは `src/app/components` に置く
- 既存の命名規則・importスタイル・責務分離に合わせる
- モック実装を追加する場合も、将来の実データ連携を意識した構造にする
- 変更は最小限にとどめ、無関係な修正を混ぜない

## UI / プロダクト方針

- このサイトは管理画面ではなく、公開用のコンテンツサイトです
- 可読性、記事導線、一覧性を優先してください
- 新しい一覧UIや詳細UIは、コンテンツ構造に基づいて設計してください
- ハードコードされたダミー表示を恒久実装にしないでください
- ブランドやメタデータに関わる変更を行う場合は、関連ファイルも合わせて見直してください

## テスト・確認

変更箇所に応じて、以下を実施してください。

最低限:

- コード変更: `pnpm lint` と `pnpm typecheck`
- コンテンツ変更: `pnpm content:check`
- UI変更: `pnpm lint`、`pnpm typecheck`、必要に応じて Storybook の確認
- テスト変更: 既存のサンプルではなく、このリポジトリに合った内容へ更新する

## PR方針

PR 作成時・更新時は以下を日本語で記載してください。

- 目的
- 主な変更点
- 確認方法
- 影響範囲
- 未対応事項があればその内容

## 禁止事項

- 触った箇所に create-next-app の初期値や placeholder を残さない
- 外部サイト向けのサンプルテストを、そのまま正式なテストとして残さない
- slug とファイル名の整合性を崩さない
- UIコンポーネント内にコンテンツルールを過度に埋め込まない
- 明確な目的なく大規模リファクタリングを行わない
