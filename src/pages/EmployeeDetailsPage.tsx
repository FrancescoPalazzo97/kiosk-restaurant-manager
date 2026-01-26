import { useParams } from "react-router-dom";
import { store } from "../store/store";

export function EmployeeDetailsPage() {
    const employees = store(s => s.employees);
    const updateFullname = store(s => s.updateFullname);
    const updatePinCode = store(s => s.updatePinCode);
    const { id } = useParams();

    const employee = employees.find(e => e.id === id);


    if (!employee) {
        return <p>404 | Employee Not Found</p>
    }

    const handleChangeName = () => {
        const newName = prompt('Inserisci nuovo nome');
        if (!newName?.trim()) {
            console.error('Nome non iserito!');
            return;
        }
        updateFullname(employee.id, newName);
    }

    const handleChangePinCode = () => {
        updatePinCode(employee.id);
    }

    return (
        <>
            <p>{employee.fullname}</p>
            <button onClick={handleChangeName}>Cambia nome</button>
            <p>{employee.pinCode}</p>
            <button onClick={handleChangePinCode}>Cambia PIN</button>
        </>
    )
}