import React, { useState, useEffect } from 'react';
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
    uf: '',
    cliente: false,
    cpfcnpj: '', // campo adicionado
  });

  // Carregar cliente existente para edição
  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3001/api/clientes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Erro ao buscar cliente');
          return res.json();
        })
        .then(data => {
          setFormData({
            nome: data.nome || '',
            datanasc: data.datanasc ? data.datanasc.slice(0, 10) : '',
            email: data.email || '',
            telefone: data.telefone || '',
            cep: data.cep || '',
            logradouro: data.logradouro || '',
            numero: data.numero || '',
            complemento: data.complemento || '',
            bairro: data.bairro || '',
            cidade: data.cidade || '',
            uf: data.uf || '',
            cliente: data.cliente || false,
            cpfcnpj: data.cpfcnpj || '', // carregando cpfcnpj
          });
        })
        .catch(err => alert(err.message));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `http://localhost:3001/api/clientes/${id}`
        : 'http://localhost:3001/api/clientes';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar cliente');
      }

      alert('Cliente salvo com sucesso!');
      navigate('/clienteslist');
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
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
          <span onClick={goToHome}>Home</span> &gt;{' '}
          <span onClick={goToClientes}>Clientes</span> &gt;{' '}
          <span onClick={goToClientesForm}>Formulário</span>
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

          <Label>CPF/CNPJ</Label>
          <Input
            name="cpfcnpj"
            value={formData.cpfcnpj}
            onChange={handleChange}
            required
            maxLength={14}
          />

          <Label>
            <Input
              type="checkbox"
              name="cliente"
              checked={formData.cliente}
              onChange={handleChange}
            />{' '}
            Cliente
          </Label>

          <ButtonGroup>
            <Button type="button" onClick={handleBack} className="secondary">Voltar</Button>
            <Button type="submit">Salvar</Button>
          </ButtonGroup>
        </Form>
      </PageContainer>

      <Footer />
    </>
  );
};

export default ClientesForm;
