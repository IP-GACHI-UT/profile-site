'use client';

import Link from 'next/link';

type Props = {
  icon?: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export default function Button({
  icon: Icon,
  children,
  onClick,
  href,
  variant = 'primary',
  type = 'button',
  disabled = false,
}: Props) {
  const baseStyle = 'flex items-center gap-2 px-4 py-2 rounded-lg transition';

  const styles = {
    primary: 'bg-green-500 text-white hover:bg-green-600',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
  };

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const className = `${baseStyle} ${styles[variant]} ${disabledStyle}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
