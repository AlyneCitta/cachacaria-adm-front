import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GlobalStyle from "../../globalStyle/style.js";
import {
  Wrapper,
  Container,
  Title,
  Image,
  Grid,
  Card,
  CardTitle,
  Quantity,
  Validity,
  DetailButton,
  OutOfStock,
  ButtonGroup,
  ActionButton,
  BreadcrumbWrapper,
  Breadcrumb,
} from './Style';

import iconIngredientes from '../../assets/ingredientesColorido.png';

const ingredientesMock = [
  { nome: 'Açúcar', quantidade: 20, unidade: 'KG', validade: '20/12/2026' },
  { nome: 'Milho', quantidade: 0, unidade: 'KG', validade: '01/01/2026' },
  { nome: 'Fermento', quantidade: 20, unidade: 'KG', validade: '02/02/2028' },
  { nome: 'Óleo', quantidade: 2, unidade: 'L', validade: '20/12/2029' },
  { nome: 'Mistura', quantidade: 20, unidade: 'KG', validade: '01/02/2026' },
  { nome: 'Trigo', quantidade: 20, unidade: 'KG', validade: '14/03/2026' }
];

const Ingredientes = () => {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <main>
          <BreadcrumbWrapper>
            <Breadcrumb>
              <span onClick={() => navigate('/home')}>Principal</span> &gt; <span onClick={() => navigate('/ingredientes')}>Ingredientes</span>
            </Breadcrumb>
          </BreadcrumbWrapper>
          <Container>
            <Image src={iconIngredientes} alt="Ingredientes" />
            <Title>CONTROLE DE INGREDIENTES</Title>

            <Grid>
              {ingredientesMock.map((item, idx) => (
                <Card key={idx}>
                  <CardTitle>{item.nome}</CardTitle>
                  <Quantity>{item.quantidade}{item.unidade}</Quantity>
                  {item.quantidade === 0 && <OutOfStock>SEM ESTOQUE</OutOfStock>}
                  <Validity>Val: {item.validade}</Validity>
                  <DetailButton>DETALHE</DetailButton>
                </Card>
              ))}
            </Grid>

            <ButtonGroup>
              <ActionButton color="blue">ADICIONAR INGREDIENTES</ActionButton>
              <ActionButton color="blue">ATUALIZAR</ActionButton>
            </ButtonGroup>
          </Container>
        </main>
        <Footer />
      </Wrapper>
    </>
  );
};

export default Ingredientes;
