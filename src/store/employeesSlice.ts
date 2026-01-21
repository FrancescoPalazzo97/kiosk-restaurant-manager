import type { StateCreator } from "zustand";
import { employeesSchema, type Employee } from "../models/employees.model";
import type { Store } from "../models/store.model";

type EmployeeState = {
    employees: Employee[];
}

type EmployeeAction = {
    addEmployee: (fullname: string) => void;
}

export type EmployeeSlice = EmployeeState & EmployeeAction;

export const createEmployeeSlice: StateCreator<
    Store,
    [['zustand/immer', never], ['zustand/persist', unknown]],
    [],
    EmployeeSlice
> = (set) => ({
    employees: [],

    addEmployee: (fullname: string) => {
        const validation = employeesSchema.safeParse({ fullname });

        if (!validation.success) {
            throw new Error(validation.error.message);
        }

        set((s) => {
            s.employees.push(validation.data);
            console.log("After push:", s.employees);
        });
    },
});