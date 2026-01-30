import type { StateCreator } from "zustand";
import type { Store } from "../models/store.model";
import { settingsSchema } from "../models/settings.model";

type SettingsState = {
    startHour: string,
    lateTollerance: number
}

type SettingsActions = {
    setStartHour: (newStartHour: string) => void,
    setLateTollerance: (newLateTollerance: number) => void
}

export type SettingsSlice = SettingsState & SettingsActions;

export const createSettingsSlice: StateCreator<
    Store,
    [['zustand/immer', never], ['zustand/persist', unknown]],
    [],
    SettingsSlice
> = (set) => ({
    startHour: '08:00',
    lateTollerance: 5,

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

    setLateTollerance: (newLateTollerance) => {
        const validation = settingsSchema.shape.lateTollerance.safeParse(newLateTollerance);

        if (!validation.success) {
            console.error(validation.error);
            return;
        }

        set(s => {
            s.lateTollerance = validation.data
        })
    }
})