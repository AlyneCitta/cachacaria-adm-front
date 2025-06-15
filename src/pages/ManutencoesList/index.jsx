import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  TopActions,
  NewButton,
  BackButton
} from './styles';

const ManutencoesList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [manutencoes, setManutencoes] = useState([]);
  const [maquinarioId, setMaquinarioId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('maquinario');
    setMaquinarioId(id);
    fetchManutencoes(id);
  }, [location.search]);

  const fetchManutencoes = async (id) => {
    try {
      const url = id
        ? `http://localhost:3001/api/manutencoes?maquinario=${id}`
        : 'http://localhost:3001/api/manutencoes';

      const response = await axios.get(url);
      setManutencoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar manutenções:', error);
    }
  };

  const formatDate = (data) => {
    if (!data) return '-';
    const d = new Date(data);
    return isNaN(d) ? '-' : d.toLocaleDateString('pt-BR');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Home</span> &gt; <span>Manutenções</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <TopActions>
            <BackButton onClick={() => navigate('/maquinariolist')}>Voltar</BackButton>
            <NewButton onClick={() => navigate(`/manutencoesform?maquinario=${maquinarioId}`)}>
              Nova Manutenção
            </NewButton>
          </TopActions>
          <Title>Manutenções</Title>
          <Table>
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Tipo</Th>
                <Th>Descrição</Th>
                <Th>Responsável</Th>
                <Th>Valor</Th>
                <Th>Próxima</Th>
                <Th>Observações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {manutencoes.map((m) => (
                <Tr key={m.id}>
                  <Td>{formatDate(m.datamanutencao)}</Td>
                  <Td>{m.tipo}</Td>
                  <Td>{m.descricao}</Td>
                  <Td>{m.responsavel}</Td>
                  <Td>R$ {Number(m.custo).toFixed(2)}</Td>
                  <Td>{formatDate(m.proximamanutencao)}</Td>
                  <Td>{m.observacoes}</Td>
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

export default ManutencoesList;
