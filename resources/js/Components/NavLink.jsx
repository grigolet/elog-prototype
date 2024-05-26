import { Link } from "@inertiajs/react";

export default function NavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      className={
        "inline-flex items-center px-1 pt-1 md:border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
        (active
          ? "text-foreground transition-colors hover:text-foreground"
          : "text-muted-foreground transition-colors hover:text-foreground") +
        className
      }
    >
      {children}
    </Link>
  );
}
