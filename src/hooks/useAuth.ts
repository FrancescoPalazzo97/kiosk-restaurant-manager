import { useNavigate } from "react-router-dom";
import { store } from "../store/store";
import { useState, type Dispatch, type SetStateAction } from "react";

type ReturnType = [(e: React.FormEvent<HTMLFormElement>) => void, boolean, Dispatch<SetStateAction<boolean>>];

export function useAuth(): ReturnType {
    const authenticateAdmin = store(s => s.authenticateAdmin);
    const close = store(s => s.closeModal);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputPassword: string = e.currentTarget.inputPassword.value;
        const success = authenticateAdmin(inputPassword);
        if (!success) {
            setError(true);
        } else {
            navigate('/admin/employees');
            close();
        }
    }

    return [handleSubmit, error, setError];
}