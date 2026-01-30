import { createPortal } from "react-dom";
import { store } from "../store/store"
import { X } from "lucide-react";

export function Modal() {
    const isOpen = store(s => s.isOpen);
    const title = store(s => s.modalTitle);
    const content = store(s => s.modalContent);
    const close = store(s => s.closeModal);

    return isOpen && createPortal((
        <div
            className="bg-black/60 backdrop-blur-md p-4 fixed inset-0 flex justify-center items-center z-50 animate-in fade-in duration-200"
            onClick={close}
        >
            <div
                className="w-full max-w-md bg-bg-elevated/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 border border-border-soft overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border-soft">
                    <h2 className="text-xl font-semibold text-text-primary">
                        {title}
                    </h2>
                    <button
                        onClick={close}
                        className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors duration-200 cursor-pointer"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    {content}
                </div>
            </div>
        </div>
    ), document.body)
}