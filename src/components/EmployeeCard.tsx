import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import type { Employee } from "../models/employees.model";
import { store } from "../store/store";

type EmployeeCardProps = {
    employee: Employee;
};

export function EmployeeCard({ employee }: EmployeeCardProps) {
    const deleteEmployee = store(s => s.deleteEmployee);

    const handleDelete = () => {
        if (confirm('Vuoi cancellare questo dipendente?')) {
            deleteEmployee(employee.id);
            console.log('Eliminazione confermata!');
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-2 p-4 w-50 h-50 border rounded-full shadow-sm mx-auto">
                <Link
                    className="flex flex-col items-center justify-center"
                    to={`/admin/employees/${employee.id}`}
                >
                    <CircleUserRound className="size-16 text-gray-200" />
                    <span className="font-medium">{employee.fullname}</span>
                </Link>
                <button
                    className="bg-red-600 border-black rounded-2xl py-1 px-2 cursor-pointer hover:bg-red-500"
                    onClick={handleDelete}
                >
                    Elimina
                </button>
            </div>
        </div>
    );
}