import { NavLinkList } from "./NavLinkList";

export function Nav() {
    return (
        <nav className="flex flex-col items-center gap-y-4">
            <h1 className="text-2xl font-bold text-center">Kiosk Restaurant Manager</h1>
            <NavLinkList />
        </nav>
    )
}