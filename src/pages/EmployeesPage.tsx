import { useRef } from "react";
import { store } from "../store/store";

export function EmployeesPage() {
    const employees = store((s) => s.employees);
    const addEmployee = store((s) => s.addEmployee);

    const inputRef = useRef<HTMLInputElement | null>(null);

    console.log("Render - employees:", employees);

    const handleAdd = () => {
        if (!inputRef.current) {
            console.error('InputRef is NULL');
        } else {
            const fullname = inputRef.current.value;
            console.log("Before add:", employees);
            addEmployee(fullname);
            console.log("After add:", employees);
        }
    };

    return (
        <div>
            <h1 className="text-xl font-medium uppercase">Employees</h1>
            <input type="text" className="border rounded-md" ref={inputRef} />
            <button onClick={handleAdd}>Add Employee</button>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>{employee.fullname}</li>
                ))}
            </ul>
        </div>
    );
}