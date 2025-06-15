import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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
  BackButton,
  Actions,
  EditButton,
  DeleteButton
} from './styles';

const ManutencoesList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const maquinaId = searchParams.get('maquinario');
  const [manutencoes, setManutencoes] = useState([]);

  // Força rolagem para o topo ao carregar o componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchList = () => {
    fetch(`http://localhost:3001/api/manutencoes?maquinario=${maquinaId}`)
      .then(res => res.json())
      .then(setManutencoes)
      .catch(console.error);
  };

  useEffect(fetchList, [maquinaId]);

  const onEdit = (id) => {
    navigate(`/manutencoesform?maquinario=${maquinaId}&id=${id}`);
  };

  const onDelete = async (id) => {
    if (!window.confirm('Deseja excluir esta manutenção?')) return;
    const res = await fetch(`http://localhost:3001/api/manutencoes/${id}`, { method: 'DELETE' });
    if (res.ok) fetchList();
    else alert('Falha ao excluir');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Home</span> &gt; 
          <span onClick={() => navigate('/maquinariolist')}> Maquinários</span> &gt;
          <span> Manutenções</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Manutenções</Title>
          <TopActions>
            <BackButton onClick={() => navigate('/maquinariolist')}>
              Voltar
            </BackButton>
            <NewButton onClick={() => navigate(`/manutencoesform?maquinario=${maquinaId}`)}>
              Nova Manutenção
            </NewButton>
          </TopActions>

          <Table>
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Tipo</Th>
                <Th>Descrição</Th>
                <Th>Responsável</Th>
                <Th>Custo</Th>
                <Th>Próxima</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {manutencoes.map(m => (
                <Tr key={m.id}>
                  <Td>{new Date(m.datamanutencao).toLocaleDateString()}</Td>
                  <Td>{m.tipo}</Td>
                  <Td>{m.descricao}</Td>
                  <Td>{m.responsavel}</Td>
                  <Td>R$ {Number(m.custo).toFixed(2)}</Td>
                  <Td>{m.proximamanutencao ? new Date(m.proximamanutencao).toLocaleDateString() : '—'}</Td>
                  <Td>
                    <Actions>
                      <EditButton onClick={() => onEdit(m.id)}>Editar</EditButton>
                      <DeleteButton onClick={() => onDelete(m.id)}>Excluir</DeleteButton>
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

export default ManutencoesList;
