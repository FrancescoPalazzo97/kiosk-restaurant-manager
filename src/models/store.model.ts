import type { EmployeeSlice } from "../store/employeesSlice";
import type { PasswordSlice } from "../store/passwordSlice";

export type Store = EmployeeSlice & PasswordSlice;