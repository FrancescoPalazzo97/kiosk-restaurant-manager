import { Outlet } from "react-router-dom";

export function AdminLayout() {
    return (
        <>
            <h2 className="text-xl font-medium">Admin layoy</h2>
            <Outlet />
        </>
    )
}