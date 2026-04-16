import Container from '../common/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-200 py-8">
      <Container className="flex flex-col gap-2 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <p>Copyright © {currentYear} Profile Site</p>
        <p>技術記事と開発ログをまとめて読めるプロフィールサイト</p>
      </Container>
    </footer>
  );
}
