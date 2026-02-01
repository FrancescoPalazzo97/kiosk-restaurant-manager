import { CircleUserRound } from "lucide-react";

type PhotoProfileProps = {
    w: number,
    h: number,
    className?: string
}

export function PhotoProfile({ w, h, className }: PhotoProfileProps) {
    const sizes = `w-${w} h-${h}`

    return (
        <div className={`${sizes} rounded-full bg-bg-elevated flex items-center justify-center ${className ? className : ''}`}>
            <CircleUserRound className="size-14 text-icon-active" />
        </div>
    )
}