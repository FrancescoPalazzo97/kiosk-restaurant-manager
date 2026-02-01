import { Trash2 } from "lucide-react";
import { store } from "../store/store";
import type { Employee } from "../models/employees.model";
import { DeleteEmployeeForm } from "./DeleteEmployeeForm";

type DangerZoneProps = {
    employee: Employee
}

export function DangerZone({ employee }: DangerZoneProps) {
    const openModal = store(s => s.openModal);

    const handleClick = () => {
        openModal(
            <DeleteEmployeeForm
                employeeId={employee.id}
                employeeFullname={employee.fullname}
            />,
            'Conferma eliminazione'
        )
    }

    return (
        <div className="bg-error/5 border border-error/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-error mb-2">Zona pericolosa</h3>
            <p className="text-text-secondary text-sm mb-4">
                Eliminando questo dipendente, tutti i suoi dati verranno persi permanentemente.
            </p>
            <button
                onClick={handleClick}
                className="inline-flex items-center gap-2 bg-error/10 hover:bg-error/20 text-error font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
                <Trash2 className="size-4" />
                Elimina dipendente
            </button>
        </div>
    )
}