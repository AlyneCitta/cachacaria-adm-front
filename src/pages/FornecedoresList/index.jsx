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

const FornecedoresList = () => {
  const [search, setSearch] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();

  const fetchFornecedores = async () => {
    try {
      const response = await api.get("/api/fornecedores");
      setFornecedores(response.data);
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
      const mensagem = error.response?.data?.error || "Erro ao conectar com o servidor.";
      alert("Erro ao carregar fornecedores: " + mensagem);
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
      await api.delete(`/api/fornecedores/${id}`);
      alert('Fornecedor excluído com sucesso');
      fetchFornecedores(); // atualiza a lista
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      const mensagem = error.response?.data?.error || "Erro ao conectar com o servidor.";
      alert('Erro ao excluir fornecedor: ' + mensagem);
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
