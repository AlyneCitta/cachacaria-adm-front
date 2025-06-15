import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    if (id) {
      fetch(`http://localhost:3001/api/maquinario/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Erro ao carregar dados');
          return res.json();
        })
        .then(data => {
          setFormData({
            nome: data.nome,
            aquisicao: data.dataaquisicao.slice(0, 10)
          });
        })
        .catch(err => {
          alert('Erro ao carregar maquinário');
          console.error(err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `http://localhost:3001/api/maquinario/${id}`
      : 'http://localhost:3001/api/maquinario';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          aquisicao: formData.aquisicao
        })
      });

      if (response.ok) {
        alert(id ? 'Maquinário atualizado com sucesso!' : 'Maquinário salvo com sucesso!');
        navigate('/maquinariolist');
      } else {
        const error = await response.json();
        alert('Erro: ' + error.error);
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      alert('Erro ao conectar ao servidor');
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
