import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../services/api';
import {
  PageContainer,
  Title,
  Form,
  Label,
  Input,
  Select,
  ButtonGroup,
  Button,
} from './styles';

const FornecedoresForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isViewMode = new URLSearchParams(location.search).get('view') === 'true';

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    idf_estado: '',
    idf_cidade: '',
    fornecedor: true,
  });

  useEffect(() => {
    api.get('/api/estados')
      .then(res => setEstados(res.data))
      .catch(err => console.error('Erro ao carregar estados:', err));
  }, []);

  useEffect(() => {
    if (formData.idf_estado) {
      api.get(`/api/cidades?estado=${formData.idf_estado}`)
        .then(res => setCidades(res.data))
        .catch(err => console.error('Erro ao carregar cidades:', err));
    } else {
      setCidades([]);
      setFormData(prev => ({ ...prev, idf_cidade: '' }));
    }
  }, [formData.idf_estado]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (id) {
      api.get(`/api/fornecedores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(async res => {
          const fornecedorData = res.data;
          setFormData(prev => ({
            ...prev,
            nome: fornecedorData.nome || '',
            cnpj: fornecedorData.cpfcnpj || '',
            email: fornecedorData.emailcontato || '',
            telefone: fornecedorData.telefone || '',
            cep: fornecedorData.cep || '',
            logradouro: fornecedorData.logradouro || '',
            numero: fornecedorData.numero || '',
            complemento: fornecedorData.complemento || '',
            bairro: fornecedorData.bairro || '',
            idf_cidade: fornecedorData.idf_cidade || '',
            fornecedor: true,
          }));

          if (fornecedorData.idf_cidade) {
            const resCidade = await api.get(`/api/cidade/${fornecedorData.idf_cidade}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const cidadeData = resCidade.data;

            setFormData(prev => ({ ...prev, idf_estado: cidadeData.idf_estado }));

            const cidadesDoEstado = await api.get(`/api/cidades?estado=${cidadeData.idf_estado}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setCidades(cidadesDoEstado.data);
          }
        })
        .catch(err => {
          alert('Erro ao carregar fornecedor e cidade: ' + err.message);
          navigate('/fornecedoreslist');
        });
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.idf_cidade) {
      alert('Por favor, selecione uma cidade.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const method = id ? 'put' : 'post';
      const url = id
        ? `/api/fornecedores/${id}`
        : '/api/fornecedores';

      const { cnpj, email, ...rest } = formData;
      const dataToSend = {
        ...rest,
        cpfcnpj: cnpj,
        emailcontato: email,
        fornecedor: true,
        cliente: false,
      };

      const response = await api[method](url, dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Fornecedor salvo com sucesso!');
      navigate('/fornecedoreslist');
    } catch (error) {
      alert(`Erro: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Form onSubmit={handleSubmit}>
          <Label>Nome</Label>
          <Input name="nome" value={formData.nome} onChange={handleChange} required readOnly={isViewMode} />

          <Label>CNPJ</Label>
          <Input name="cnpj" value={formData.cnpj} onChange={handleChange} required maxLength={18} readOnly={isViewMode} />

          <Label>Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required readOnly={isViewMode} />

          <Label>Telefone</Label>
          <Input name="telefone" value={formData.telefone} onChange={handleChange} required readOnly={isViewMode} />

          <Label>CEP</Label>
          <Input name="cep" value={formData.cep} onChange={handleChange} required readOnly={isViewMode} />

          <Label>Logradouro</Label>
          <Input name="logradouro" value={formData.logradouro} onChange={handleChange} required readOnly={isViewMode} />

          <Label>Número</Label>
          <Input name="numero" value={formData.numero} onChange={handleChange} required readOnly={isViewMode} />

          <Label>Complemento</Label>
          <Input name="complemento" value={formData.complemento} onChange={handleChange} readOnly={isViewMode} />

          <Label>Estado</Label>
          {isViewMode ? (
            <Input readOnly value={estados.find(e => e.id.toString() === formData.idf_estado.toString())?.nome || ''} />
          ) : (
            <Select name="idf_estado" value={formData.idf_estado} onChange={handleChange} required>
              <option value="">Selecione o estado</option>
              {estados.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
            </Select>
          )}

          <Label>Cidade</Label>
          {isViewMode ? (
            <Input readOnly value={cidades.find(c => c.id.toString() === formData.idf_cidade.toString())?.nome || ''} />
          ) : (
            <Select name="idf_cidade" value={formData.idf_cidade} onChange={handleChange} required>
              <option value="">Selecione a cidade</option>
              {cidades.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </Select>
          )}

          <ButtonGroup>
            <Button type="button" onClick={() => navigate('/fornecedoreslist')} className="secondary">Voltar</Button>
            {!isViewMode && <Button type="submit">Salvar</Button>}
          </ButtonGroup>
        </Form>
      </PageContainer>
      <Footer />
    </>
  );
};

export default FornecedoresForm;

