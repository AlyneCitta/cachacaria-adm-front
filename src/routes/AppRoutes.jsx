import React from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ClientesList from "../pages/ClientesList";
import ClientesForm from "../pages/ClientesForm";
import FornecedoresList from "../pages/FornecedoresList";
import FornecedoresForm from "../pages/FornecedoresForm";
import ManutencoesList from "../pages/ManutencoesList";
import ManutencoesForm from "../pages/ManutencoesForm";
import MaquinarioList from "../pages/MaquinarioList";
import MaquinarioForm from "../pages/MaquinarioForm";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clientesform" element={<ClientesForm />} />
        <Route path="/clienteslist" element={<ClientesList />} />
        <Route path="/fornecedoresform" element={<FornecedoresForm />} />
        <Route path="/fornecedoreslist" element={<FornecedoresList />} />
        <Route path="/manutencoesform" element={<ManutencoesForm />} />
        <Route path="/manutencoeslist" element={<ManutencoesList />} />
        <Route path="/maquinarioform" element={<MaquinarioForm />} />
        <Route path="/maquinariolist" element={<MaquinarioList />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;