import { CircleUserRound, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Employee } from "../models/employees.model";
import { store } from "../store/store";
import { DeleteEmployeeForm } from "./DeleteEmployeeForm";

type EmployeeCardProps = {
    employee: Employee;
};

export function EmployeeCard({ employee }: EmployeeCardProps) {
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
        <div className="group relative bg-bg-secondary border border-border-soft rounded-xl p-5 transition-all duration-300 hover:bg-bg-elevated hover:border-accent-primary/30 hover:shadow-lg hover:shadow-accent-primary/5">
            <Link
                className="flex flex-col items-center gap-3"
                to={`/admin/employees/${employee.id}`}
            >
                <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-bg-elevated flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors duration-300">
                        <CircleUserRound className="size-10 text-icon-active group-hover:text-accent-primary transition-colors duration-300" />
                    </div>
                </div>
                <div className="flex justify-center">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
                <span className="font-medium text-text-primary text-center leading-tight">
                    {employee.fullname}
                </span>
            </Link>
            <button
                className="absolute top-3 right-3 p-2 rounded-lg bg-transparent text-text-disabled opacity-0 group-hover:opacity-100 hover:bg-error/10 hover:text-error transition-all duration-200 cursor-pointer"
                onClick={handleClick}
                title="Elimina dipendente"
            >
                <Trash2 className="size-4" />
            </button>
        </div>
    );
}