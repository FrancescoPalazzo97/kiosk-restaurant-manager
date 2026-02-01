import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Shield, LogOut } from "lucide-react";
import { store } from "../store/store";

export function AdminLayout() {
    const isAdminAuthenticated = store(s => s.isAdminAuthenticated);
    const logoutAdmin = store(s => s.logoutAdmin);
    const navigate = useNavigate();

    if (!isAdminAuthenticated) {
        return <Navigate to='/kiosk' />;
    }

    const handleLogout = () => {
        navigate('/kiosk');
        logoutAdmin();
    }

    return isAdminAuthenticated && (
        <div className="space-y-6">
            {/* Admin badge */}
            <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-secondary/10 border border-accent-secondary/30 rounded-full">
                    <Shield className="size-4 text-accent-secondary" />
                    <span className="text-sm font-medium text-accent-secondary">Modalità Admin</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-text-secondary hover:text-error hover:bg-error/10 rounded-lg transition-colors cursor-pointer"
                >
                    <LogOut className="size-4" />
                    <span className="text-sm font-medium">Esci</span>
                </button>
            </div>
            <Outlet />
        </div>
    )
}