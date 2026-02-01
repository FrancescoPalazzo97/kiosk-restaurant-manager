import { useNavigate } from "react-router-dom";
import { AlertTriangle, Trash2 } from "lucide-react";
import { store } from "../store/store";

type DeleteEmployeeFormProps = {
    employeeFullname: string
    employeeId: string
}

export function DeleteEmployeeForm({ employeeFullname, employeeId }: DeleteEmployeeFormProps) {
    const deleteEmployee = store(s => s.deleteEmployee);
    const navigate = useNavigate();
    const close = store(s => s.closeModal);

    const handleDelete = () => {
        deleteEmployee(employeeId);
        navigate('/admin/employees');
        close();
    }

    return (
        <div className="space-y-5">
            <div className="flex items-start gap-3 p-4 bg-error/5 border border-error/20 rounded-lg">
                <AlertTriangle className="size-5 text-error shrink-0 mt-0.5" />
                <p className="text-text-secondary">
                    Sei sicuro di voler eliminare <span className="font-semibold text-text-primary">{employeeFullname}</span>? Questa azione è irreversibile.
                </p>
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
                    type="button"
                    onClick={handleDelete}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium bg-error/10 hover:bg-error/20 text-error transition-colors cursor-pointer"
                >
                    <Trash2 className="size-4" />
                    Elimina
                </button>
            </div>
        </div>
    )
}