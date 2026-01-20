import { Outlet } from "react-router-dom";

export function DefaultLayout() {
    return (
        <>
            <header>
                <h1 className="text-2xl font-bold text-center">Kiosk Restaurant Manager</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}