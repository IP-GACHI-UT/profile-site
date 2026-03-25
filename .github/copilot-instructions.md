# GitHub Copilot Instructions

このリポジトリでコード提案を行う際は、必ず `AGENTS.md` の内容に従ってください。

## 最重要ルール

- コメント・補足説明・実装意図の解説は日本語で記述してください。
- コード提案時の説明文も日本語で記述してください。
- 既存の Next.js App Router 構成を維持してください。
- `pnpm` を使用してください。
- コンテンツ関連ロジックは `src/lib` に寄せてください。
- ページ専用コンポーネントは `src/app/_components` に配置してください。
- 共通コンポーネントは `src/app/components` に配置してください。
- コンテンツは `content/posts` または `content/devlog` に配置してください。
- front matter の整合性と slug / ファイル名の一致を必ず守ってください。
- 変更は小さく、レビューしやすい差分を優先してください。

## 変更時の確認

必要に応じて以下を前提にしてください。

- `pnpm lint`
- `pnpm typecheck`
- `pnpm content:check`

## 避けること

- create-next-app の初期値を残すこと
- サンプル用のテストや仮実装を本実装として固定すること
- 既存責務を崩す大きな構成変更を無断で行うこと
- 無関係な修正を同一変更に混ぜること
