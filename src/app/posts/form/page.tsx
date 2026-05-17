import PostForm from '@/app/_components/PostForm';
import Container from '@/app/components/common/Container';

export default function PostFormPage() {
  return (
    <main className="py-12">
      <Container>
        <PostForm />
      </Container>
    </main>
  );
}
