import { Asterisk, Eye, KeyRound, RefreshCw } from "lucide-react";
import { store } from "../store/store";
import type { Employee } from "../models/employees.model";

type PINCardProps = {
    employee: Employee
}

export function PINCard({ employee }: PINCardProps) {
    const updatePinCode = store(s => s.updatePinCode);

    const handleChangePinCode = () => {
        updatePinCode(employee.id);
    }

    return (
        <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-text-secondary">
                    <KeyRound className="size-4" />
                    <span className="text-sm font-medium uppercase tracking-wide">PIN Code</span>
                </div>
            </div>
            <div className="flex justify-between  my-4">
                <p className="text-xl font-mono font-semibold text-accent-primary tracking-widest">
                    {employee.pinCode}
                </p>
                <button

                >
                    <Eye />
                </button>
            </div>
            <button
                onClick={handleChangePinCode}
                className="w-full inline-flex items-center justify-center gap-2 bg-bg-elevated hover:bg-border-soft text-text-primary font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
                <RefreshCw className="size-4" />
                Genera nuovo PIN
            </button>
        </div>
    )
}