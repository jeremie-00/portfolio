interface CardProps {
  children: React.ReactNode;
  theme?: string;
  size?: string;
  className?: string;
}

export const Card = (props: CardProps) => {
  const { children, theme, className, size } = props;

  const baseClasse = "card p-6 max-w-[600px]";

  const themeClasses =
    theme === "primary"
      ? "bg-primary hover:bg-primary/80 border border-border hover:border-border/50"
      : theme === "secondary"
      ? "bg-section border border-border hover:border-primary/20 shadow-md "
      : theme === "outline"
      ? "bg-background hover:bg-background/80 border border-border hover:border-border/50"
      : "";

  const sizeClasses =
    size === "sm"
      ? "text-[1rem] px-2 py-2"
      : size === "md"
      ? "text-[1.25rem] px-4 py-2"
      : size === "lg"
      ? "text-[1.5rem] px-4 py-2"
      : size === "xl"
      ? "text-[1.75rem] px-4 py-2"
      : size === "xxl"
      ? "text-[2rem] px-4 py-2"
      : "";

  const renderCard = () => {
    return (
      <div
        className={`${baseClasse} ${themeClasses} ${sizeClasses} ${className}`}
      >
        {children}
      </div>
    );
  };

  return renderCard();
};
