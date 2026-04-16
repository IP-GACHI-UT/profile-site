type Props = {
  label?: string;
  title: string;
  description?: string;
};

export default function SectionLabel({ label, title, description }: Props) {
  return (
    <div className="space-y-3">
      {label ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
          {label}
        </p>
      ) : null}

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-base leading-7 text-gray-600">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
