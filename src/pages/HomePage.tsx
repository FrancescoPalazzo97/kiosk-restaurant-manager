import { Clock, LogIn, LogOut } from "lucide-react";

export function HomePage() {
    const currentTime = new Date().toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            {/* Clock display */}
            <div className="text-center">
                <div className="inline-flex items-center gap-3 text-6xl sm:text-8xl font-bold text-text-primary tracking-tight">
                    <Clock className="size-12 sm:size-16 text-accent-primary" />
                    {currentTime}
                </div>
                <p className="text-text-secondary mt-2">
                    {new Date().toLocaleDateString('it-IT', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </p>
            </div>

            {/* PIN input placeholder */}
            <div className="w-full max-w-sm space-y-4">
                <div className="bg-bg-secondary border border-border-soft rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-text-primary text-center mb-4">
                        Inserisci il tuo PIN
                    </h2>
                    <input
                        type="password"
                        maxLength={4}
                        placeholder="••••"
                        className="w-full bg-bg-elevated border border-border-soft rounded-lg px-4 py-4 text-center text-2xl font-mono text-text-primary placeholder:text-text-disabled tracking-[0.5em] focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-colors"
                    />
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center gap-2 bg-success/10 hover:bg-success/20 border border-success/30 text-success font-medium px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer">
                        <LogIn className="size-6" />
                        <span>Entrata</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 bg-error/10 hover:bg-error/20 border border-error/30 text-error font-medium px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer">
                        <LogOut className="size-6" />
                        <span>Uscita</span>
                    </button>
                </div>
            </div>

            {/* Info text */}
            <p className="text-sm text-text-disabled text-center max-w-md">
                Inserisci il tuo PIN personale e seleziona se stai entrando o uscendo dal turno
            </p>
        </div>
    )
}