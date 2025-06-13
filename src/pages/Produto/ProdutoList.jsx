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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Actions,
  EditButton,
  DeleteButton,
  BackButton,
  NewButton,
  TopActions,
  FilterContainer,
  FilterTitle,
  FilterInput,
  ContentWrapper,
  TableWrapper,
} from './Style';

const ProdutoList = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    descricao: '',
    categoria: '',
    sabor: '',
  });

  const [itens] = useState([
    { id: 1, descricao: 'Licor de Limão 1L', categoria: 'Licor', sabor: 'Limão', quantidade: 23 },
    { id: 2, descricao: 'Licor de Maracujá 1L', categoria: 'Licor', sabor: 'Maracujá', quantidade: 25 },
    { id: 3, descricao: 'Coquetel de Bitter 1L', categoria: 'Coquetel Alcoólico', sabor: 'Bitter', quantidade: 35 },
    { id: 4, descricao: 'Vodka 900ml', categoria: 'Vodka', sabor: 'Vodka', quantidade: 34 },
    { id: 5, descricao: 'Cachaça 900ml', categoria: 'Cachaça', sabor: 'Aguardente de Cana', quantidade: 43 },
  ]);

  const filteredItens = itens.filter((item) =>
    item.descricao.toLowerCase().includes(filters.descricao.toLowerCase()) &&
    item.categoria.toLowerCase().includes(filters.categoria.toLowerCase()) &&
    item.sabor.toLowerCase().includes(filters.sabor.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/itens/form/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      alert(`Item ${id} excluído`);
    }
  };

  const handleNew = () => {
    navigate('/itens/form');
  };

  const handleBack = () => {
    navigate('/home');
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goToProdutos = () => {
    navigate('/produtolist');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={goToHome}>Principal</span> &gt; <span onClick={goToProdutos}>Produtos</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Itens</Title>

          <TopActions>
            <BackButton onClick={handleBack}>Voltar</BackButton>
            <NewButton onClick={handleNew}>Novo Item</NewButton>
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
                  {filteredItens.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.descricao}</Td>
                      <Td>{item.categoria}</Td>
                      <Td>{item.sabor}</Td>
                      <Td>{item.quantidade}</Td>
                      <Td>
                        <Actions>
                          <EditButton onClick={() => handleEdit(item.id)}>Editar</EditButton>
                          <DeleteButton onClick={() => handleDelete(item.id)}>Excluir</DeleteButton>
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

export default ProdutoList;
