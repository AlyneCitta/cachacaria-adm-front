// InserirManutencao.jsx
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
  TextArea,
  Button,
  BreadcrumbWrapper,
  Breadcrumb
} from './styles';

const InserirManutencao = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    data: '',
    tipo: '',
    descricao: '',
    responsavel: '',
    custo: '',
    proxima: '',
    observacoes: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Manutenção registrada com sucesso!');
    navigate('/maquinariolist');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Home</span> &gt; <span>Nova Manutenção</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Inserir Manutenção</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Data:</Label>
            <Input type="date" name="data" value={formData.data} onChange={handleChange} />

            <Label>Tipo:</Label>
            <Input 
              name="tipo" 
              value={formData.tipo} 
              onChange={handleChange} 
              placeholder="Ex: Preventiva ou Corretiva"
            />

            <Label>Descrição:</Label>
            <TextArea 
              name="descricao" 
              value={formData.descricao} 
              onChange={handleChange} 
              placeholder="Descreva o serviço realizado"
            />

            <Label>Responsável:</Label>
            <Input 
              name="responsavel" 
              value={formData.responsavel} 
              onChange={handleChange} 
              placeholder="Nome do responsável"
            />

            <Label>Custo:</Label>
            <Input 
              type="number" 
              step="0.01" 
              name="custo" 
              value={formData.custo} 
              onChange={handleChange} 
              placeholder="R$ 0,00"
            />

            <Label>Próxima Manutenção:</Label>
            <Input type="date" name="proxima" value={formData.proxima} onChange={handleChange} />

            <Label>Observações:</Label>
            <TextArea 
              name="observacoes" 
              value={formData.observacoes} 
              onChange={handleChange} 
              placeholder="Observações adicionais"
            />

            <Button type="submit">Salvar</Button>
          </Form>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default InserirManutencao;
