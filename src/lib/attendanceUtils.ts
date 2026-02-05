import dayjs from "dayjs";
import type { EntranceRecord } from "../models/entranceRecord.model";

type AttendanceStatus = 'on-time' | 'late' | 'absent' | 'future' | 'past';

type CalendarDay = {
    date: dayjs.Dayjs,
    isCurrentMonth: boolean
}

function splitHour(hour: string): number[] {
    return hour.split(':').map(s => Number(s))
}

export function getAttendanceStatus(
    date: Date,
    creationDate: Date,
    employeeRecords: EntranceRecord[],
    startHour: string,
    lateTolerance: number
): AttendanceStatus {
    const today = dayjs().startOf('day');
    const dateToConfront = dayjs(date).startOf('day');
    const employeeCreationDate = dayjs(creationDate).startOf('day');

    if (dateToConfront.isBefore(employeeCreationDate)) {
        return 'past';
    }

    if (dateToConfront.isAfter(today)) {
        return 'future';
    }

    const record = employeeRecords.find(er => dayjs(er.date).isSame(date, 'day'));

    if (!record) {
        return 'absent';
    }

    const [h, m] = splitHour(startHour);
    const recordTime = dayjs(record.date);
    const startTime = dayjs().hour(h).minute(m);
    const lateToleranceTime = startTime.add(lateTolerance, 'minute');

    if (recordTime.isAfter(lateToleranceTime)) {
        return 'late';
    }

    return 'on-time';
}

export function getMonthDays(
    year: number,
    month: number
): CalendarDay[] {
    const firstDay = dayjs().year(year).month(month - 1).startOf('month');
    const lastDay = firstDay.endOf('month');

    const firstDayUS = firstDay.day();
    const firstDayIT = (firstDayUS + 6) % 7;
    const firstEmptySlots = firstDayIT;

    const lastDayUS = lastDay.day();
    const lastDayIT = (lastDayUS + 6) % 7;
    const lastEmptySlots = 6 - lastDayIT;

    const days: CalendarDay[] = [];

    for (let i = firstEmptySlots; i > 0; i--) {
        days.push({
            date: firstDay.subtract(i, 'day'),
            isCurrentMonth: false
        });
    }

    const daysInMonth = firstDay.daysInMonth();

    for (let i = 0; i < daysInMonth; i++) {
        days.push({
            date: firstDay.add(i, 'day'),
            isCurrentMonth: true
        });
    }

    for (let i = 0; i < lastEmptySlots; i++) {
        days.push({
            date: firstDay.add(1, 'month').add(i, 'day'),
            isCurrentMonth: false
        });
    }

    return days;
}

export function getStatusClasses(status: AttendanceStatus): string {
    const styles: Record<AttendanceStatus, string> = {
        'on-time': 'bg-green-500/20 text-green-400 font-medium',
        'late': 'bg-yellow-500/20 text-yellow-400 font-medium',
        'absent': 'bg-red-500/20 text-red-400 font-medium',
        'future': 'bg-bg-elevated text-text-disabled',
        'past': 'bg-bg-elevated text-text-disabled',
    };
    return styles[status];
}