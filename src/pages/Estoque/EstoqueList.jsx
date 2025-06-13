import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper, PageContainer, Title, BreadcrumbWrapper, Breadcrumb,
  Table, Thead, Tbody, Tr, Th, Td, Actions, EditButton,
  BackButton, TopActions, FilterContainer, FilterTitle, FilterInput,
  ContentWrapper, TableWrapper
} from './style';

const EstoqueList = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    produto: '',
    descricao: '',
    categoria: '',
    sabor: '',
  });

  const [estoque] = useState([
    { id: 1, descricao: 'Licor de Limão 1L', categoria: 'Licor', sabor: 'Limão', quantidade: 23 },
    { id: 2, descricao: 'Licor de Maracujá 1L', categoria: 'Licor', sabor: 'Maracujá', quantidade: 25 },
    { id: 3, descricao: 'Coquetel de Bitter 1L', categoria: 'Coquetel Alcoólico', sabor: 'Bitter', quantidade: 35 },
    { id: 4, descricao: 'Vodka 900ml', categoria: 'Vodka', sabor: 'Vodka', quantidade: 34 },
    { id: 5, descricao: 'Cachaça 900ml', categoria: 'Cachaça', sabor: 'Aguardente de Cana', quantidade: 43 },
  ]);

  const filteredEstoque = estoque.filter((item) =>
    item.descricao.toLowerCase().includes(filters.descricao.toLowerCase()) &&
    item.categoria.toLowerCase().includes(filters.categoria.toLowerCase()) &&
    item.sabor.toLowerCase().includes(filters.sabor.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/produtos/form/${id}`);
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Principal</span> &gt; Estoque
        </Breadcrumb>
      </BreadcrumbWrapper>

      <PageWrapper>
        <PageContainer>
          <Title>Estoque</Title>

          <TopActions>
            <BackButton onClick={() => navigate('/home')}>Voltar</BackButton>
          </TopActions>

          <ContentWrapper>
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Descrição</Th>
                    <Th>Categoria</Th>
                    <Th>Sabor</Th>
                    <Th>Quantidade</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredEstoque.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.descricao}</Td>
                      <Td>{item.categoria}</Td>
                      <Td>{item.sabor}</Td>
                      <Td>{item.quantidade}</Td>
                      <Td>
                        <Actions>
                          <EditButton onClick={() => handleEdit(item.id)}>Visualizar</EditButton>
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
                onChange={(e) => setFilters({ ...filters, produto: e.target.value })}
              />
              <FilterInput
                placeholder="Descrição"
                value={filters.descricao}
                onChange={(e) => setFilters({ ...filters, descricao: e.target.value })}
              />
              <FilterInput
                placeholder="Categoria"
                value={filters.categoria}
                onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
              />
              <FilterInput
                placeholder="Sabor"
                value={filters.sabor}
                onChange={(e) => setFilters({ ...filters, sabor: e.target.value })}
              />
            </FilterContainer>
          </ContentWrapper>
        </PageContainer>
      </PageWrapper>

      <Footer />
    </>
  );
};

export default EstoqueList;
