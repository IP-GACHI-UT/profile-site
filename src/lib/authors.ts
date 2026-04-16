export type AuthorProfile = {
  name: string;
  role: string;
  bio: string;
  site?: string;
};

const authorProfiles: Record<string, AuthorProfile> = {
  VIVY: {
    name: 'VIVY',
    role: 'プロフィールサイト運営者',
    bio: 'Web フロントエンドを中心に、作ったものと学んだことを継続的に記録しています。',
    site: '/',
  },
};

const fallbackRole = 'Contributor';
const fallbackBio = '著者プロフィールはまだ登録されていません。';

export function listAuthorNames() {
  return Object.keys(authorProfiles);
}

export function getAuthorByName(name: string): AuthorProfile {
  return (
    authorProfiles[name] ?? {
      name,
      role: fallbackRole,
      bio: fallbackBio,
    }
  );
}
