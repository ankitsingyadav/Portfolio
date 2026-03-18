import FadeIn from "./FadeIn";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-14">
      <FadeIn>
        <span className="font-mono text-xs tracking-widest text-accent uppercase mb-3 block">
          {label}
        </span>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl font-body">
            {subtitle}
          </p>
        )}
      </FadeIn>
    </div>
  );
}
