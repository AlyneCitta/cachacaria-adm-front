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

const VendasList = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    cliente: '',
    documento: '',
    data: '',
    valor: '',
  });

  const [vendas] = useState([
    { id: 1, cliente: 'Cliente 1', documento: '01-001', data: '01/01/2025', valor: 'R$ 300,00' },
    { id: 2, cliente: 'Cliente 2', documento: '01-002', data: '01/01/2025', valor: 'R$ 400,00' },
  ]);

  const filteredVendas = vendas.filter(v =>
    v.cliente.toLowerCase().includes(filters.cliente.toLowerCase()) &&
    v.documento.includes(filters.documento) &&
    v.data.includes(filters.data) &&
    v.valor.includes(filters.valor)
  );

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Principal</span> &gt; Vendas
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Vendas</Title>
          <TopActions>
            <BackButton onClick={() => navigate('/home')}>Voltar</BackButton>
            <NewButton onClick={() => navigate('/vendas/form')}>Nova Venda</NewButton>
          </TopActions>

          <ContentWrapper>
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Cliente</Th>
                    <Th>Número Documento</Th>
                    <Th>Data Emissão</Th>
                    <Th>Valor Líq.</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredVendas.map((v) => (
                    <Tr key={v.id}>
                      <Td>{v.cliente}</Td>
                      <Td>{v.documento}</Td>
                      <Td>{v.data}</Td>
                      <Td>{v.valor}</Td>
                      <Td>
                        <Actions>
                          <EditButton onClick={() => navigate(`/vendas/form/${v.id}`)}>Editar</EditButton>
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
              <FilterInput placeholder="Cliente" value={filters.cliente} onChange={e => setFilters({ ...filters, cliente: e.target.value })} />
              <FilterInput placeholder="Número de Documento" value={filters.documento} onChange={e => setFilters({ ...filters, documento: e.target.value })} />
              <FilterInput placeholder="Data Emissão" value={filters.data} onChange={e => setFilters({ ...filters, data: e.target.value })} />
              <FilterInput placeholder="Valor Líquido" value={filters.valor} onChange={e => setFilters({ ...filters, valor: e.target.value })} />
            </FilterContainer>
          </ContentWrapper>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default VendasList;
