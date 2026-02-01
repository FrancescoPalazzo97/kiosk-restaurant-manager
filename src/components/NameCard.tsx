import { Edit3 } from "lucide-react";
import { store } from "../store/store";
import type { Employee } from "../models/employees.model";

type NameCardProps = {
    employee: Employee
}

export function NameCard({ employee }: NameCardProps) {

    const updateFullname = store(s => s.updateFullname);

    const handleChangeName = () => {
        const newName = prompt('Inserisci nuovo nome', employee.fullname);
        if (!newName?.trim()) return;
        updateFullname(employee.id, newName);
    }

    return (
        <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-text-secondary">
                    <Edit3 className="size-4" />
                    <span className="text-sm font-medium uppercase tracking-wide">Nome</span>
                </div>
            </div>
            <p className="text-xl font-semibold text-text-primary mb-4">{employee.fullname}</p>
            <button
                onClick={handleChangeName}
                className="w-full inline-flex items-center justify-center gap-2 bg-bg-elevated hover:bg-border-soft text-text-primary font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
                <Edit3 className="size-4" />
                Modifica nome
            </button>
        </div>
    )
}