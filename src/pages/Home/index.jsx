import React from 'react';
import { HomeContainer, WelcomeText, Grid, Card } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

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
  { label: 'Sabores', icon: saboresIcon, route: '/sabores' },
  { label: 'Estoque', icon: estoqueIcon, route: '/estoque' },
  { label: 'Compras', icon: comprasIcon, route: '/compras' },
  { label: 'Vendas', icon: vendasIcon, route: '/vendas' },
  { label: 'Clientes', icon: clientesIcon, route: '/clienteslist' },
  { label: 'Fornecedores', icon: fornecedoresIcon, route: '/fornecedores' },
  { label: 'Ingredientes', icon: ingredientesIcon, route: '/ingredientes' },
  { label: 'Utensílios', icon: utensiliosIcon, route: '/utensilios' },
  { label: 'Bebidas', icon: bebidasIcon, route: '/bebidas' },
  { label: 'Maquinário', icon: maquinarioIcon, route: '/maquinario' },
  { label: 'Relatórios', icon: relatorioIcon, route: '/relatorios' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <HomeContainer>
        <WelcomeText>Bem-vindo(a), Guilherme</WelcomeText>
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
      <Footer />
    </>
  );
};

export default Home;
