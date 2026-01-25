import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { createEmployeeSlice } from "./employeesSlice";
import type { Store } from "../models/store.model";
import { createPasswordSlice } from "./passwordSlice";

// Temporaneamente senza persist per debug
export const store = create<Store>()(
    persist(
        immer((...args) => ({
            ...createEmployeeSlice(...args),
            ...createPasswordSlice(...args)
        })),
        {
            name: 'kiosk-store',
            partialize: (state) => {
                const { isAdminAuthenticated, ...persisted } = state;
                return persisted;
            }
        }
    )
);