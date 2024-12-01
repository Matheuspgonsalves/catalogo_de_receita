/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import NovaReceita from '../pages/NovaReceita/NovaReceita';
import ListaReceitas from '../pages/ListaReceitas/ListaReceitas';
import RecuperarSenha from '../pages/RecuperarSenha/RecuperarSenha';
import RedefinirSenha from '../pages/RedefinirSenha/RedefinirSenha';

const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/lista-receitas" /> : <Login />}
        />
        <Route
          path="/cadastro"
          element={token ? <Navigate to="/lista-receitas" /> : <Cadastro />}
        />
        <Route path="/nova-receita" element={<NovaReceita />} />
        <Route path="/lista-receitas" element={<ListaReceitas />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/redefinir-senha/:resetToken" element={<RedefinirSenha />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
