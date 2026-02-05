import type { StateCreator } from "zustand";
import type { Store } from "../models/store.model";
import { entranceRecordSchema, type EntranceRecord } from "../models/entranceRecord.model";
import dayjs from "dayjs";

type EntranceRecordState = {
    entranceRecords: EntranceRecord[],
}

type EntranceRecordActions = {
    addNewEntranceRecord: (employeeId: string, inputPinCode: string) => void,
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
        const employee = get().getEmployeeById(employeeId);

        if (employee.pinCode !== inputPinCode) {
            throw new Error('Il Pin Code inserito non combacia');
        }

        const isAlreadyClocked = get().entranceRecords.some(er => {
            const today = dayjs().format('DD/MM/YYYY');
            const isSameId = er.employeeId === employeeId;
            const isSameDay = today === dayjs(er.date).format('DD/MM/YYYY');
            return isSameId && isSameDay;
        });

        if (isAlreadyClocked) {
            throw new Error('Il dipendente ha già timbrato per oggi!');
        }

        const isTooSoon = () => {
            const now = dayjs();
            const startHour = dayjs(`${now.format('YYYY-MM-DD')} ${get().startHour}`);
            const earliestAllowed = startHour.subtract(get().lateTolerance, 'minute');
            return now.isBefore(earliestAllowed);
        }

        if (isTooSoon()) {
            throw new Error('È troppo presto! Torna dopo');
        }

        const validation = entranceRecordSchema.safeParse({ employeeId });

        if (!validation.success) {
            throw new Error(validation.error.message);
        }

        set(s => {
            s.entranceRecords.push(validation.data)
        });
    }
})