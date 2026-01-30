import type { StateCreator } from "zustand";
import type { Store } from "../models/store.model";
import { env } from "../env";

type AdminState = {
    adminPassword: string
    isAdminAuthenticated: boolean
}

type AdminActions = {
    authenticateAdmin: (pass: string | null) => boolean
    logoutAdmin: () => void
}

export type AdminSlice = AdminState & AdminActions;

export const createAdminSlice: StateCreator<
    Store,
    [['zustand/immer', never], ['zustand/persist', unknown]],
    [],
    AdminSlice
> = (set, get) => ({
    adminPassword: env.VITE_ADMIN_PASSWORD,
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