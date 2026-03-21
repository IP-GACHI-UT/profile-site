import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  type = 'button',
}: Props) {
  const baseStyle = 'px-4 py-2 rounded-lg transition';

  const styles = {
    primary: 'bg-green-500 text-white hover:bg-green-600',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
  };

  const className = `${baseStyle} ${styles[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
