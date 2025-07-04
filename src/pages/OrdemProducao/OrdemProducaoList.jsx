import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import GlobalStyle from "../../globalStyle/style.js";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper, PageContainer, Title, BreadcrumbWrapper, Breadcrumb,
  Table, Thead, Tbody, Tr, Th, Td, Actions, EditButton, DeleteButton,
  BackButton, NewButton, TopActions, FilterContainer, FilterTitle, FilterInput,
  ContentWrapper, TableWrapper
} from './Style';

const OrdemProducaoList = () => {
  const [ordens, setOrdens] = useState([]);
  const [filters, setFilters] = useState({
    produto: '',
    documento: '',
    data: '',
  });

  const navigate = useNavigate();

  async function fetchOrdens() {
    try {
      const response = await api.get('/api/producao/ordemproducao');
      setOrdens(response.data);
    } catch (error) {
      console.error('Erro ao carregar ordens de produção:', error);
    }
  }

  useEffect(() => {
    fetchOrdens();
  }, []);


  const handleView = (produtoId) => {
    navigate(`/producao/view/${produtoId}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta ordem de produção?")) return;

    try {
      await api.delete(`/api/producao/${id}`);
      alert("Ordem excluída com sucesso!");
      fetchOrdens(); // Atualiza a lista
    } catch (err) {
      console.error("Erro ao excluir ordem:", err);
      alert("Erro ao excluir ordem de produção.");
    }
  };

  const filteredOrdens = ordens.filter(o =>
    (o.descricao || '').toLowerCase().includes(filters.produto.toLowerCase()) &&
    (o.nroordemproducao || '').toLowerCase().includes(filters.documento.toLowerCase()) &&
    (new Date(o.dtaproducao).toLocaleDateString('pt-BR') || '').includes(filters.data)
  );

  return (
    <>
      <GlobalStyle />
      <main>
        <Header />
        <BreadcrumbWrapper>
          <Breadcrumb>
            <span onClick={() => navigate('/home')}>Principal</span> &gt; <span onClick={() => navigate('/producao')}>Ordem de Produção</span>
          </Breadcrumb>
        </BreadcrumbWrapper>
        <PageWrapper>
          <PageContainer>
            <Title>Ordem de Produção</Title>

            <TopActions>
              <BackButton onClick={() => navigate('/home')}>Voltar</BackButton>
              <NewButton onClick={() => navigate('/producao/new')}>Nova Ordem</NewButton>
            </TopActions>

            <ContentWrapper>
              <TableWrapper>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Nº Ordem de Produção</Th>
                      <Th>Produto</Th>
                      <Th>Data Produção</Th>
                      <Th>Quantidade Produzida</Th>
                      <Th>Custo Produção</Th>
                      <Th>Código Lote</Th>
                      <Th>Responsável</Th>
                      <Th>Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredOrdens.map((o) => (
                      <Tr key={o.id}>
                        <Td>{o.nroordemproducao}</Td>
                        <Td>{o.descricao}</Td>
                        <Td>{new Date(o.dtaproducao).toLocaleDateString('pt-BR')}</Td>
                        <Td>{o.qtdproduzida}</Td>
                        <Td>{o.custoproducao?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Td>
                        <Td>{o.codigolote}</Td>
                        <Td>{o.nome}</Td>
                        <Td>
                          <Actions>
                            <EditButton onClick={() => handleView(o.id)}>Visualizar</EditButton>
                            <DeleteButton onClick={() => handleDelete(o.id)}>Excluir</DeleteButton>
                          </Actions>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableWrapper>

              <FilterContainer>
                <FilterTitle>Filtros</FilterTitle>
                <FilterInput
                  placeholder="Produto"
                  value={filters.produto}
                  onChange={e => setFilters({ ...filters, produto: e.target.value })}
                />
                <FilterInput
                  placeholder="Nº Ordem de Produção"
                  value={filters.documento}
                  onChange={e => setFilters({ ...filters, documento: e.target.value })}
                />
                <FilterInput
                  placeholder="Data Produção (dd/mm/aaaa)"
                  value={filters.data}
                  onChange={e => setFilters({ ...filters, data: e.target.value })}
                />
              </FilterContainer>
            </ContentWrapper>
          </PageContainer>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
};

export default OrdemProducaoList;
