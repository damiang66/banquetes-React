import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
//import { UserProvider } from "../context/UserProvider"
import { RegisterPage } from "../pages/RegisterPage"
import { UsersPage } from "../pages/UsersPage"
import { useAuth } from "../auth/hooks/useAuth"
import { ClienteList } from "../components/Cliente/ClienteList"
import { PaginaPrincipal } from "../components/layout/PaginaPrincipal"
import { ClientePage } from "../components/Cliente/ClientePage"


export const UserRoutes = () => {
    const { login } = useAuth();;
    return (
        <>
            {/* <UserProvider> */}
                <Navbar />
                <Routes>
                    <Route path="users" element={<UsersPage />} />

                    {!login.isAdmin || <>
                        <Route path="clientes/lista" element={<ClientePage />} />
                        <Route path="users/register" element={<RegisterPage />} />
                        <Route path="users/edit/:id" element={<RegisterPage />} />
                        <Route path="paginaPrincipal" element={<PaginaPrincipal />} />
                    </>
                    }
                    <Route path="/" element={<Navigate to="/users" />} />
                </Routes>
            {/* </UserProvider> */}
        </>
    )
}