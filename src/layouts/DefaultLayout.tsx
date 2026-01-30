import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";

export function DefaultLayout() {
    return (
        <>
            <header>
                <Nav />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}