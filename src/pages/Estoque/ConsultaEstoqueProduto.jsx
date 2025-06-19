import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GlobalStyle from "../../globalStyle/style.js";
import {
  PageWrapper, PageContainer, Title, BreadcrumbWrapper, Breadcrumb,
  Table, Thead, Tbody, Tr, Th, Td,
  TabContainer, TabButton, FormSection, TopActions, BackButton
} from './style';

const ConsultaEstoqueProduto = () => {
  const navigate = useNavigate();
  const { IdProduct } = useParams();

  const [activeTab, setActiveTab] = useState('movimentacoes');
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    async function fetchMovimentacoes() {
      try {
        const response = await api.get(`/api/estoque/${IdProduct}`);
        if (response.data.message === 'EmptyList') {
          setMovimentacoes([]);
        } else {
          setMovimentacoes(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar movimentações:', error);
      }
    }

    async function fetchLotes() {
      try {
        const response = await api.get(`/api/estoque/saldo/${IdProduct}`);
        if (response.data.message === 'EmptyList') {
          setLotes([]);
        } else {
          setLotes(response.data);
        }
      } catch (error) {
        console.error('Erro ao carregar lotes:', error);
      }
    }

    fetchMovimentacoes();
    fetchLotes();
  }, [IdProduct]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <BreadcrumbWrapper>
          <Breadcrumb>
            <span onClick={() => navigate('/home')}>Principal</span> &gt;
            <span onClick={() => navigate('/etoquelist')}> Estoque</span> &gt; <span> Consulta Estoque</span>
          </Breadcrumb>
        </BreadcrumbWrapper>

        <PageWrapper>
          <PageContainer>
            <Title>Consulta Estoque - Produto {IdProduct}</Title>
            <TopActions>
              <BackButton onClick={() => navigate('/estoque')}>Voltar</BackButton>
            </TopActions>

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
                      <Th>Quantidade Movimento</Th>
                      <Th>Data Movimento</Th>
                      <Th>Origem Movimento</Th>
                      <Th>Número Documento</Th>
                      <Th>Código</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {movimentacoes.map((mov) => (
                      <Tr key={mov.id}>
                        <Td>{mov.qtdmov}</Td>
                        <Td>{formatDate(mov.dtamov)}</Td>
                        <Td>{mov.origemmovimento}</Td>
                        <Td>{mov.nrodocto}</Td>
                        <Td>{mov.codigo}</Td>
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
                      <Th>Código</Th>
                      <Th>Data Produção</Th>
                      <Th>Data Validade</Th>
                      <Th>Qtd Produzido</Th>
                      <Th>Saldo</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {lotes.map((lote) => (
                      <Tr key={lote.id}>
                        <Td>{lote.codigo}</Td>
                        <Td>{formatDate(lote.dtaproducao)}</Td>
                        <Td>{formatDate(lote.dtavalidade)}</Td>
                        <Td>{lote.qtdproduzido}</Td>
                        <Td>{lote.saldo}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </FormSection>
            )}
          </PageContainer>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
};

export default ConsultaEstoqueProduto;
