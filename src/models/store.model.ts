import type { AdminSlice } from "../store/adminSlice";
import type { EmployeeSlice } from "../store/employeesSlice";
import type { EntranceRecordSlice } from "../store/entranceRecordSlice";
import type { ModalSlice } from "../store/modalSlice";
import type { SettingsSlice } from "../store/settingsSlice";

export type Store = EmployeeSlice
    & AdminSlice
    & ModalSlice
    & EntranceRecordSlice
    & SettingsSlice;