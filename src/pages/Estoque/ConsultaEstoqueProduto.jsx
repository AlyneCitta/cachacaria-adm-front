import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper, PageContainer, Title, BreadcrumbWrapper, Breadcrumb,
  Table, Thead, Tbody, Tr, Th, Td,
  TabContainer, TabButton, FormSection
} from './style';

const ConsultaEstoqueProduto = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('movimentacoes');

  const movimentacoes = [
    { id: 1, tipo: 'Compra', fornecedorOuCliente: 'Augusto Enzo Erick Baptista', documento: '01-014', data: '01/01/2025', valor: 'R$ 95,00' },
    { id: 2, tipo: 'Compra', fornecedorOuCliente: 'Enzo Giovanni Luís Fogaça', documento: '01-013', data: '01/01/2025', valor: 'R$ 40,00' },
    { id: 3, tipo: 'Venda', fornecedorOuCliente: 'Emily Maitê Isabelly Brito', documento: '01-008', data: '01/01/2025', valor: 'R$ 150,00' },
  ];

  const lotes = [
    { id: 1, lote: 'LL10125', produzida: 150, saldo: 140, ordemProducao: '01-005' },
    { id: 2, lote: 'LL10124', produzida: 80, saldo: 10, ordemProducao: '01-004' },
  ];

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Principal</span> &gt; <span onClick={() => navigate('/etoquelist')}>Estoque</span> &gt; Consulta Estoque + NomeProduto
        </Breadcrumb>
      </BreadcrumbWrapper>

      <PageWrapper>
        <PageContainer>
          <Title>Estoque + NomeProduto</Title>

          <TabContainer>
            <TabButton active={activeTab === 'movimentacoes'} onClick={() => setActiveTab('movimentacoes')}>
              Movimentações
            </TabButton>
            <TabButton active={activeTab === 'lotes'} onClick={() => setActiveTab('lotes')}>
              Lotes
            </TabButton>
          </TabContainer>

          {activeTab === 'movimentacoes' && (
            <FormSection>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Tipo</Th>
                    <Th>Fornecedor/Cliente</Th>
                    <Th>Número Documento</Th>
                    <Th>Data</Th>
                    <Th>Valor Líq.</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {movimentacoes.map((mov) => (
                    <Tr key={mov.id}>
                      <Td>{mov.tipo}</Td>
                      <Td>{mov.fornecedorOuCliente}</Td>
                      <Td>{mov.documento}</Td>
                      <Td>{mov.data}</Td>
                      <Td>{mov.valor}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </FormSection>
          )}

          {activeTab === 'lotes' && (
            <FormSection>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Lote</Th>
                    <Th>Qtd Produzida</Th>
                    <Th>Qtd Saldo</Th>
                    <Th>Ordem Produção</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {lotes.map((lote) => (
                    <Tr key={lote.id}>
                      <Td>{lote.lote}</Td>
                      <Td>{lote.produzida}</Td>
                      <Td>{lote.saldo}</Td>
                      <Td>{lote.ordemProducao}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </FormSection>
          )}
        </PageContainer>
      </PageWrapper>

      <Footer />
    </>
  );
};

export default ConsultaEstoqueProduto;
