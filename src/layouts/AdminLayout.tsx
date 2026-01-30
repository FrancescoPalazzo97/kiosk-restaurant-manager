import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Shield, LogOut } from "lucide-react";
import { store } from "../store/store";

export function AdminLayout() {
    const isAdminAuthenticated = store(s => s.isAdminAuthenticated);
    const authenticateAdmin = store(s => s.authenticateAdmin);
    const logoutAdmin = store(s => s.logoutAdmin);
    const navigate = useNavigate();
    const [authState, setAuthState] = useState<'pending' | 'failed' | 'success'>(
        isAdminAuthenticated ? 'success' : 'pending'
    );

    useEffect(() => {
        if (isAdminAuthenticated) {
            setAuthState('success');
            return;
        }

        if (authState === 'pending') {
            const inputPassword = prompt('Inserisci la password Admin');
            if (authenticateAdmin(inputPassword)) {
                setAuthState('success');
                navigate('/admin/employees');
            } else {
                alert("Password sbagliata!");
                setAuthState('failed');
            }
        }
    }, [isAdminAuthenticated, authState, authenticateAdmin, navigate]);

    if (authState === 'failed') {
        return <Navigate to='/kiosk' />;
    }

    if (authState === 'pending') {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Admin badge */}
            <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-secondary/10 border border-accent-secondary/30 rounded-full">
                    <Shield className="size-4 text-accent-secondary" />
                    <span className="text-sm font-medium text-accent-secondary">Modalità Admin</span>
                </div>
                <button
                    onClick={logoutAdmin}
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