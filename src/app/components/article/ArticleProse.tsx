import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ArticleProse({ children, className }: Props) {
  return <div className={clsx('article-content', className)}>{children}</div>;
}
