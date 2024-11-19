import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import Listagem from '../pages/Listagem/Listagem'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />}></Route>
                <Route path="/" element={<Login />}></Route>
                <Route path="/listagem" element={<Listagem />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;