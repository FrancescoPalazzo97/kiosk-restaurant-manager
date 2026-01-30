import { Clock, Settings, Timer } from "lucide-react";
import { store } from "../store/store"

export function SettingsPage() {
    const startHour = store(s => s.startHour);
    const setStartHour = store(s => s.setStartHour);
    const lateTollerance = store(s => s.lateTollerance);
    const setLateTollerance = store(s => s.setLateTollerance);

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header sezione */}
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent-primary/10">
                    <Settings className="size-6 text-accent-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Impostazioni</h1>
                    <p className="text-sm text-text-secondary">Configura i parametri del sistema</p>
                </div>
            </div>

            {/* Settings cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Orario entrata */}
                <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
                    <div className="flex items-center gap-2 text-text-secondary mb-4">
                        <Clock className="size-4" />
                        <span className="text-sm font-medium uppercase tracking-wide">Orario di Entrata</span>
                    </div>
                    <p className="text-sm text-text-disabled mb-4">
                        L'orario standard di inizio turno per i dipendenti
                    </p>
                    <input
                        type="time"
                        value={startHour}
                        onChange={e => setStartHour(e.target.value)}
                        className="w-full bg-bg-elevated border border-border-soft rounded-lg px-4 py-3 text-text-primary text-lg font-mono focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors cursor-pointer"
                    />
                </div>

                {/* Tolleranza ritardo */}
                <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
                    <div className="flex items-center gap-2 text-text-secondary mb-4">
                        <Timer className="size-4" />
                        <span className="text-sm font-medium uppercase tracking-wide">Tolleranza Ritardo</span>
                    </div>
                    <p className="text-sm text-text-disabled mb-4">
                        Minuti di tolleranza prima di segnare come ritardo
                    </p>
                    <div className="relative">
                        <input
                            type="number"
                            min={0}
                            value={lateTollerance}
                            onChange={e => setLateTollerance(Number(e.target.value))}
                            className="w-full bg-bg-elevated border border-border-soft rounded-lg px-4 py-3 pr-16 text-text-primary text-lg font-mono focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-disabled text-sm">
                            min
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}