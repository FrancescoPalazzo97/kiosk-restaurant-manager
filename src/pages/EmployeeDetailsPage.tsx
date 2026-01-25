import { useParams } from "react-router-dom";
import { store } from "../store/store";

export function EmployeeDetailsPage() {
    const employees = store(s => s.employees)
    const { id } = useParams();

    const employee = employees.find(e => e.id === id);

    if (!employee) {
        return (
            <p>404 | Employee Not Found</p>
        )
    }

    return (
        <>
            <p>{employee.fullname}</p>
            <p>{employee.pinCode}</p>
        </>
    )
}