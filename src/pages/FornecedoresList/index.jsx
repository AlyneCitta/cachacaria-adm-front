import React, { useState, useEffect } from 'react';
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
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();

  const fetchFornecedores = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/fornecedores');
      if (!response.ok) throw new Error('Erro ao buscar fornecedores');
      const data = await response.json();
      setFornecedores(data);
    } catch (error) {
      alert('Erro ao carregar fornecedores: ' + error.message);
    }
  };

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const filteredFornecedores = fornecedores.filter((fornecedor) =>
    fornecedor.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/fornecedoresform/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este fornecedor?');
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:3001/api/fornecedores/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Fornecedor excluído com sucesso');
        fetchFornecedores();
      } else {
        const errorData = await response.json();
        alert('Erro ao excluir fornecedor: ' + errorData.message);
      }
    } catch (error) {
      alert('Erro ao excluir fornecedor: ' + error.message);
    }
  };

  const handleView = (id) => {
    navigate(`/fornecedoresform/${id}?view=true`);
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
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredFornecedores.map((fornecedor) => (
                <Tr key={fornecedor.id}>
                  <Td>{fornecedor.nome}</Td>
                  <Td>{fornecedor.cpfcnpj}</Td>
                  <Td>{fornecedor.emailcontato || fornecedor.email}</Td>
                  <Td>{fornecedor.telefone}</Td>
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
