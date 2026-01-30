import { LinkElement } from "./LinkElement";
import { store } from "../store/store";

export function NavLinkList() {
    const isAdminAuthenticated = store(s => s.isAdminAuthenticated);

    return (
        <ul className="flex gap-2">
            <LinkElement path="/kiosk" label="Home" />
            <LinkElement path="/admin" label="Admin" />
            {isAdminAuthenticated &&
                <>
                    <LinkElement path="/admin/employees" label="Dipendenti" />
                    <LinkElement path="/admin/settings" label="Impostazioni" />
                    <LinkElement path="/admin/dashboard" label="Dashboard" />
                </>
            }
        </ul>
    )
}