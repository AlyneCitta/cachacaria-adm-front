import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper,
  PageContainer,
  Title,
  Form,
  Label,
  Input,
  Button,
  BreadcrumbWrapper,
  Breadcrumb
} from './styles';

const MaquinarioForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    aquisicao: '',
    ultima: '',
    proxima: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Maquinário salvo com sucesso!');
    navigate('/maquinariolist');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Home</span> &gt; <span>Cadastro de Maquinário</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Cadastro de Maquinário</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Nome:</Label>
            <Input name="nome" value={formData.nome} onChange={handleChange} />

            <Label>Data de Aquisição:</Label>
            <Input type="date" name="aquisicao" value={formData.aquisicao} onChange={handleChange} />

            <Label>Última Manutenção:</Label>
            <Input type="date" name="ultima" value={formData.ultima} onChange={handleChange} />

            <Label>Próxima Manutenção:</Label>
            <Input type="date" name="proxima" value={formData.proxima} onChange={handleChange} />

            <Button type="submit">Salvar</Button>
          </Form>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default MaquinarioForm;
