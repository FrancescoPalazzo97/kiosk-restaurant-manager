import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createEmployeeSlice } from "./employeesSlice";
import type { Store } from "../models/store.model";

export const store = create<Store>()(
    immer((...args) => ({
        ...createEmployeeSlice(...args),
    }))
);