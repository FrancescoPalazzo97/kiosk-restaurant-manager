import { Settings } from "lucide-react";
import { HourSettingCard } from "../components/HourSettingCard";
import { LateToleranceSettingCard } from "../components/LateToleranceSettingCard";
import { SoonToleranceSettingCard } from "../components/SoonToleranceSettingCard";

export function SettingsPage() {

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header section */}
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
                <HourSettingCard />

                {/* Tolleranza anticipo */}
                <SoonToleranceSettingCard />

                {/* Tolleranza ritardo */}
                <LateToleranceSettingCard />
            </div>
        </div>
    )
}