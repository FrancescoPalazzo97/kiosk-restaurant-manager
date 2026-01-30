import { LinkElement } from "./LinkElement";
import { store } from "../store/store";
import { AdminPasswordForm } from "./AdminPasswordForm";

export function NavLinkList() {
    const isAdminAuthenticated = store(s => s.isAdminAuthenticated);
    const openModal = store(s => s.openModal);

    return (
        <ul className="flex flex-wrap gap-2 sm:gap-3">
            {!isAdminAuthenticated ?
                <button
                    className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-accent-primary text-bg-primary shadow-lg shadow-accent-primary/25"
                    onClick={() => openModal(<AdminPasswordForm />, "Login Admin")}
                >
                    Admin Mode
                </button>
                :
                <>
                    <LinkElement path="/admin/employees" label="Dipendenti" />
                    <LinkElement path="/admin/settings" label="Impostazioni" />
                    <LinkElement path="/admin/dashboard" label="Dashboard" />
                </>
            }
        </ul>
    )
}