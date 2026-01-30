import { NavLink } from "react-router-dom";

type LinkElementProps = {
    path: string,
    label: string
}

export function LinkElement({ path, label }: LinkElementProps) {
    return (
        <li>
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        isActive
                            ? "bg-accent-primary text-bg-primary shadow-lg shadow-accent-primary/25"
                            : "bg-bg-elevated text-text-secondary hover:bg-border-soft hover:text-text-primary"
                    }`
                }
            >
                {label}
            </NavLink>
        </li>
    )
}