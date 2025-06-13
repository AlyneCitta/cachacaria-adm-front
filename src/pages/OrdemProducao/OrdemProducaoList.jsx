import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    produto: '',
    documento: '',
    data: '',
  });

  const [ordens] = useState([
    { id: 1, produto: 'Licor de Limão 1L', documento: '014', data: '01/01/2025', quantidade: 5 },
    { id: 2, produto: 'Licor de Maracujá 1L', documento: '013', data: '01/01/2025', quantidade: 10 },
    { id: 3, produto: 'Vodka 900ml', documento: '011', data: '01/01/2025', quantidade: 15 },
  ]);

  const filteredOrdens = ordens.filter(o =>
    o.produto.toLowerCase().includes(filters.produto.toLowerCase()) &&
    o.documento.includes(filters.documento) &&
    o.data.includes(filters.data)
  );

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Principal</span> &gt; Ordem de Produção
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Ordem de Produção</Title>
          <TopActions>
            <BackButton onClick={() => navigate('/home')}>Voltar</BackButton>
            <NewButton onClick={() => navigate('/ordemproducao/form')}>Nova Ordem</NewButton>
          </TopActions>

          <ContentWrapper>
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Produto Produzido</Th>
                    <Th>Número Documento</Th>
                    <Th>Data Produção</Th>
                    <Th>Quantidade</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredOrdens.map((o) => (
                    <Tr key={o.id}>
                      <Td>{o.produto}</Td>
                      <Td>{o.documento}</Td>
                      <Td>{o.data}</Td>
                      <Td>{o.quantidade}</Td>
                      <Td>
                        <Actions>
                          <EditButton onClick={() => navigate(`/ordemproducao/form/${o.id}`)}>Editar</EditButton>
                          <DeleteButton>Excluir</DeleteButton>
                        </Actions>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableWrapper>

            <FilterContainer>
              <FilterTitle>Filtros</FilterTitle>
              <FilterInput placeholder="Produto" value={filters.produto} onChange={e => setFilters({ ...filters, produto: e.target.value })} />
              <FilterInput placeholder="Número de Documento" value={filters.documento} onChange={e => setFilters({ ...filters, documento: e.target.value })} />
              <FilterInput placeholder="Data Produção" value={filters.data} onChange={e => setFilters({ ...filters, data: e.target.value })} />
            </FilterContainer>
          </ContentWrapper>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default OrdemProducaoList;
