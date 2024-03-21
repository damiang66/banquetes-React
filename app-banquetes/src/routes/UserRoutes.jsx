import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
//import { UserProvider } from "../context/UserProvider"
import { RegisterPage } from "../pages/RegisterPage"
import { UsersPage } from "../pages/UsersPage"
import { useAuth } from "../auth/hooks/useAuth"
import { ClienteList } from "../components/Cliente/ClienteList"
import { PaginaPrincipal } from "../components/layout/PaginaPrincipal"
import { ClientePage } from "../components/Cliente/ClientePage"
import { ClienteFormPage } from "../components/Cliente/ClienteFormPage"


export const UserRoutes = () => {
    const { login } = useAuth();;
    return (
        <>
            {/* <UserProvider> */}
                <Navbar />
                <Routes>
                    <Route path="users" element={<UsersPage />} />

                    {!login.isAdmin || <>
                       
                        <Route path="users/register" element={<RegisterPage />} />
                        <Route path="users/edit/:id" element={<RegisterPage />} />
                        <Route path="paginaPrincipal" element={<PaginaPrincipal />} />
                        
                        <Route path="clientes/lista" element={<ClientePage />} />
                        <Route path="clientes/form" element={<ClienteFormPage/>}    />              
                        <Route path="clientes/form/:id" element={<ClienteFormPage />}    /> 
                         </>
                    }
                    <Route path="/" element={<Navigate to="/users" />} />
                </Routes>
            {/* </UserProvider> */}
        </>
    )
}