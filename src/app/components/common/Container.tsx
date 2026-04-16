import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return (
    <div className={clsx('mx-auto w-full max-w-6xl px-6', className)}>
      {children}
    </div>
  );
}
