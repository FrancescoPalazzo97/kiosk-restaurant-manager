import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import type { Employee } from "../models/employees.model";

type EmployeeCardProps = {
    employee: Employee;
};

export function EmployeeCard({ employee }: EmployeeCardProps) {
    return (
        <div>
            <Link to={`/admin/employees/${employee.id}`}>
                <div className="flex flex-col items-center justify-center gap-2 p-4 w-50 h-50 border rounded-full shadow-sm mx-auto">
                    <CircleUserRound className="size-16 text-gray-200" />
                    <span className="font-medium">{employee.fullname}</span>
                </div>
            </Link>
        </div>
    );
}