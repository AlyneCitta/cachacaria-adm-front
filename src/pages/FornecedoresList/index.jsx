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

const FornecedoresList = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const [fornecedores] = useState([
    {
      id: 1,
      nome: 'Distribuidora Sol',
      cnpj: '12.345.678/0001-90',
      email: 'contato@sol.com',
      telefone: '(48) 99999-9999',
      cidade: 'Florianópolis'
    },
    {
      id: 2,
      nome: 'Alimentos Brasil',
      cnpj: '98.765.432/0001-10',
      email: 'vendas@brasil.com',
      telefone: '(11) 98888-8888',
      cidade: 'São Paulo'
    }
  ]);

  const filteredFornecedores = fornecedores.filter((fornecedor) =>
    fornecedor.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/fornecedores/form/${id}`);
  };

  const handleDelete = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este fornecedor?');
    if (confirmar) {
      alert(`Fornecedor ${id} excluído`);
    }
  };

  const handleView = (id) => {
    navigate(`/fornecedores/view/${id}`);
  };

  const handleNew = () => {
    navigate('/fornecedoresform');
  };

  const handleBack = () => {
    navigate('/home');
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goToFornecedores = () => {
    navigate('/fornecedoreslist');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={goToHome}>Home</span> &gt; <span onClick={goToFornecedores}>Fornecedores</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Lista de Fornecedores</Title>

          <TopActions>
            <BackButton onClick={handleBack}>Voltar</BackButton>
            <NewButton onClick={handleNew}>Novo Fornecedor</NewButton>
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
                <Th>CNPJ</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th>Cidade</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredFornecedores.map((fornecedor) => (
                <Tr key={fornecedor.id}>
                  <Td>{fornecedor.nome}</Td>
                  <Td>{fornecedor.cnpj}</Td>
                  <Td>{fornecedor.email}</Td>
                  <Td>{fornecedor.telefone}</Td>
                  <Td>{fornecedor.cidade}</Td>
                  <Td>
                    <Actions>
                      <ViewButton onClick={() => handleView(fornecedor.id)}>Visualizar</ViewButton>
                      <EditButton onClick={() => handleEdit(fornecedor.id)}>Editar</EditButton>
                      <DeleteButton onClick={() => handleDelete(fornecedor.id)}>Excluir</DeleteButton>
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

export default FornecedoresList;
