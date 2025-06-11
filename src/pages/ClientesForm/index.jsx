import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import {
  PageContainer,
  Title,
  Form,
  Label,
  Input,
  ButtonGroup,
  Button,
  BreadcrumbWrapper,
  Breadcrumb
} from './styles';

const ClientesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    datanasc: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cliente salvo:\n${JSON.stringify(formData, null, 2)}`);
    navigate('/clienteslist');
  };

  const handleBack = () => {
    navigate('/clienteslist');
  };

  const goToHome = () => {
    navigate('/home');
  };

  const goToClientes = () => {
    navigate('/clienteslist');
  };
    const goToClientesForm = () => {
    navigate('/clientesform');
  };

  return (
    <>
      <Header />

      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={goToHome}>Home</span> &gt; <span onClick={goToClientes}>Clientes</span>
          &gt; <span onClick={goToClientesForm}>Formulário</span>
        </Breadcrumb>
      </BreadcrumbWrapper>

      <PageContainer>
        <Form onSubmit={handleSubmit}>
          <Label>Nome</Label>
          <Input name="nome" value={formData.nome} onChange={handleChange} required />

          <Label>Data Nasc.</Label>
          <Input type="date" name="datanasc" value={formData.datanasc} onChange={handleChange} required />

          <Label>Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <Label>Telefone</Label>
          <Input name="telefone" value={formData.telefone} onChange={handleChange} required />

          <Label>CEP</Label>
          <Input name="cep" value={formData.cep} onChange={handleChange} required />

          <Label>Logradouro</Label>
          <Input name="logradouro" value={formData.logradouro} onChange={handleChange} required />

          <Label>Número</Label>
          <Input name="numero" value={formData.numero} onChange={handleChange} required />

          <Label>Complemento</Label>
          <Input name="complemento" value={formData.complemento} onChange={handleChange} />

          <Label>Bairro</Label>
          <Input name="bairro" value={formData.bairro} onChange={handleChange} required />

          <Label>Cidade</Label>
          <Input name="cidade" value={formData.cidade} onChange={handleChange} required />

          <Label>UF</Label>
          <Input name="uf" value={formData.uf} onChange={handleChange} required maxLength={2} />

          <ButtonGroup>
            <Button type="submit">Salvar</Button>
            <Button type="button" onClick={handleBack} className="secondary">Voltar</Button>
          </ButtonGroup>
        </Form>
      </PageContainer>

      <Footer />
    </>
  );
};

export default ClientesForm;
