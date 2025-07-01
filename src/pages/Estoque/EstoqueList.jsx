import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GlobalStyle from "../../globalStyle/style.js";
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
  BackButton,
  TopActions,
  FilterContainer,
  FilterTitle,
  FilterInput,
  ContentWrapper,
  TableWrapper,
} from './style';

const EstoqueList = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    codigo: '',
    descricao: '',
    categoria: '',
    sabor: '',
    unidade: '',
  });

  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get('/api/products');
        setEstoque(response.data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    }

    fetchProdutos();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const filteredEstoque = estoque.filter((item) =>
    item.codigo.toLowerCase().includes(filters.codigo.toLowerCase()) &&
    item.descricao.toLowerCase().includes(filters.descricao.toLowerCase()) &&
    item.categoria.toLowerCase().includes(filters.categoria.toLowerCase()) &&    
    item.unidade.toLowerCase().includes(filters.unidade.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/estoque/view/${id}`);
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <BreadcrumbWrapper>
          <Breadcrumb>
            <span onClick={() => navigate('/home')}>Principal</span> &gt; <span onClick={() => navigate('/etoquelist')}>Estoque</span>
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
                      <Th>Código</Th>
                      <Th>Descrição</Th>
                      <Th>Ativo</Th>
                      <Th>Tem Composição</Th>
                      <Th>Preço</Th>
                      <Th>Capacidade (ml)</Th>
                      <Th>Custo</Th>
                      <Th>Estoque Mínimo</Th>                      
                      <Th>Data Cadastro</Th>
                      <Th>Data Alteração</Th>
                      <Th>Categoria</Th>
                      <Th>Unidade</Th>
                      <Th>Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredEstoque.map((item) => (
                      <Tr key={item.id_produto}>
                        <Td>{item.codigo}</Td>
                        <Td>{item.descricao}</Td>
                        <Td>{item.ativo ? 'Sim' : 'Não'}</Td>
                        <Td>{item.temcomposicao ? 'Sim' : 'Não'}</Td>
                        <Td>{formatCurrency(item.preco)}</Td>
                        <Td>{item.capacidade_ml}</Td>
                        <Td>{formatCurrency(item.custo)}</Td>
                        <Td>{item.estoqueminimo}</Td>                        
                        <Td>{formatDate(item.dtacadastro)}</Td>
                        <Td>{formatDate(item.dtaalteracao)}</Td>
                        <Td>{item.categoria}</Td>                        
                        <Td>{item.unidade}</Td>
                        <Td>
                          <Actions>
                            <EditButton onClick={() => handleEdit(item.id_produto)}>Visualizar</EditButton>
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
                  placeholder="Código"
                  value={filters.codigo}
                  onChange={(e) => setFilters({ ...filters, codigo: e.target.value })}
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
                <FilterInput
                  placeholder="Unidade"
                  value={filters.unidade}
                  onChange={(e) => setFilters({ ...filters, unidade: e.target.value })}
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

export default EstoqueList;