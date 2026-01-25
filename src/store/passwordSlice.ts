import type { StateCreator } from "zustand";
import type { Store } from "../models/store.model";

type PasswordState = {
    adminPassword: string
    isAdminAuthenticated: boolean
}

type PasswordActions = {
    authenticateAdmin: (pass: string | null) => boolean
    logoutAdmin: () => void
}

export type PasswordSlice = PasswordState & PasswordActions;

export const createPasswordSlice: StateCreator<
    Store,
    [['zustand/immer', never], ['zustand/persist', unknown]],
    [],
    PasswordSlice
> = (set, get) => ({
    adminPassword: 'Admin1234',
    isAdminAuthenticated: false,

    authenticateAdmin: (pass) => {
        if (pass === get().adminPassword) {
            set(s => { s.isAdminAuthenticated = true });
            return true;
        }
        return false;
    },

    logoutAdmin: () => {
        set(s => { s.isAdminAuthenticated = false });
    }
})