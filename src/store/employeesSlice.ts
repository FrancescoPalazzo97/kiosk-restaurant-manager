import type { StateCreator } from "zustand";
import { employeesSchema, type Employee } from "../models/employees.model";
import type { Store } from "../models/store.model";
import { getRandomPinCode } from "../lib/utility";

type EmployeeState = {
    employees: Employee[];
}

type EmployeeAction = {
    addEmployee: (fullname: string) => void;
    updateFullname: (employeeId: string, newName: string) => void;
    updatePinCode: (employeeId: string) => void;
    deleteEmployee: (employeeId: string) => void
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
        });
    },

    updateFullname: (employeeId, newName) => {
        set(s => {
            const employee = s.employees.find(e => e.id === employeeId);
            if (employee) employee.fullname = newName;
        })
    },

    updatePinCode: (employeeId) => {
        set(s => {
            const employee = s.employees.find(e => e.id === employeeId);
            if (employee) employee.pinCode = getRandomPinCode();
        })
    },

    deleteEmployee: (employeeId) => {
        set(s => {
            const employeeIndex = s.employees.findIndex(e => e.id === employeeId);
            if (employeeIndex !== -1) s.employees.splice(employeeIndex, 1);
        });
    }
});