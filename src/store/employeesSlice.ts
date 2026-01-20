import type { StateCreator } from "zustand";
import { employeesSchema, type Employee } from "../models/employees.model";

type EmployeeState = {
    employees: Employee[];
}

type EmployeeAction = {
    addEmployee: (fullname: string) => void;
}

export type EmployeeSlice = EmployeeState & EmployeeAction;

export const createEmployeeSlice: StateCreator<EmployeeSlice> = (set) => ({
    employees: [],

    addEmployee: (fullname: string) => {
        const validation = employeesSchema.safeParse({ fullname });

        if (!validation.success) {
            throw new Error(validation.error.message);
        }

        set((state) => ({
            employees: [...state.employees, validation.data],
        }));
    },
});