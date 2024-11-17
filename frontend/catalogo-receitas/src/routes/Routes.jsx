import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />}></Route>
                <Route path="/" element={<Login />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;