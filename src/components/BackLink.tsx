import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function BackLink() {
    return (
        <Link
            to="/admin/employees"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors"
        >
            <ArrowLeft className="size-4" />
            Torna alla lista dipendenti
        </Link>
    )
}