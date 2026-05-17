type Props = {
  label?: string;
  title: string;
  description?: string;
  headingLevel?: 1 | 2;
};

export default function SectionLabel({
  label,
  title,
  description,
  headingLevel = 1,
}: Props) {
  const Heading = headingLevel === 2 ? 'h2' : 'h1';

  return (
    <header>
      {label ? <p className="section-label">{label}</p> : null}

      <div className="space-y-2">
        <Heading className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {title}
        </Heading>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
