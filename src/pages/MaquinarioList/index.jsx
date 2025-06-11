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

const MaquinarioList = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const [maquinarios] = useState([
    {
      id: 1,
      nome: 'Alambique de cobre',
      ultima: '2024-01-10',
      proxima: '2025-01-10'
    },
    {
      id: 2,
      nome: 'Engarrafadora automática',
      ultima: '2023-11-15',
      proxima: '2024-11-15'
    }
  ]);

  const filtered = maquinarios.filter((m) =>
    m.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/maquinarioform/${id}`);
  };

  const handleDelete = (id) => {
    const confirmar = window.confirm('Deseja excluir este maquinário?');
    if (confirmar) alert(`Maquinário ${id} excluído`);
  };

  const handleView = (id) => {
    navigate(`/manutencoeslist/${id}`);
  };

  const handleNew = () => {
    navigate('/maquinarioform');
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goToList = () => {
    navigate('/maquinariolist');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={goToHome}>Home</span> &gt; <span onClick={goToList}>Maquinários</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Lista de Maquinários</Title>
          <TopActions>
            <BackButton onClick={goToHome}>Voltar</BackButton>
            <NewButton onClick={handleNew}>Novo Maquinário</NewButton>
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
                <Th>Última Manutenção</Th>
                <Th>Próxima Manutenção</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filtered.map((m) => (
                <Tr key={m.id}>
                  <Td>{m.nome}</Td>
                  <Td>{m.ultima}</Td>
                  <Td>{m.proxima}</Td>
                  <Td>
                    <Actions>
                      <ViewButton onClick={() => handleView(m.id)}>Visualizar</ViewButton>
                      <EditButton onClick={() => handleEdit(m.id)}>Editar</EditButton>
                      <DeleteButton onClick={() => handleDelete(m.id)}>Excluir</DeleteButton>
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

export default MaquinarioList;
