import Container from '../common/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-background py-8">
      <Container className="flex flex-col gap-2 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <p>Copyright © {currentYear} GtoWell</p>
        <p>ゲームと開発の知見を共有するコンテンツサイト</p>
      </Container>
    </footer>
  );
}
