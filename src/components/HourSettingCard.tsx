import { Clock } from "lucide-react";
import { store } from "../store/store";

export function HourSettingCard() {
    const startHour = store(s => s.startHour);
    const setStartHour = store(s => s.setStartHour);

    return (
        <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
            <div className="flex items-center gap-2 text-text-secondary mb-4">
                <Clock className="size-4" />
                <span className="text-sm font-medium uppercase tracking-wide">Orario di Entrata</span>
            </div>
            <p className="text-sm text-text-disabled mb-4">
                L'orario standard di inizio turno
            </p>
            <input
                type="time"
                value={startHour}
                onChange={e => setStartHour(e.target.value)}
                className="w-full bg-bg-elevated border border-border-soft rounded-lg px-4 py-3 text-text-primary text-lg font-mono focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors cursor-pointer"
            />
        </div>
    )
}