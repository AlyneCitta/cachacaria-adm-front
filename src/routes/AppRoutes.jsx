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
import ProdutoList from "../pages/Produto/ProdutoList";
import ProdutoForm from "../pages/Produto/ProdutoForm";
import CompraList from "../pages/Compra/CompraList";
import CompraForm from "../pages/Compra/ComprasForm";
import VendaList from "../pages/Venda/VendasList";
import VendaForm from "../pages/Venda/VendasForm";
import OrdemProducaoList from "../pages/OrdemProducao/OrdemProducaoList";
import OrdemProducaoForm from "../pages/OrdemProducao/OrdemProducaoForm";
import EstoqueList from "../pages/Estoque/EstoqueList";
import ConsultaEstoqueProduto from "../pages/Estoque/ConsultaEstoqueProduto";
import Relatorio from '../pages/Relatorio/Relatorio';
import Utensilios from '../pages/Utensilios/Utensilios';
import Ingredientes from '../pages/Ingredientes/Ingredientes';
import IngredientesForm from "../pages/Ingredientes/IngredientesForm";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clientesform" element={<ClientesForm />} />
        <Route path="/clientesform/:id" element={<ClientesForm />} />
        <Route path="/clienteslist" element={<ClientesList />} />
        <Route path="/fornecedoresform" element={<FornecedoresForm />} />
        <Route path="/fornecedoreslist" element={<FornecedoresList />} />
        <Route path="/fornecedoresform/:id" element={<FornecedoresForm />} />
        <Route path="/manutencoesform" element={<ManutencoesForm />} />
        <Route path="/manutencoesform/:id" element={<ManutencoesForm />} />
        <Route path="/manutencoeslist" element={<ManutencoesList />} />
        <Route path="/maquinarioform/:id" element={<MaquinarioForm />} />
        <Route path="/maquinarioform" element={<MaquinarioForm />} />
        <Route path="/maquinariolist" element={<MaquinarioList />} />
        <Route path="/bebidas" element={<ProdutoList />} />
        <Route path="/bebidas/edit/:id" element={<ProdutoForm />} />
        <Route path="/bebidas/new" element={<ProdutoForm />} />
        <Route path="/compras" element={<CompraList />} />
        <Route path="/compras/view/:id" element={<CompraForm />} />
        <Route path="/compras/new" element={<CompraForm />} />
        <Route path="/vendas" element={<VendaList />} />
        <Route path="/vendas/view/:id" element={<VendaForm />} />
        <Route path="/vendas/new" element={<VendaForm />} />
        <Route path="/producao" element={<OrdemProducaoList />} />
        <Route path="/producao/view/:id" element={<OrdemProducaoForm />} />
        <Route path="/producao/new" element={<OrdemProducaoForm />} />
        <Route path="/estoque" element={<EstoqueList />} />
        <Route path="/estoque/view/:IdProduct" element={<ConsultaEstoqueProduto />} />        
        <Route path="/utensilios" element={<Utensilios />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/ingredientes" element={<Ingredientes />} />        
        <Route path="/ingredientes/edit/:id" element={<IngredientesForm />} />
        <Route path="/ingredientes/new" element={<IngredientesForm />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;