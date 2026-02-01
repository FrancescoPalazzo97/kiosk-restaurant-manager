import { LogIn } from "lucide-react";
import { ClockDisplay } from "../components/ClockDispaly";
import { store } from "../store/store";
import { tryCatch } from "../lib/tryCatch";
import { SelectEmployees } from "../components/SelectEmployees";

export function HomePage() {
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
            <ClockDisplay />

            {/* Login Employee */}
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <SelectEmployees />

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