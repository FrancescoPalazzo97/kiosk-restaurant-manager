import type { StateCreator } from "zustand";
import { employeesSchema, type Employee } from "../models/employees.model";
import type { Store } from "../models/store.model";

type EmployeeState = {
    employees: Employee[];
}

type EmployeeAction = {
    addEmployee: (fullname: string) => void;
    getEmployeeById: (employeeId: string) => Employee | null;
    updateFullname: (employeeId: string, newName: string) => void;
}

export type EmployeeSlice = EmployeeState & EmployeeAction;

export const createEmployeeSlice: StateCreator<
    Store,
    [['zustand/immer', never], ['zustand/persist', unknown]],
    [],
    EmployeeSlice
> = (set, get) => ({
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

    getEmployeeById: (employeeId) => {
        const employee = get().employees.find(e => e.id === employeeId);

        if (!employee) {
            console.error('Employee non trovato!');
            return null;
        }

        return employee;
    },

    updateFullname: (employeeId, newName) => {
        set(s => ({
            employees: s.employees.map(e => e.id === employeeId
                ? { ...e, fullname: newName }
                : e
            )
        }))
    }
});