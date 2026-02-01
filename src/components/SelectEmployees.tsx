import { User } from "lucide-react";
import { store } from "../store/store";
import dayjs from "dayjs";

export function SelectEmployees() {
    const employees = store(s => s.employees);
    const entranceRecords = store(s => s.entranceRecords);

    const today = dayjs();

    const clockedInTodaysIds = new Set(
        entranceRecords
            .filter(er => dayjs(er.date).isSame(today, 'day'))
            .map(er => er.employeeId)
    );

    // Filtro per ottenere l'elenco dei dipendenti che non hanno ancora timbrato
    const filteredEmployees = employees.filter(emp => !clockedInTodaysIds.has(emp.id));

    return (
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
                {filteredEmployees.map(emp => (
                    <option key={emp.id} value={emp.id} className="bg-bg-elevated">
                        {emp.fullname}
                    </option>
                ))}
            </select>
        </div>
    )
}