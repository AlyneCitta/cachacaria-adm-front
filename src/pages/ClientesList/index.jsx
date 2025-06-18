import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../api/api';
import {
  PageWrapper,
  PageContainer,
  Title,
  BreadcrumbWrapper,
  Breadcrumb,
  SearchInput,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Actions,
  EditButton,
  DeleteButton,
  ViewButton,
  NewButton,
  BackButton,
  TopActions
} from './styles';

const ClientesList = () => {
  const [search, setSearch] = useState('');
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  const fetchClientes = async () => {
    try {
      const response = await api.get('/api/clientes');
      setClientes(response.data);
    } catch (error) {
      alert('Erro ao carregar clientes: ' + error.message);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleEdit = (id) => {
    navigate(`/clientesform/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este cliente?');
    if (!confirmar) return;

    try {
      await api.delete(`/api/clientes/${id}`);
      alert('Cliente excluído com sucesso');
      fetchClientes();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      alert('Erro ao excluir cliente: ' + errorMessage);
    }
  };

  const handleNew = () => {
    navigate('/clientesform');
  };

  const handleBack = () => {
    navigate('/home');
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goToClientes = () => {
    navigate('/clienteslist');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={goToHome}>Home</span> &gt; <span onClick={goToClientes}>Clientes</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Lista de Clientes</Title>

          <TopActions>
            <BackButton onClick={handleBack}>Voltar</BackButton>
            <NewButton onClick={handleNew}>Novo Cliente</NewButton>
          </TopActions>

          <SearchInput
            type="text"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Data Nasc.</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredClientes.map((cliente) => (
                <Tr key={cliente.id}>
                  <Td>{cliente.nome}</Td>
                  <Td>{formatDate(cliente.dtanascimento || cliente.datanasc)}</Td>
                  <Td>{cliente.emailcontato || cliente.email}</Td>
                  <Td>{cliente.telefone}</Td>
                  <Td>
                    <Actions>
                      <ViewButton onClick={() => navigate(`/clientesform/${cliente.id}?view=true`)}>Visualizar</ViewButton>
                      <EditButton onClick={() => handleEdit(cliente.id)}>Editar</EditButton>
                      <DeleteButton onClick={() => handleDelete(cliente.id)}>Excluir</DeleteButton>
                    </Actions>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default ClientesList;
