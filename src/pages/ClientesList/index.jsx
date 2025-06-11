import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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
  const navigate = useNavigate();

  const [clientes] = useState([
    {
      id: 1,
      nome: 'João Silva',
      datanasc: '1990-01-01',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      cidade: 'Florianópolis'
    },
    {
      id: 2,
      nome: 'Maria Souza',
      datanasc: '1985-05-12',
      email: 'maria@email.com',
      telefone: '(11) 98888-8888',
      cidade: 'São Paulo'
    }
  ]);

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleEdit = (id) => {
    navigate(`/clientes/form/${id}`);
  };

  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este cliente?');
    if (confirmar) {
      alert(`Cliente ${id} excluído`);
    }
  };

  const handleView = (id) => {
    navigate(`/clientes/view/${id}`);
  };

  const handleNew = () => {
    navigate('/clientesform');
  };

  const handleBack = () => {
    navigate(-1);
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
                <Th>Cidade</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredClientes.map((cliente) => (
                <Tr key={cliente.id}>
                  <Td>{cliente.nome}</Td>
                  <Td>{formatDate(cliente.datanasc)}</Td>
                  <Td>{cliente.email}</Td>
                  <Td>{cliente.telefone}</Td>
                  <Td>{cliente.cidade}</Td>
                  <Td>
                    <Actions>
                      <ViewButton onClick={() => handleView(cliente.id)}>Visualizar</ViewButton>
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
