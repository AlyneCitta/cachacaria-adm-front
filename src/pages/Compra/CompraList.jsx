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

const ComprasList = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    fornecedor: '',
    documento: '',
    data: '',
    valor: '',
  });

  const [compras] = useState([
    { id: 1, fornecedor: 'Fornecedor 1', documento: '01-001', data: '01/01/2025', valor: 'R$ 100,00' },
    { id: 2, fornecedor: 'Fornecedor 2', documento: '01-002', data: '01/01/2025', valor: 'R$ 200,00' },
  ]);

  const filteredCompras = compras.filter(c =>
    c.fornecedor.toLowerCase().includes(filters.fornecedor.toLowerCase()) &&
    c.documento.includes(filters.documento) &&
    c.data.includes(filters.data) &&
    c.valor.includes(filters.valor)
  );

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Principal</span> &gt; Compras
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Compras</Title>
          <TopActions>
            <BackButton onClick={() => navigate('/home')}>Voltar</BackButton>
            <NewButton onClick={() => navigate('/compras/form')}>Nova Compra</NewButton>
          </TopActions>

          <ContentWrapper>
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Fornecedor</Th>
                    <Th>Número Documento</Th>
                    <Th>Data Entrada</Th>
                    <Th>Valor Líq.</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredCompras.map((c) => (
                    <Tr key={c.id}>
                      <Td>{c.fornecedor}</Td>
                      <Td>{c.documento}</Td>
                      <Td>{c.data}</Td>
                      <Td>{c.valor}</Td>
                      <Td>
                        <Actions>
                          <EditButton onClick={() => navigate(`/compras/form/${c.id}`)}>Editar</EditButton>
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
              <FilterInput placeholder="Fornecedor" value={filters.fornecedor} onChange={e => setFilters({ ...filters, fornecedor: e.target.value })} />
              <FilterInput placeholder="Número de Documento" value={filters.documento} onChange={e => setFilters({ ...filters, documento: e.target.value })} />
              <FilterInput placeholder="Data Entrada" value={filters.data} onChange={e => setFilters({ ...filters, data: e.target.value })} />
              <FilterInput placeholder="Valor Líquido" value={filters.valor} onChange={e => setFilters({ ...filters, valor: e.target.value })} />
            </FilterContainer>
          </ContentWrapper>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default ComprasList;
