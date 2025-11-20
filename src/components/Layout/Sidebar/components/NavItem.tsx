import { Link } from "@tanstack/react-router";

export function NavItem({ label, to }: { label: string; to: string }) {
    return (
      <li>
        <Link
          to={to}
          className="
            block px-3 py-2
            rounded-md
            text-white
            hover:bg-white/10
            transition-colors
          "
          activeProps={{
            className: "bg-white/20 font-semibold",
          }}
        >
          {label}
        </Link>
      </li>
    );
  }