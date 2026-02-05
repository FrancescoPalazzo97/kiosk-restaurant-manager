import dayjs from "dayjs"
import { useMemo, useState } from "react"
import { store } from "../store/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAttendanceStatus, getMonthDays, getStatusClasses } from "../lib/attendanceUtils";
import type { Employee } from "../models/employees.model";

type AttendanceCalendarProps = {
    employee: Employee
}

export function AttendanceCalendar({ employee }: AttendanceCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(() => dayjs());
    const days = getMonthDays(Number(currentMonth.format('YYYY')), Number(currentMonth.format('MM')));

    const entranceRecords = store(s => s.entranceRecords);
    const startHour = store(s => s.startHour);
    const lateTolerance = store(s => s.lateTolerance);

    const filteredRecords = useMemo(
        () => entranceRecords.filter(er => er.employeeId === employee.id),
        [entranceRecords, employee.id]
    );

    const nextMonth = () => setCurrentMonth(s => s.add(1, 'month'));
    const prevMonth = () => setCurrentMonth(s => s.subtract(1, 'month'));

    return (
        <div className="space-y-4">
            {/* Header navigazione */}
            <div className="flex items-center justify-between">
                <button className="cursor-pointer" onClick={prevMonth}>
                    <ChevronLeft className="size-5" />
                </button>
                <h4 className="text-lg font-semibold capitalize">
                    {currentMonth.format('MMMM YYYY')}
                </h4>
                <button className="cursor-pointer" onClick={nextMonth}>
                    <ChevronRight className="size-5" />
                </button>
            </div>

            {/* Intestazione giorni settimana */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm text-text-secondary">
                {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(day => (
                    <div key={day} className="py-2 font-medium">{day}</div>
                ))}
            </div>

            {/* Griglia giorni */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                    const status = getAttendanceStatus(day.date.toDate(), employee.createdAt, filteredRecords, startHour, lateTolerance);
                    return (
                        <div
                            key={index}
                            className={`aspect-square flex items-center justify-center rounded-lg text-sm ${getStatusClasses(status)} ${!day.isCurrentMonth && 'opacity-30'}`}
                        >
                            {day.date.date()}
                        </div>
                    )
                })}
            </div>

            {/* Legenda */}
            {/* <div className="flex flex-wrap gap-4 pt-4 border-t border-border-soft text-sm">
                <Diamond color="bg-green-500" label="In orario" />
                <Diamond color="bg-yellow-500" label="Ritardo" />
                <Diamond color="bg-red-500" label="Assente" />
            </div> */}
        </div >
    )
}