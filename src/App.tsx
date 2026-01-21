import { Routes, Route } from "react-router-dom"
import { DefaultLayout } from "./layouts/DefaultLayout"
import { AdminLayout } from "./layouts/AdminLayout"
import { EmployeesPage } from "./pages/EmployeesPage"

export function App() {

  return (
    <Routes>
      <Route element={<DefaultLayout />}>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="employees/:id" />
          <Route path="settings" />
          <Route path="dashboard/:date" />
        </Route>

        <Route path="/kiosk">
          <Route index />
        </Route>

      </Route>
      <Route path="*" element={<h1>404 | pagina non trovata</h1>} />
    </Routes>
  )
}
