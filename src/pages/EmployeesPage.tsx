import { useRef } from "react";
import { store } from "../store/store";
import { EmployeeCard } from "../components/EmployeeCard";

export function EmployeesPage() {
    const employees = store(s => s.employees);
    const addEmployee = store(s => s.addEmployee);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleAdd = () => {
        if (!inputRef.current) {
            console.error('InputRef is NULL');
        } else {
            addEmployee(inputRef.current.value);
            inputRef.current.value = "";
        }
    };

    return (
        <div>
            <h1 className="text-xl font-medium uppercase text-center mb-2">Employees List</h1>
            <div className="flex flex-col gap-1.5 w-1/2 mx-auto">
                <input
                    type="text"
                    className="border rounded-md px-2 py-1"
                    ref={inputRef}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button
                    onClick={handleAdd}
                    className="border border-gray-600 rounded-md bg-blue-500 hover:bg-blue-400 cursor-pointer text-white px-2 py-1"
                >
                    Add Employee
                </button>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-y-4 mt-4 mx-2">
                {employees.map((employee) => (
                    <li key={employee.id}>
                        <EmployeeCard employee={employee} />
                    </li>
                ))}
            </ul>
        </div>
    );
}