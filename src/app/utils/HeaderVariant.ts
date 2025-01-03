import { cva, type VariantProps } from "class-variance-authority";

export const headerVariants = cva(
  "w-full flex items-center justify-center", // Classes de base
  {
    variants: {
      variant: {
        default: "bg-background py-4 px-8",
        sticky:
          "sticky top-0 z-10 rounded-b-lg shadow-md dark:shadow-primary/40",
      },
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
      },
      nav: {
        default_nav: "flex items-center justify-between gap-6 max-w-[1440px]",
        center: "flex items-center justify-center gap-6",
        right: "flex items-center justify-end gap-6",
        left: "flex items-center justify-start gap-6",
        col: "flex flex-col items-center justify-start gap-6",
        reverse: "flex items-center justify-between flex-row-reverse",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type HeaderVariantProps = VariantProps<typeof headerLinkVariants>;

export const headerLinkVariants = cva(
  " cursor-pointer group relative flex items-center gap-2 rounded-lg text-foreground transition-colors duration-300 after:bg-primary after:transition-scale after:duration-300", // Classes de base
  {
    variants: {
      variant: {
        default: "hover:text-primary py-1 pl-2",
        active_default: "text-primary py-1 pl-2",
        background: "w-fit text-foreground hover:bg-primary/20 py-1 pl-2",
        active_background: "w-fit text-foreground/100 bg-primary/20 py-1 pl-2",
        highlight:
          "w-fit mx-2 hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:origin-center after:scale-0 hover:after:scale-100",
        active_highlight:
          "w-fit mx-2 text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px]",
      },
      size: {
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type HeaderLinkVariantProps = VariantProps<typeof headerLinkVariants>;
