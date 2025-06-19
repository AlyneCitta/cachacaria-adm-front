import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../api/api';
import {
  PageWrapper,
  PageContainer,
  Title,
  Form,
  Label,
  Input,
  Button,
  CancelButton,
  ButtonGroup,
  BreadcrumbWrapper,
  Breadcrumb
} from './styles';

const MaquinarioForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nome: '',
    aquisicao: ''
  });

  useEffect(() => {
    const carregarMaquinario = async () => {
      try {
        const response = await api.get(`/api/maquinario/${id}`);
        const data = response.data;

        setFormData({
          nome: data.nome,
          aquisicao: data.dataaquisicao?.slice(0, 10) || ''
        });
      } catch (err) {
        console.error("Erro ao carregar maquinário:", err);
        const mensagem = err.response?.data?.error || err.message || 'Erro ao conectar com o servidor.';
        alert('Erro ao carregar maquinário: ' + mensagem);
      }
    };

    if (id) {
      carregarMaquinario();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      nome: formData.nome,
      aquisicao: formData.aquisicao
    };

    try {
      if (id) {
        await api.put(`/api/maquinario/${id}`, dados);
        alert('Maquinário atualizado com sucesso!');
      } else {
        await api.post('/api/maquinario', dados);
        alert('Maquinário salvo com sucesso!');
      }

      navigate('/maquinariolist');
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      const mensagem = error.response?.data?.error || error.message || 'Erro ao conectar ao servidor';
      alert('Erro: ' + mensagem);
    }
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Home</span> &gt;
          <span onClick={() => navigate('/maquinariolist')}> Maquinários</span> &gt;
          <span>{id ? 'Editar Maquinário' : 'Cadastro de Maquinário'}</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>{id ? ' Editar Maquinário' : ' Cadastro de Maquinário'}</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Nome:</Label>
            <Input name="nome" value={formData.nome} onChange={handleChange} required />

            <Label>Data de Aquisição:</Label>
            <Input type="date" name="aquisicao" value={formData.aquisicao} onChange={handleChange} required />

            <ButtonGroup>
              <CancelButton type="button" onClick={() => navigate('/maquinariolist')}>
                Voltar
              </CancelButton>
              <Button type="submit">{id ? 'Atualizar' : 'Salvar'}</Button>
            </ButtonGroup>
          </Form>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default MaquinarioForm;
