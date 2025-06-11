import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper,
  PageContainer,
  Title,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  BreadcrumbWrapper,
  Breadcrumb
} from './styles';

const ManutencoesList = () => {
  const navigate = useNavigate();

  const manutencoes = [
    {
      id: 1,
      data: '2023-11-15',
      tipo: 'Preventiva',
      descricao: 'Troca de óleo e ajustes',
      responsavel: 'João',
      custo: '250',
      proxima: '2024-11-15',
      observacoes: 'Tudo ok'
    },
    {
      id: 2,
      data: '2022-11-15',
      tipo: 'Corretiva',
      descricao: 'Substituição de válvula',
      responsavel: 'Carlos',
      custo: '480',
      proxima: '2023-11-15',
      observacoes: 'Peça original usada'
    }
  ];

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Home</span> &gt; <span>Manutenções</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Manutenções</Title>
          <Table>
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Tipo</Th>
                <Th>Descrição</Th>
                <Th>Responsável</Th>
                <Th>Valor</Th>
                <Th>Próxima</Th>
                <Th>Observações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {manutencoes.map((m) => (
                <Tr key={m.id}>
                  <Td>{m.data}</Td>
                  <Td>{m.tipo}</Td>
                  <Td>{m.descricao}</Td>
                  <Td>{m.responsavel}</Td>
                  <Td>R$ {m.custo}</Td>
                  <Td>{m.proxima}</Td>
                  <Td>{m.observacoes}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default ManutencoesList;
