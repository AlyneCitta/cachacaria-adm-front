import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import {
  PageWrapper,
  PageContainer,
  Title,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  BreadcrumbWrapper,
  Breadcrumb,
  Actions,
  EditButton,
  DeleteButton,
  ViewButton,
  TopActions,
  NewButton,
  BackButton
} from './styles';

const MaquinarioList = () => {
  const navigate = useNavigate();
  const [maquinarios, setMaquinarios] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // <== Scroll para o topo ao montar a página
    fetchMaquinarios();
  }, []);

  const fetchMaquinarios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/maquinario');
      setMaquinarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar maquinários:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este maquinário?')) return;

    try {
      await axios.delete(`http://localhost:3001/api/maquinario/${id}`);
      fetchMaquinarios();
    } catch (error) {
      console.error('Erro ao excluir maquinário:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/maquinarioform/${id}`);
  };

  const handleNew = () => {
    navigate('/maquinarioform');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Home</span> &gt; <span>Maquinários</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Maquinários</Title>

          <TopActions>
            <BackButton onClick={() => navigate('/home')}>Voltar</BackButton>
            <NewButton onClick={handleNew}>Novo Maquinário</NewButton>
          </TopActions>

          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Data de Aquisição</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {maquinarios.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.nome}</Td>
                  <Td>{new Date(item.dataaquisicao).toLocaleDateString()}</Td>
                  <Td>
                    <Actions>
                      <ViewButton onClick={() => navigate(`/manutencoeslist?maquinario=${item.id}`)}>Manutenções</ViewButton>
                      <EditButton onClick={() => handleEdit(item.id)}>Editar</EditButton>
                      <DeleteButton onClick={() => handleDelete(item.id)}>Excluir</DeleteButton>
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
