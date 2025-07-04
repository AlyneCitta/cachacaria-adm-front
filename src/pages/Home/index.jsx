import React from 'react';
import { HomeContainer, WelcomeText, Grid, Card } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import GlobalStyle from "../../globalStyle/style.js";

// Ícones
import saboresIcon from '../../assets/saboresIcon.png';
import estoqueIcon from '../../assets/estoqueIcon.png';
import comprasIcon from '../../assets/comprasIcon.png';
import vendasIcon from '../../assets/vendasIcon.png';
import clientesIcon from '../../assets/clientesIcon.png';
import fornecedoresIcon from '../../assets/fornecedoresIcon.png';
import ingredientesIcon from '../../assets/ingredientesIcon.png';
import utensiliosIcon from '../../assets/utensiliosIcon.png';
import bebidasIcon from '../../assets/bebidasIcon.png';
import maquinarioIcon from '../../assets/maquinarioIcon.png';
import relatorioIcon from '../../assets/relatorioIcon.png';

// Itens com rotas associadas
const items = [
  { label: 'Bebidas', icon: bebidasIcon, route: '/bebidas' },
  { label: 'Ingredientes', icon: ingredientesIcon, route: '/ingredientes' },
  { label: 'Compras', icon: comprasIcon, route: '/compras' },
  { label: 'Vendas', icon: vendasIcon, route: '/vendas' },
  { label: 'Estoque', icon: estoqueIcon, route: '/estoque' },
  { label: 'Produção', icon: saboresIcon, route: '/producao' },
  { label: 'Clientes', icon: clientesIcon, route: '/clienteslist' },
  { label: 'Fornecedores', icon: fornecedoresIcon, route: '/fornecedoreslist' },  
  { label: 'Maquinário', icon: maquinarioIcon, route: '/maquinariolist' },  
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <HomeContainer>
          <WelcomeText>Bem-vindo(a)</WelcomeText>
          <p>À Cachaçaria Antônio Carlos</p>

          <Grid>
            {items.map((item, index) => (
              <Card key={index} onClick={() => navigate(item.route)} style={{ cursor: 'pointer' }}>
                <img src={item.icon} alt={item.label} />
                <span>{item.label}</span>
              </Card>
            ))}
            {items.length % 3 !== 0 && <Card style={{ visibility: 'hidden' }} />}
          </Grid>
        </HomeContainer>
      </main>
      <Footer />
    </>
  );
};

export default Home;
