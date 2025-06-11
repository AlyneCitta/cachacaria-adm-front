import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ClientesList from "../pages/ClientesList";
import ClientesForm from "../pages/ClientesForm";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clientesform" element={<ClientesForm />} />
        <Route path="/clienteslist" element={<ClientesList />} />
      </Routes>
  );
};

export default AppRoutes;