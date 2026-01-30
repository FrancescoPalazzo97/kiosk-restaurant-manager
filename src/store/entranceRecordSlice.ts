import type { StateCreator } from "zustand";
import type { Store } from "../models/store.model";
import { entranceRecordSchema, type EntranceRecord } from "../models/entranceRecord.model";
import dayjs from "dayjs";

type EntranceRecordState = {
    entranceRecords: EntranceRecord[],
}

type EntranceRecordActions = {
    addNewEntranceRecord: (employeeId: string, inputPinCode: string) => boolean,
}

export type EntranceRecordSlice = EntranceRecordState & EntranceRecordActions;

export const createEntranceRecordSlice: StateCreator<
    Store,
    [['zustand/immer', never], ['zustand/persist', unknown]],
    [],
    EntranceRecordSlice
> = (set, get) => ({
    entranceRecords: [],

    addNewEntranceRecord: (employeeId, inputPinCode) => {
        const employee = get().employees.find(emp => emp.id === employeeId);

        if (!employee) {
            console.error(`Employee con id ${employeeId} non trovato`);
            return false;
        }

        if (employee.pinCode !== inputPinCode) {
            console.error('Il Pin Code inserito non combacia');
            return false;
        }

        const isAlreadyClocked = get().entranceRecords.some(er => {
            const today = dayjs().format('DD/MM/YYYY');
            const isSameId = er.employeeId === employeeId;
            const isSameDay = today === dayjs(er.date).format('DD/MM/YYYY');
            return isSameId && isSameDay;
        });

        if (isAlreadyClocked) {
            console.error('Il dipendente ha già timbrato per oggi!');
            return false;
        }

        const validation = entranceRecordSchema.safeParse({ employeeId });

        if (!validation.success) {
            console.error(validation.error);
            return false;
        }

        set(s => {
            s.entranceRecords.push(validation.data)
        });
        return true;
    }
})