import { useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { store } from "../store/store";

export function AdminLayout() {
    const isAdminAuthenticated = store(s => s.isAdminAuthenticated);
    const authenticateAdmin = store(s => s.authenticateAdmin);
    const hasPrompted = useRef(false);
    const hasAlerted = useRef(false);

    if (!isAdminAuthenticated) {
        if (!hasPrompted.current) {
            hasPrompted.current = true;
            const inputPassword = prompt('Inserisci la password Admin');
            if (authenticateAdmin(inputPassword)) {
                return null;
            }
        }
        if (!hasAlerted.current) {
            hasAlerted.current = true;
            alert("Password sbagliata!");
        }
        return <Navigate to='/kiosk' />;
    }

    return (
        <>
            <h2 className="text-xl font-medium">Admin layout</h2>
            <Outlet />
        </>
    )
}