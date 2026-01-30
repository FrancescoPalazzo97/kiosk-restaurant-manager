import { useRef } from "react";
import { UserPlus, Users } from "lucide-react";
import { store } from "../store/store";
import { EmployeeCard } from "../components/EmployeeCard";

export function EmployeesPage() {
    const employees = store(s => s.employees);
    const addEmployee = store(s => s.addEmployee);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleAdd = () => {
        const name = inputRef.current?.value.trim();
        if (!name) return;

        addEmployee(name);
        inputRef.current!.value = '';
    };

    return (
        <div className="space-y-8">
            {/* Header sezione */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-primary/10">
                    <Users className="size-6 text-accent-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Dipendenti</h1>
                    <p className="text-sm text-text-secondary">
                        {employees.length} {employees.length === 1 ? 'dipendente' : 'dipendenti'} registrati
                    </p>
                </div>
            </div>

            {/* Form aggiunta */}
            <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Aggiungi nuovo dipendente</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Nome e cognome..."
                        className="flex-1 bg-bg-elevated border border-border-soft rounded-lg px-4 py-3 text-text-primary placeholder:text-text-disabled focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                        ref={inputRef}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    />
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-hover text-bg-primary font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent-primary/25 cursor-pointer"
                    >
                        <UserPlus className="size-5" />
                        Aggiungi
                    </button>
                </div>
            </div>

            {/* Griglia dipendenti */}
            {employees.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {employees.map((employee) => (
                        <li key={employee.id}>
                            <EmployeeCard employee={employee} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-16">
                    <Users className="size-16 text-text-disabled mx-auto mb-4" />
                    <p className="text-text-secondary">Nessun dipendente registrato</p>
                    <p className="text-sm text-text-disabled mt-1">Aggiungi il primo dipendente usando il form sopra</p>
                </div>
            )}
        </div>
    );
}