import { NavLink } from "react-router-dom";
import { NavLinkList } from "./NavLinkList";

export function Nav() {
    return (
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <NavLink to='/kiosk'>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                    <span className="text-accent-primary">Kiosk</span> Restaurant Manager
                </h1>
            </NavLink>
            <NavLinkList />
        </nav>
    )
}