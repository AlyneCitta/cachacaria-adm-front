import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GlobalStyle from "../../globalStyle/style.js";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import api from '../../api/api';
import {
  PageContainer,
  Title,
  Form,
  Label,
  Input,
  Select,
  ButtonGroup,
  Button,
  BreadcrumbWrapper,
  Breadcrumb,
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

  // Carregar estados ao montar
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await api.get('/api/estados');
        setEstados(response.data);
      } catch (error) {
        console.error('Erro ao carregar estados:', error);
        const mensagem = error.response?.data?.error || "Erro ao conectar com o servidor.";
        alert("Erro ao carregar estados: " + mensagem);
      }
    };
    fetchEstados();
  }, []);

  // Quando muda estado, carregar cidades
  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await api.get(`/api/cidades?estado=${formData.idf_estado}`);
        setCidades(response.data);
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
        const mensagem = error.response?.data?.error || 'Erro ao conectar com o servidor.';
        alert('Erro ao carregar cidades: ' + mensagem);
      }
    };

    if (formData.idf_estado) {
      fetchCidades();
    } else {
      setCidades([]);
      setFormData(prev => ({ ...prev, idf_cidade: '' }));
    }
  }, [formData.idf_estado]);

  // Carregar dados do fornecedor se id existir
  useEffect(() => {
    const token = localStorage.getItem('token');

    const carregarFornecedor = async () => {
      try {
        const resFornecedor = await api.get(`/api/fornecedores/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const fornecedorData = resFornecedor.data;

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

          setFormData(prev => ({
            ...prev,
            idf_estado: cidadeData.idf_estado
          }));

          const resCidadesDoEstado = await api.get(`/api/cidades?estado=${cidadeData.idf_estado}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          setCidades(resCidadesDoEstado.data);
        }
      } catch (err) {
        console.error('Erro ao carregar fornecedor e cidade:', err);
        const mensagem = err.response?.data?.error || err.message || 'Erro inesperado';
        alert('Erro ao carregar fornecedor e cidade: ' + mensagem);
        navigate('/fornecedoreslist');
      }
    };

    if (id) {
      carregarFornecedor();
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
      const { cnpj, email, ...rest } = formData;

      const dataToSend = {
        ...rest,
        cpfcnpj: cnpj,
        emailcontato: email,
        fornecedor: true,
        cliente: false,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      if (id) {
        await api.put(`/api/fornecedores/${id}`, dataToSend, config);
      } else {
        await api.post('/api/fornecedores', dataToSend, config);
      }

      alert('Fornecedor salvo com sucesso!');
      navigate('/fornecedoreslist');
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
      const mensagem = error.response?.data?.error || error.message || 'Erro ao conectar com o servidor.';
      alert(`Erro: ${mensagem}`);
    }
  };


  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <BreadcrumbWrapper>
          <Breadcrumb>
            <span onClick={() => navigate('/home')}>Principal</span> &gt;
            <span onClick={() => navigate('/fornecedoreslist')}> Fornecedores</span> &gt;
            <span> {id && isViewMode ? ' Visualizar Fornecedor' : id ? ' Editar Fornecedor' : ' Cadastrar Fornecedor'}</span>
          </Breadcrumb>
        </BreadcrumbWrapper>
        <PageContainer>
          <Form onSubmit={handleSubmit}>
            <Label>Nome</Label>
            <Input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              readOnly={isViewMode}
              className={isViewMode ? 'visualizacao' : ''}
            />

            <Label>CNPJ</Label>
            <Input
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              required
              maxLength={18}
              readOnly={isViewMode}
              className={isViewMode ? 'visualizacao' : ''}
            />

            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              readOnly={isViewMode}
              className={isViewMode ? 'visualizacao' : ''}
            />

            <Label>Telefone</Label>
            <Input
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
              readOnly={isViewMode}
              className={isViewMode ? 'visualizacao' : ''}
            />

            <Label>CEP</Label>
            <Input
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              required
              readOnly={isViewMode}
              className={isViewMode ? 'visualizacao' : ''}
            />

            <Label>Logradouro</Label>
            <Input
              name="logradouro"
              value={formData.logradouro}
              onChange={handleChange}
              required
              readOnly={isViewMode}
              className={isViewMode ? 'visualizacao' : ''}
            />

            <Label>Número</Label>
            <Input
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
              readOnly={isViewMode}
              className={isViewMode ? 'visualizacao' : ''}
            />

            <Label>Complemento</Label>
            <Input
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              readOnly={isViewMode}
              className={isViewMode ? 'visualizacao' : ''}
            />

            <Label>Estado</Label>
            {isViewMode ? (
              <Input
                readOnly
                value={
                  estados.length > 0
                    ? estados.find(estado => estado.id.toString() === formData.idf_estado.toString())?.nome || ''
                    : ''
                }
                className="visualizacao"
              />
            ) : (
              <Select
                name="idf_estado"
                value={formData.idf_estado}
                onChange={handleChange}
                required
              >
                <option value="">Selecione o estado</option>
                {estados.map(estado => (
                  <option key={estado.id} value={estado.id}>{estado.nome}</option>
                ))}
              </Select>
            )}

            <Label>Cidade</Label>
            {isViewMode ? (
              <Input
                readOnly
                value={
                  cidades.find(cidade => cidade.id.toString() === formData.idf_cidade.toString())?.nome || ''
                }
                className="visualizacao"
              />
            ) : (
              <Select
                name="idf_cidade"
                value={formData.idf_cidade}
                onChange={handleChange}
                required
              >
                <option value="">Selecione a cidade</option>
                {cidades.map(cidade => (
                  <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                ))}
              </Select>
            )}
            <ButtonGroup>
              <Button type="button" onClick={() => navigate('/fornecedoreslist')} className="secondary">Voltar</Button>
              {!isViewMode && <Button type="submit">Salvar</Button>}
            </ButtonGroup>
          </Form>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
};

export default FornecedoresForm;
