import { useEffect, useState } from "react";

export function ClockDisplay() {
    const getTime = () => new Date().toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const getDate = () => new Date().toLocaleDateString('it-IT', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const [currentTime, setCurrentTime] = useState(getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getTime());
        }, 1000)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center">
            <div className="text-6xl sm:text-8xl font-bold text-text-primary tracking-tight">
                {currentTime}
            </div>
            <p className="text-text-secondary mt-2">
                {getDate()}
            </p>
        </div>
    )
}