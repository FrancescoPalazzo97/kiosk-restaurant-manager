import { useMemo } from "react";
import { store } from "../store/store";
import dayjs from "dayjs";
import { getAttendanceStatus, getMonthDays } from "../lib/attendanceUtils";

type AttendanceCounterProps = {
    employeeId: string,
    employeeCreation: Date
}

export function AttendanceCounter({ employeeId, employeeCreation }: AttendanceCounterProps) {
    const entranceRecords = store(s => s.entranceRecords);
    const startHour = store(s => s.startHour);
    const lateTolerance = store(s => s.lateTolerance);

    const today = dayjs();
    const days = getMonthDays(Number(today.format('YYYY')), Number(today.format('MM')));

    const filteredRecords = useMemo(
        () => entranceRecords.filter(er => er.employeeId === employeeId),
        [entranceRecords, employeeId]
    );

    const initialData = {
        "on-time": 0,
        "late": 0,
        "absent": 0,
        "future": 0,
        "past": 0
    }

    const data = days.reduce(
        (acc, day) => {
            if (!day.isCurrentMonth) return acc;
            const status = getAttendanceStatus(day.date.toDate(), employeeCreation, filteredRecords, startHour, lateTolerance);
            acc[status]++;
            return acc;
        },
        initialData
    );

    return (
        <div className="flex justify-center">
            <span className="text-green-400 font-medium me-1.5">{data["on-time"]}</span>
            <span className="text-yellow-400 font-medium me-1.5">{data["late"]}</span>
            <span className="text-red-400 font-medium me-1.5">{data["absent"]}</span>
            <span className="text-text-disabled">{data['future']}</span>
        </div>
    )
}