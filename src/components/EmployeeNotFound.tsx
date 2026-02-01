import { BackLink } from "./BackLink";

export function EmployeeNotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl font-bold text-text-disabled mb-2">404</div>
            <p className="text-text-secondary mb-6">Dipendente non trovato</p>
            <BackLink />
        </div>
    )
}