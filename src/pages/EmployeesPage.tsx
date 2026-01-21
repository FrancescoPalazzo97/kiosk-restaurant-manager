import { store } from "../store/store";

export function EmployeesPage() {
    const employees = store((s) => s.employees);
    const addEmployee = store((s) => s.addEmployee);

    console.log("Render - employees:", employees);

    const handleAdd = () => {
        console.log("Before add:", employees);
        addEmployee("John Doe");
        console.log("After add:", employees);
    };

    return (
        <div>
            <h1>Employees</h1>
            <button onClick={handleAdd}>Add Employee</button>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>{employee.fullname}</li>
                ))}
            </ul>
        </div>
    );
}