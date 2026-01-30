import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { createEmployeeSlice } from "./employeesSlice";
import type { Store } from "../models/store.model";
import { createAdminSlice } from "./adminSlice";
import { createModalSlice } from "./modalSlice";
import { createEntranceRecordSlice } from "./entranceRecordSlice";

// Temporaneamente senza persist per debug
export const store = create<Store>()(
    persist(
        immer((...args) => ({
            ...createEmployeeSlice(...args),
            ...createAdminSlice(...args),
            ...createModalSlice(...args),
            ...createEntranceRecordSlice(...args)
        })),
        {
            name: 'kiosk-store',
            partialize: (state) => {
                const {
                    isAdminAuthenticated,
                    isOpen,
                    modalContent,
                    modalTitle,
                    ...persisted
                } = state;

                return persisted;
            }
        }
    )
);