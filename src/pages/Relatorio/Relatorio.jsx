// Relatorio.jsx - atualizado para funcionar com backend
import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import {
  Wrapper,
  Container,
  Title,
  IconWrapper,
  CardContainer,
  Card,
  CardIcon,
  CardTitle,
  GenerateButton
} from './Style';

import { FaFileAlt, FaCarrot, FaCalendarAlt } from 'react-icons/fa';

const Relatorio = () => {
  const [dados, setDados] = useState(null);

  const gerarRelatorioBebidas = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/relatorio/bebidas');
    setDados({ titulo: 'Relatório de Movimentação de Bebidas', itens: res.data });
  } catch (error) {
    console.error('Erro ao gerar relatório de bebidas:', error);
    alert('Erro ao buscar dados de bebidas. Verifique a conexão com o banco de dados.');
  }
};

  const gerarRelatorioIngredientes = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/relatorio/ingredientes');
    setDados({ titulo: 'Relatório de Ingredientes Utilizados', itens: res.data });
  } catch (error) {
    console.error('Erro ao gerar relatório de ingredientes:', error);
    alert('Erro ao buscar dados de ingredientes. Verifique a conexão com o banco de dados.');
  }
};

const gerarRelatorioVendas = async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/relatorio/vendas?inicio=2025-05-01&fim=2025-05-31');
    setDados({ titulo: 'Relatório de Vendas - Maio 2025', itens: res.data });
  } catch (error) {
    console.error('Erro ao gerar relatório de vendas:', error);
    alert('Erro ao buscar dados de vendas. Verifique a conexão com o banco de dados.');
  }
};

  return (
    <Wrapper>
      <Header />
      <Container>
        <IconWrapper>
          <FaFileAlt size={60} color="#3b82f6" />
          <Title>RELATÓRIOS</Title>
        </IconWrapper>

        <CardContainer>
          <Card>
            <CardIcon><FaFileAlt size={32} /></CardIcon>
            <CardTitle>RELATÓRIO DE MOVIMENTAÇÃO</CardTitle>
            <GenerateButton onClick={gerarRelatorioBebidas}>GERAR</GenerateButton>
          </Card>

          <Card>
            <CardIcon><FaCarrot size={32} /></CardIcon>
            <CardTitle>INGREDIENTES UTILIZADOS</CardTitle>
            <GenerateButton onClick={gerarRelatorioIngredientes}>GERAR</GenerateButton>
          </Card>

          <Card>
            <CardIcon><FaCalendarAlt size={32} /></CardIcon>
            <CardTitle>RELATÓRIO POR PERÍODO</CardTitle>
            <GenerateButton onClick={gerarRelatorioVendas}>GERAR</GenerateButton>
          </Card>
        </CardContainer>

        {dados && (
          <div style={{ marginTop: 40, width: '100%', maxWidth: 1000 }}>
            <h3>{dados.titulo}</h3>
            <pre style={{
              backgroundColor: '#f4f4f4',
              padding: '20px',
              borderRadius: '8px',
              overflowX: 'auto'
            }}>
              {JSON.stringify(dados.itens, null, 2)}
            </pre>
          </div>
        )}
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Relatorio;
