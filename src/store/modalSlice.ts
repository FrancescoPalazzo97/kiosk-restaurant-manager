import type { StateCreator } from "zustand";
import type { Store } from "../models/store.model";
import type { ReactNode } from "react";

type ModalState = {
    isOpen: boolean,
    modalContent: ReactNode | null,
    modalTitle: string | null
}

type ModalActions = {
    openModal: (content?: ReactNode, title?: string) => void,
    closeModal: () => void
}

export type ModalSlice = ModalState & ModalActions;

export const createModalSlice: StateCreator<
    Store,
    [['zustand/immer', never], ['zustand/persist', unknown]],
    [],
    ModalSlice
> = (set) => ({
    isOpen: false,
    modalContent: null,
    modalTitle: null,

    openModal: (content, title) => {
        set(s => {
            s.isOpen = true
            s.modalContent = content ?? "Contenuto Defaut"
            s.modalTitle = title ?? "Titolo Default"
        })
    },

    closeModal: () => {
        set(s => {
            s.isOpen = false
            s.modalContent = null
            s.modalTitle = null
        })
    }
})