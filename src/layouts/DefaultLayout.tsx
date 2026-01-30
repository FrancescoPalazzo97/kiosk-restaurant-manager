import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Modal } from "../components/Modal";

export function DefaultLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-bg-secondary border-b border-border-soft sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Nav />
                </div>
            </header>
            <Modal />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    )
}