import { useParams } from "react-router-dom";
import { Calendar } from "lucide-react";
import { store } from "../store/store";
import { AttendanceCalendar } from "../components/AttendanceCalendar";
import { EmployeeNotFound } from "../components/EmployeeNotFound";
import { NameCard } from "../components/NameCard";
import { BackLink } from "../components/BackLink";
import { PINCard } from "../components/PINCard";
import { DangerZone } from "../components/DangerZone";
import { ProfileHeader } from "../components/ProfileHeader";

export function EmployeeDetailsPage() {
    const { id } = useParams();
    const employee = store(s => s.employees.find(emp => emp.id == id));

    if (!employee) {
        return <EmployeeNotFound />
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <BackLink />

            <ProfileHeader employee={employee} />

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NameCard employee={employee} />

                <PINCard employee={employee} />
            </div>

            {/* Attendance Calendar */}
            <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
                <div className="flex items-center gap-2 text-text-secondary mb-4">
                    <Calendar className="size-4" />
                    <span className="text-sm font-medium uppercase tracking-wide">Presenze</span>
                </div>
                <AttendanceCalendar employee={employee} />
            </div>

            <DangerZone employee={employee} />
        </div>
    )
}