import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GlobalStyle from "../../globalStyle/style.js";
import {
  Wrapper,
  Container,
  Title,
  IconWrapper,
  CardContainer,
  Card,
  CardIcon,
  CardTitle,
  GenerateButton,
  BreadcrumbWrapper,
  Breadcrumb,
} from './Style';

import { FaFileAlt, FaCarrot, FaCalendarAlt } from 'react-icons/fa';

const Relatorio = () => {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <main>
          <BreadcrumbWrapper>
            <Breadcrumb>
              <span onClick={() => navigate('/home')}>Principal</span> &gt; <span onClick={() => navigate('/relatorio')}>Relatórios</span>
            </Breadcrumb>
          </BreadcrumbWrapper>
          <Container>
            <IconWrapper>
              <FaFileAlt size={60} color="#3b82f6" />
              <Title>RELATÓRIOS</Title>
            </IconWrapper>

            <CardContainer>
              <Card>
                <CardIcon><FaFileAlt size={32} /></CardIcon>
                <CardTitle>RELATÓRIO DE MOVIMENTAÇÃO</CardTitle>
                <GenerateButton>GERAR</GenerateButton>
              </Card>

              <Card>
                <CardIcon><FaCarrot size={32} /></CardIcon>
                <CardTitle>INGREDIENTES UTILIZADOS</CardTitle>
                <GenerateButton>GERAR</GenerateButton>
              </Card>

              <Card>
                <CardIcon><FaCalendarAlt size={32} /></CardIcon>
                <CardTitle>RELATÓRIO POR PERÍODO</CardTitle>
                <GenerateButton>GERAR</GenerateButton>
              </Card>
            </CardContainer>
          </Container>
        </main>
        <Footer />
      </Wrapper>
    </>
  );
};

export default Relatorio;
