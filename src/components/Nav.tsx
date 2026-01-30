import { NavLinkList } from "./NavLinkList";

export function Nav() {
    return (
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                <span className="text-accent-primary">Kiosk</span> Restaurant Manager
            </h1>
            <NavLinkList />
        </nav>
    )
}