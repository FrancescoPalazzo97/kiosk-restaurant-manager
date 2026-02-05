import type { StateCreator } from "zustand";
import type { Store } from "../models/store.model";
import { settingsSchema } from "../models/settings.model";

type SettingsState = {
    startHour: string,
    soonTolerance: number,
    lateTolerance: number
}

type SettingsActions = {
    setStartHour: (newStartHour: string) => void,
    setSoonTolerance: (newSoonTolerance: number) => void,
    setLateTolerance: (newLateTolerance: number) => void
}

export type SettingsSlice = SettingsState & SettingsActions;

export const createSettingsSlice: StateCreator<
    Store,
    [['zustand/immer', never], ['zustand/persist', unknown]],
    [],
    SettingsSlice
> = (set) => ({
    startHour: '08:00',
    soonTolerance: 15,
    lateTolerance: 5,

    setStartHour: (newStartHour) => {
        const validation = settingsSchema.shape.startHours.safeParse(newStartHour);

        if (!validation.success) {
            console.error(validation.error);
            return;
        }

        set(s => {
            s.startHour = validation.data
        })
    },

    setSoonTolerance: (newSoonTolerance) => {
        const validation = settingsSchema.shape.soonTolerance.safeParse(newSoonTolerance);

        if (!validation.success) {
            console.error(validation.error);
            return;
        }

        set(s => {
            s.soonTolerance = validation.data
        })
    },

    setLateTolerance: (newLateTolerance) => {
        const validation = settingsSchema.shape.lateTolerance.safeParse(newLateTolerance);

        if (!validation.success) {
            console.error(validation.error);
            return;
        }

        set(s => {
            s.lateTolerance = validation.data
        })
    }
})