import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStyle from "../../globalStyle/style.js";
import api from '../../api/api'; // Ajuste o caminho se necessário
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

  const [itens, setItens] = useState([]);

  //
  // Carrega os produtos da API ao montar o componente
  //
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get('/api/products');
        if (response.data.message === 'EmptyList') {
          setItens([]);
        } else {
          setItens(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    }

    fetchProdutos();
  }, []);

  //
  // Aplica filtros dinamicamente
  //
  const filteredItens = itens.filter((item) =>
    item.descricao.toLowerCase().includes(filters.descricao.toLowerCase()) &&
    item.categoria.toLowerCase().includes(filters.categoria.toLowerCase()) &&
    item.sabor.toLowerCase().includes(filters.sabor.toLowerCase())
  );

  const handleEdit = (produtoId) => {
    navigate(`/bebidas/edit/${produtoId}`);
  };

  const handleDelete = (id, codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      async function deleteProduct() {
        try {
          await api.delete(`/api/products/${id}`);
          alert(`Item ${codigo} excluído com sucesso!`);
          setItens((prevItens) => prevItens.filter((item) => item.id_produto !== id));
        } catch (error) {
          console.error('Erro ao deletar produto:', error);
          if (error.response && error.response.data && error.response.data.message) {
            alert(`Erro: ${error.response.data.message}`);
          } else {
            alert('Erro ao deletar o produto.');
          }
        }
      }

      deleteProduct();  // <<< Aqui chama a função de fato
    }
  };

  const handleNew = () => {
    navigate('/bebidas/new');
  };

  const handleBack = () => {
    navigate('/home');
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goToProdutos = () => {
    navigate('/bebidas');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };



  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <BreadcrumbWrapper>
          <Breadcrumb>
            <span onClick={goToHome}>Principal</span> &gt; <span onClick={goToProdutos}>Bebidas</span>
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
                      <Th>Código</Th>
                      <Th>Descrição</Th>
                      <Th>Categoria</Th>
                      <Th>Sabor</Th>
                      <Th>Preço</Th>
                      <Th>Capacida ML</Th>
                      <Th>Custo</Th>
                      <Th>Estoque Mínimo</Th>
                      <Th>Código EAN</Th>
                      <Th>Código de Barras</Th>
                      <Th>Data Cadastro</Th>
                      <Th>Data Alteração</Th>
                      <Th>Unidade</Th>
                      <Th>Ativo</Th>
                      <Th>Tem Composição</Th>
                      <Th>Ações</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredItens.map((item) => (
                      <Tr key={item.id_produto}>
                        <Td>{item.codigo}</Td>
                        <Td>{item.descricao}</Td>
                        <Td>{item.categoria}</Td>
                        <Td>{item.sabor}</Td>
                        <Td>{item.preco}</Td>
                        <Td>{item.capacidade_ml}</Td>
                        <Td>{item.custo}</Td>
                        <Td>{item.estoqueminimo}</Td>
                        <Td>{item.codigoean}</Td>
                        <Td>{item.codigobarras}</Td>
                        <Td>{formatDate(item.dtacadastro)}</Td>
                        <Td>{formatDate(item.dtaalteracao)}</Td>
                        <Td>{item.unidade}</Td>
                        <Td>{item.ativo}</Td>
                        <Td>{item.temcomposicao}</Td>
                        <Td>
                          <Actions>
                            <EditButton onClick={() => handleEdit(item.id_produto)}>Editar</EditButton>
                            <DeleteButton onClick={() => handleDelete(item.id_produto, item.codigo)}>Excluir</DeleteButton>
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
      </main>
      <Footer />
    </>
  );
};

export default ProdutoList;
