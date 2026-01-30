import { Routes, Route, Navigate } from "react-router-dom"
import { DefaultLayout } from "./layouts/DefaultLayout"
import { AdminLayout } from "./layouts/AdminLayout"
import { EmployeesPage } from "./pages/EmployeesPage"
import { EmployeeDetailsPage } from "./pages/EmployeeDetailsPage"
import { HomePage } from "./pages/HomePage"

export function App() {

  return (
    <Routes>
      <Route element={<DefaultLayout />}>

        <Route index element={<Navigate to={'/kiosk'} />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index path="employees" element={<EmployeesPage />} />
          <Route path="employees/:id" element={<EmployeeDetailsPage />} />
          <Route path="settings" />
          <Route path="dashboard/:date" />
        </Route>

        <Route path="/kiosk">
          <Route index element={<HomePage />} />
        </Route>

      </Route>
      <Route path="*" element={<h1>404 | pagina non trovata</h1>} />
    </Routes>
  )
}
