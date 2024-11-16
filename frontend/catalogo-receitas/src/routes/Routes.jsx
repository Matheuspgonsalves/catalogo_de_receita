import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;