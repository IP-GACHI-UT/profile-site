type Props = {
  category: string;
};

export default function CategoryBadge({ category }: Props) {
  return <span className="category-pill">{category}</span>;
}
