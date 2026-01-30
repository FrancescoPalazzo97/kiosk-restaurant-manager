import { LogIn, User } from "lucide-react";
import { ClockDisplay } from "../components/ClockDispaly";
import { store } from "../store/store";
import { tryCatch } from "../lib/tryCatch";

export function HomePage() {
    const employees = store(s => s.employees);
    const openModal = store(s => s.openModal);
    const addNewEntranceRecord = store(s => s.addNewEntranceRecord);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const selectedEmployee: string = e.currentTarget.selectEmployee.value;
        const inputPinCode: string = e.currentTarget.pinCodeEmployee.value;

        const [_, error] = tryCatch<void>(() => addNewEntranceRecord(selectedEmployee, inputPinCode));

        if (error) {
            openModal(error.message, 'Errore');
            e.currentTarget.reset();
        } else {
            openModal('Hai timbrato con successo!', 'Conferma');
            e.currentTarget.reset();
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            {/* Clock display */}
            <ClockDisplay />

            {/* Login Employee */}
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                {/* Select Employees */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                        <User className="size-4" />
                        Seleziona il tuo profilo
                    </label>
                    <select
                        name="selectEmployee"
                        className="w-full bg-bg-secondary border border-border-soft rounded-lg px-4 py-3 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23A0A4B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-size-[20px] bg-position-[right_12px_center] bg-no-repeat"
                    >
                        <option value="" className="bg-bg-elevated">Seleziona...</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id} className="bg-bg-elevated">
                                {emp.fullname}
                            </option>
                        ))}
                    </select>
                </div>

                {/* PIN input placeholder */}
                <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-text-primary text-center mb-4">
                        Inserisci il tuo PIN
                    </h2>
                    <input
                        type="password"
                        name="pinCodeEmployee"
                        maxLength={4}
                        placeholder="••••"
                        className="w-full bg-bg-elevated border border-border-soft rounded-lg px-4 py-4 text-center text-2xl font-mono text-text-primary placeholder:text-text-disabled tracking-[0.5em] focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                    />
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-1 gap-3">
                    <button
                        type="submit"
                        className="flex flex-col items-center gap-2 bg-success/10 hover:bg-success/20 border border-success/30 text-success font-medium px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer"
                    >
                        <LogIn className="size-6" />
                        <span>Entrata</span>
                    </button>
                    {/* <button className="flex flex-col items-center gap-2 bg-error/10 hover:bg-error/20 border border-error/30 text-error font-medium px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer">
                        <LogOut className="size-6" />
                        <span>Uscita</span>
                    </button> */}
                </div>
            </form>

            {/* Info text */}
            <p className="text-sm text-text-disabled text-center max-w-md">
                Inserisci il tuo PIN personale e seleziona se stai entrando o uscendo dal turno
            </p>
        </div>
    )
}