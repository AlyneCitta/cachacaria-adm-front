import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
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
  BackButton,
  NewButton,
  TopActions,
  FilterContainer,
  FilterTitle,
  FilterInput,
  ContentWrapper,
  TableWrapper,
} from './Style';

const ComprasList = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    fornecedor: '',
    documento: '',
    protocolo: '',
    chave: '',
    dataEmissao: '',
    dataEntrada: '',
    valorBruto: '',
    valorLiquido: '',
    valorFrete: '',
  });

  const [compras, setCompras] = useState([]);

  useEffect(() => {
    async function fetchCompras() {
      try {
        const response = await api.get('/api/compravenda/compra');
        if (response.data.message === 'EmptyList') {
          setCompras([]);
        } else {
          setCompras(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar compras:', error);
      }
    }

    fetchCompras();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const filteredCompras = compras.filter((c) =>
    c.nome.toLowerCase().includes(filters.fornecedor.toLowerCase()) &&
    c.nrodocto.toLowerCase().includes(filters.documento.toLowerCase()) &&
    c.protocoloaut.toLowerCase().includes(filters.protocolo.toLowerCase()) &&
    c.chavenfe.toLowerCase().includes(filters.chave.toLowerCase()) &&
    formatDate(c.dtaemissao).includes(filters.dataEmissao) &&
    formatDate(c.dtaentrada).includes(filters.dataEntrada) &&
    formatCurrency(c.valorbruto).includes(filters.valorBruto) &&
    formatCurrency(c.valorliquido).includes(filters.valorLiquido) &&
    formatCurrency(c.valorfrete).includes(filters.valorFrete)
  );

  const handleNew = () => {
    navigate('/compras/new');
  };

  const handleEdit = (id) => {
    navigate(`/compras/view/${id}`);
  };

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
            <NewButton onClick={handleNew}>Nova Compra</NewButton>
          </TopActions>

          <ContentWrapper>
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Fornecedor</Th>
                    <Th>Nº Documento</Th>
                    <Th>Protocolo Autorização</Th>
                    <Th>Chave NFe</Th>
                    <Th>Data Emissão</Th>
                    <Th>Data Entrada</Th>
                    <Th>Valor Bruto</Th>
                    <Th>Valor Líquido</Th>
                    <Th>Valor Frete</Th>
                    <Th>Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredCompras.map((c) => (
                    <Tr key={c.id}>
                      <Td>{c.nome}</Td>
                      <Td>{c.nrodocto}</Td>
                      <Td>{c.protocoloaut}</Td>
                      <Td>{c.chavenfe}</Td>
                      <Td>{formatDate(c.dtaemissao)}</Td>
                      <Td>{formatDate(c.dtaentrada)}</Td>
                      <Td>{formatCurrency(c.valorbruto)}</Td>
                      <Td>{formatCurrency(c.valorliquido)}</Td>
                      <Td>{formatCurrency(c.valorfrete)}</Td>
                      <Td>
                        <Actions>
                          <EditButton onClick={() => handleEdit(c.id)}>Visualizar</EditButton>
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
                placeholder="Fornecedor"
                value={filters.fornecedor}
                onChange={(e) => setFilters({ ...filters, fornecedor: e.target.value })}
              />
              <FilterInput
                placeholder="Nº Documento"
                value={filters.documento}
                onChange={(e) => setFilters({ ...filters, documento: e.target.value })}
              />
              <FilterInput
                placeholder="Protocolo Autorização"
                value={filters.protocolo}
                onChange={(e) => setFilters({ ...filters, protocolo: e.target.value })}
              />
              <FilterInput
                placeholder="Chave NFe"
                value={filters.chave}
                onChange={(e) => setFilters({ ...filters, chave: e.target.value })}
              />
              <FilterInput
                placeholder="Data Emissão (dd/mm/aaaa)"
                value={filters.dataEmissao}
                onChange={(e) => setFilters({ ...filters, dataEmissao: e.target.value })}
              />
              <FilterInput
                placeholder="Data Entrada (dd/mm/aaaa)"
                value={filters.dataEntrada}
                onChange={(e) => setFilters({ ...filters, dataEntrada: e.target.value })}
              />
              <FilterInput
                placeholder="Valor Bruto"
                value={filters.valorBruto}
                onChange={(e) => setFilters({ ...filters, valorBruto: e.target.value })}
              />
              <FilterInput
                placeholder="Valor Líquido"
                value={filters.valorLiquido}
                onChange={(e) => setFilters({ ...filters, valorLiquido: e.target.value })}
              />
              <FilterInput
                placeholder="Valor Frete"
                value={filters.valorFrete}
                onChange={(e) => setFilters({ ...filters, valorFrete: e.target.value })}
              />
            </FilterContainer>
          </ContentWrapper>
        </PageContainer>
      </PageWrapper>

      <Footer />
    </>
  );
};

export default ComprasList;
