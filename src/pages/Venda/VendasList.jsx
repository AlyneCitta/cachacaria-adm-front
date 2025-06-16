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

const VendasList = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    cliente: '',
    documento: '',
    protocolo: '',
    chave: '',
    dataEmissao: '',
    dataEntrada: '',
    valorBruto: '',
    valorLiquido: '',
    valorFrete: '',
    natureza: '',
  });

  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    async function fetchVendas() {
      try {
        const response = await api.get('/api/compravenda/venda');
        if (response.data.message === 'EmptyList') {
          setVendas([]);
        } else {
          setVendas(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar vendas:', error);
      }
    }

    fetchVendas();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const filteredVendas = vendas.filter((v) =>
    v.nome.toLowerCase().includes(filters.cliente.toLowerCase()) &&
    v.nrodocto.toLowerCase().includes(filters.documento.toLowerCase()) &&
    v.protocoloaut.toLowerCase().includes(filters.protocolo.toLowerCase()) &&
    v.chavenfe.toLowerCase().includes(filters.chave.toLowerCase()) &&
    formatDate(v.dtaemissao).includes(filters.dataEmissao) &&
    formatDate(v.dtaentrada).includes(filters.dataEntrada) &&
    formatCurrency(v.valorbruto).includes(filters.valorBruto) &&
    formatCurrency(v.valorliquido).includes(filters.valorLiquido) &&
    formatCurrency(v.valorfrete).includes(filters.valorFrete) &&
    v.naturezamovimentacao.toLowerCase().includes(filters.natureza.toLowerCase())
  );

  const handleNew = () => {
    navigate('/vendas/new');
  };

  const handleEdit = (id) => {
    navigate(`/vendas/view/${id}`);
  };

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
            <NewButton onClick={handleNew}>Nova Venda</NewButton>
          </TopActions>

          <ContentWrapper>
            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Cliente</Th>
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
                  {filteredVendas.map((v) => (
                    <Tr key={v.id}>
                      <Td>{v.nome}</Td>
                      <Td>{v.nrodocto}</Td>
                      <Td>{v.protocoloaut}</Td>
                      <Td>{v.chavenfe}</Td>
                      <Td>{formatDate(v.dtaemissao)}</Td>
                      <Td>{formatDate(v.dtaentrada)}</Td>
                      <Td>{formatCurrency(v.valorbruto)}</Td>
                      <Td>{formatCurrency(v.valorliquido)}</Td>
                      <Td>{formatCurrency(v.valorfrete)}</Td>
                      <Td>
                        <Actions>
                          <EditButton onClick={() => handleEdit(v.id)}>Visualizar</EditButton>
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
                placeholder="Cliente"
                value={filters.cliente}
                onChange={(e) => setFilters({ ...filters, cliente: e.target.value })}
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

export default VendasList;
