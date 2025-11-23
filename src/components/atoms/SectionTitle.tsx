interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-dark-gray dark:text-gray-100 text-xl font-bold leading-tight">
      {title}
    </h2>
  );
}