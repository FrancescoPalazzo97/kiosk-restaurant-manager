import type React from "react"
import { useState } from "react";
import { KeyRound, LogIn } from "lucide-react";
import { store } from "../store/store";
import { useNavigate } from "react-router-dom";

export function AdminPasswordForm() {
    const authenticateAdmin = store(s => s.authenticateAdmin);
    const close = store(s => s.closeModal);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputPassword: string = e.currentTarget.inputPassword.value;
        const success = authenticateAdmin(inputPassword);
        if (!success) {
            setError(true);
        } else {
            navigate('/admin/employees');
            close();
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                    <KeyRound className="size-4" />
                    Password Admin
                </label>
                <input
                    name="inputPassword"
                    type="password"
                    autoFocus
                    placeholder="Inserisci la password..."
                    className={`w-full bg-bg-secondary border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:ring-1 transition-colors ${
                        error
                            ? "border-error focus:border-error focus:ring-error"
                            : "border-border-soft focus:border-accent-primary focus:ring-accent-primary"
                    }`}
                    onChange={() => error && setError(false)}
                />
                {error && (
                    <p className="text-sm text-error">Password non corretta</p>
                )}
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={close}
                    className="flex-1 px-4 py-2.5 rounded-lg font-medium text-text-secondary bg-bg-secondary hover:bg-border-soft transition-colors cursor-pointer"
                >
                    Annulla
                </button>
                <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium bg-accent-primary hover:bg-accent-hover text-bg-primary transition-colors cursor-pointer"
                >
                    <LogIn className="size-4" />
                    Accedi
                </button>
            </div>
        </form>
    )
}