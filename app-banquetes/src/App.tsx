
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { PaginaPrincipal } from './vistas/PaginaPrincipal'
import { Rutas } from './vistas/rutas/Rutas'

function App() {
  

  return (
    <>
<BrowserRouter>
    <Rutas />
  </BrowserRouter>,
      
    </>
  )
}

export default App
