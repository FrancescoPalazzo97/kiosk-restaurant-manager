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
                className="bg-sky-600 hover:bg-sky-400 rounded-md py-1 px-2 active:bg-sky-800"
            >
                {label}
            </NavLink>
        </li>
    )
}