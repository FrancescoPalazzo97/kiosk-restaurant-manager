import { Timer } from "lucide-react";
import { store } from "../store/store";

export function SoonTolleranceSettingCard() {
    const soonTollerance = store(s => s.soonTollerance);
    const setSoonTollerance = store(s => s.setSoonTollerance);

    return (
        <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
            <div className="flex items-center gap-2 text-text-secondary mb-4">
                <Timer className="size-4" />
                <span className="text-sm font-medium uppercase tracking-wide">Tolleranza Anticipo</span>
            </div>
            <p className="text-sm text-text-disabled mb-4">
                Minuti di tolleranza per l'anticipo
            </p>
            <div className="relative">
                <input
                    type="number"
                    min={0}
                    value={soonTollerance}
                    onChange={e => setSoonTollerance(Number(e.target.value))}
                    className="w-full bg-bg-elevated border border-border-soft rounded-lg px-4 py-3 pr-16 text-text-primary text-lg font-mono focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-disabled text-sm">
                    min
                </span>
            </div>
        </div>
    )
}