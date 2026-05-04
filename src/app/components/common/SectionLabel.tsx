type Props = {
  label?: string;
  title: string;
  description?: string;
};

export default function SectionLabel({ label, title, description }: Props) {
  return (
    <div className="space-y-3 border-l-2 border-accent pl-4">
      {label ? <p className="section-label">{label}</p> : null}

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
