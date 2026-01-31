import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, CircleUserRound, Edit3, KeyRound, RefreshCw, Trash2 } from "lucide-react";
import { store } from "../store/store";
import { AttendanceCalendar } from "../components/AttendanceCalendar";

export function EmployeeDetailsPage() {
    const employees = store(s => s.employees);
    const updateFullname = store(s => s.updateFullname);
    const updatePinCode = store(s => s.updatePinCode);
    const deleteEmployee = store(s => s.deleteEmployee);
    const { id } = useParams();
    const navigate = useNavigate();

    const employee = employees.find(e => e.id === id);

    if (!employee) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="text-6xl font-bold text-text-disabled mb-2">404</div>
                <p className="text-text-secondary mb-6">Dipendente non trovato</p>
                <Link
                    to="/admin/employees"
                    className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-hover transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Torna alla lista
                </Link>
            </div>
        )
    }

    const handleChangeName = () => {
        const newName = prompt('Inserisci nuovo nome', employee.fullname);
        if (!newName?.trim()) return;
        updateFullname(employee.id, newName);
    }

    const handleChangePinCode = () => {
        updatePinCode(employee.id);
    }

    const handleDelete = () => {
        if (confirm(`Vuoi eliminare ${employee.fullname}?`)) {
            deleteEmployee(employee.id);
            navigate('/admin/employees');
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Back link */}
            <Link
                to="/admin/employees"
                className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors"
            >
                <ArrowLeft className="size-4" />
                Torna alla lista dipendenti
            </Link>

            {/* Profile header */}
            <div className="bg-bg-secondary border border-border-soft rounded-xl p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-bg-elevated flex items-center justify-center">
                        <CircleUserRound className="size-14 text-icon-active" />
                    </div>
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-text-primary">{employee.fullname}</h1>
                        <p className="text-text-secondary mt-1">ID: {employee.id.slice(0, 8)}...</p>
                    </div>
                </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome card */}
                <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-text-secondary">
                            <Edit3 className="size-4" />
                            <span className="text-sm font-medium uppercase tracking-wide">Nome</span>
                        </div>
                    </div>
                    <p className="text-xl font-semibold text-text-primary mb-4">{employee.fullname}</p>
                    <button
                        onClick={handleChangeName}
                        className="w-full inline-flex items-center justify-center gap-2 bg-bg-elevated hover:bg-border-soft text-text-primary font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                        <Edit3 className="size-4" />
                        Modifica nome
                    </button>
                </div>

                {/* PIN card */}
                <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-text-secondary">
                            <KeyRound className="size-4" />
                            <span className="text-sm font-medium uppercase tracking-wide">PIN Code</span>
                        </div>
                    </div>
                    <p className="text-xl font-mono font-semibold text-accent-primary mb-4 tracking-widest">
                        {employee.pinCode}
                    </p>
                    <button
                        onClick={handleChangePinCode}
                        className="w-full inline-flex items-center justify-center gap-2 bg-bg-elevated hover:bg-border-soft text-text-primary font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                        <RefreshCw className="size-4" />
                        Genera nuovo PIN
                    </button>
                </div>
            </div>

            {/* Attendance Calendar */}
            <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
                <div className="flex items-center gap-2 text-text-secondary mb-4">
                    <Calendar className="size-4" />
                    <span className="text-sm font-medium uppercase tracking-wide">Presenze</span>
                </div>
                <AttendanceCalendar employee={employee} />
            </div>

            {/* Danger zone */}
            <div className="bg-error/5 border border-error/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-error mb-2">Zona pericolosa</h3>
                <p className="text-text-secondary text-sm mb-4">
                    Eliminando questo dipendente, tutti i suoi dati verranno persi permanentemente.
                </p>
                <button
                    onClick={handleDelete}
                    className="inline-flex items-center gap-2 bg-error/10 hover:bg-error/20 text-error font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                    <Trash2 className="size-4" />
                    Elimina dipendente
                </button>
            </div>
        </div>
    )
}