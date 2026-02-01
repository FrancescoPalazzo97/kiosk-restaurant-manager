import { useState } from "react";
import type { Employee } from "../models/employees.model";
import { PhotoProfile } from "./PhotoProfile";

type ProfileHeaderProps = {
    employee: Employee
}

export function ProfileHeader({ employee }: ProfileHeaderProps) {
    const [show, setShow] = useState(false);

    const profileId = show ? employee.id : `${employee.id.slice(0, 8)}...`;

    return (
        <div className="bg-bg-secondary border border-border-soft rounded-xl p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <PhotoProfile w={24} h={24} />
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-text-primary">{employee.fullname}</h1>
                    <p
                        onClick={() => setShow(prev => !prev)}
                        className="text-text-secondary mt-1 cursor-pointer"
                    >
                        ID: {profileId}
                    </p>
                </div>
            </div>
        </div>
    )
}