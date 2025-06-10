import React from 'react';
import { HomeContainer, WelcomeText, Grid, Card } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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

const items = [
    { label: 'Sabores', icon: saboresIcon },
    { label: 'Estoque', icon: estoqueIcon },
    { label: 'Compras', icon: comprasIcon },
    { label: 'Vendas', icon: vendasIcon },
    { label: 'Clientes', icon: clientesIcon },
    { label: 'Fornecedores', icon: fornecedoresIcon },
    { label: 'Ingredientes', icon: ingredientesIcon },
    { label: 'Utensílios', icon: utensiliosIcon },
    { label: 'Bebidas', icon: bebidasIcon },
    { label: 'Maquinário', icon: maquinarioIcon },
    { label: 'Relatórios', icon: relatorioIcon },
    
  ];

const Home = () => {
  return (
    <>
      <Header />
      <HomeContainer>
        <WelcomeText>Bem-vindo(a), Guilherme</WelcomeText>
        <p>À Cachaçaria Antônio Carlos</p>

        <Grid>
             {items.map((item, index) => (
                 <Card key={index}>
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
