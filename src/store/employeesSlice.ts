import type { StateCreator } from "zustand";
import { employeesSchema, type Employee } from "../models/employees.model";
import type { Store } from "../models/store.model";
import { getRandomPinCode } from "../lib/utility";

type EmployeeState = {
    employees: Employee[];
}

type EmployeeAction = {
    addEmployee: (fullname: string) => void;
    getEmployeeById: (employeeId: string) => Employee;
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
> = (set, get) => ({
    employees: [],

    addEmployee: (fullname) => {
        const validation = employeesSchema.safeParse({ fullname });

        if (!validation.success) {
            console.log(validation.error.message);
            return;
        }

        set((s) => {
            s.employees.push(validation.data);
        });
    },

    getEmployeeById: (employeeId) => {
        const employee = get().employees.find(emp => emp.id === employeeId);

        if (!employee) {
            throw new Error(`Employee con id ${employeeId} non trovato`);
        }

        return employee;
    },

    updateFullname: (employeeId, newName) => {
        const validation = employeesSchema.shape.fullname.safeParse(newName);

        if (!validation.success) {
            console.error(validation.error.message);
        }

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
            if (employeeIndex !== -1) {
                s.employees.splice(employeeIndex, 1);
                s.entranceRecords = s.entranceRecords.filter(er => er.employeeId !== employeeId);
            }
        });
    }
});