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
import ProdutoList from  "../pages/Produto/ProdutoList";
import ProdutoForm from  "../pages/Produto/ProdutoForm";
import CompraList from  "../pages/Compra/CompraList";
import CompraForm from  "../pages/Compra/ComprasForm";
import VendaList from  "../pages/Venda/VendasList";
import VendaForm from  "../pages/Venda/VendasForm";
import OrdemProducaoList from  "../pages/OrdemProducao/OrdemProducaoList";
import OrdemProducaoForm from  "../pages/OrdemProducao/OrdemProducaoForm";
import EstoqueList from  "../pages/Estoque/EstoqueList";
import ConsultaEstoqueProduto from  "../pages/Estoque/ConsultaEstoqueProduto";
import Relatorio from '../pages/Relatorio/Relatorio';
import Utensilios from '../pages/Utensilios/Utensilios';
import Ingredientes from '../pages/Ingredientes/Ingredientes';

const AppRoutes = () => {
  return (
    <AuthProvider>  
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/produtolist" element={<ProdutoList />} />
        <Route path="/produtoform" element={<ProdutoForm />} />
        <Route path="/compralist" element={<CompraList />} />
        <Route path="/compraform" element={<CompraForm />} />
        <Route path="/vendalist" element={<VendaList />} />        
        <Route path="/vendaform" element={<VendaForm />} />
        <Route path="/ordemproducaolist" element={<OrdemProducaoList />} />
        <Route path="/ordemproducaof" element={<OrdemProducaoForm />} />
        <Route path="/estoquelist" element={<EstoqueList />} />
        <Route path="/consultaestoqueproduto" element={<ConsultaEstoqueProduto />} />
        <Route path="/utensilios" element={<Utensilios />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/ingredientes" element={<Ingredientes />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;