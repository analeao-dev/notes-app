const badgeVariants = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    primary: 'bg-indigo-100 text-indigo-700',
    neutral: 'bg-gray-100 text-gray-700',
}
export type BadgeVariant = keyof typeof badgeVariants;

type BadgeProps = {
  children: React.ReactNode;
  variant: BadgeVariant;
};

console.log();

const Badge = ({ children, variant }: BadgeProps) => {
  const variantClasses = badgeVariants[variant] || badgeVariants.neutral;
  const baseClasses = "text-sm px-2.5 py-0.5 rounded-full font-semibold inline-block";

    return (
        <span className={`${baseClasses} ${variantClasses}`}>{children}</span>
    );
}

export default Badge;