import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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

const ClientesForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isViewMode = new URLSearchParams(location.search).get('view') === 'true';

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    dtanascimento: '',
    emailcontato: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    idf_estado: '',
    idf_cidade: '',
    cliente: true,
    cpfcnpj: '',
  });

  function formatDateToInput(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
  }

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await api.get('/api/estados');
        setEstados(response.data);
      } catch (error) {
        console.error('Erro ao carregar estados:', error);
      }
    };

    fetchEstados();
  }, []);


  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await api.get(`/api/cidades`, {
          params: { estado: formData.idf_estado }
        });
        setCidades(response.data);
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
      }
    };

    if (formData.idf_estado) {
      fetchCidades();
    } else {
      setCidades([]);
    }
  }, [formData.idf_estado]);


  useEffect(() => {
    const fetchCliente = async () => {
      const token = localStorage.getItem('token');

      try {
        if (id) {
          const clienteResponse = await api.get(`/api/clientes/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          const clienteData = clienteResponse.data;

          setFormData(prev => ({
            ...prev,
            nome: clienteData.nome || '',
            dtanascimento: formatDateToInput(clienteData.dtanascimento),
            emailcontato: clienteData.emailcontato || '',
            telefone: clienteData.telefone || '',
            cep: clienteData.cep || '',
            logradouro: clienteData.logradouro || '',
            numero: clienteData.numero || '',
            complemento: clienteData.complemento || '',
            bairro: clienteData.bairro || '',
            idf_cidade: clienteData.idf_cidade || '',
            cliente: true,
            cpfcnpj: clienteData.cpfcnpj || '',
          }));

          if (clienteData.idf_cidade) {
            // Buscar dados da cidade
            const cidadeResponse = await api.get(`/api/cidade/${clienteData.idf_cidade}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const cidadeData = cidadeResponse.data;

            setFormData(prev => ({
              ...prev,
              idf_estado: cidadeData.idf_estado
            }));

            // Buscar todas as cidades do estado
            const cidadesDoEstadoResponse = await api.get(`/api/cidades`, {
              headers: { Authorization: `Bearer ${token}` },
              params: { estado: cidadeData.idf_estado }
            });

            setCidades(cidadesDoEstadoResponse.data);
          }
        }
      } catch (err) {
        alert('Erro ao carregar cliente e cidade: ' + (err.response?.data?.message || err.message));
        navigate('/clienteslist');
      }
    };

    fetchCliente();
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
      const dataToSend = {
        ...formData,
        cliente: true,
        fornecedor: false,
      };

      if (id) {
        // Atualizar cliente (PUT)
        await api.put(`/api/clientes/${id}`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Criar cliente novo (POST)
        await api.post(`/api/clientes`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      alert('Cliente salvo com sucesso!');
      navigate('/clienteslist');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      alert(`Erro: ${errorMessage}`);
    }
  };


  return (
    <>
      <Header />
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

          <Label>Data Nasc.</Label>
          <Input
            type="date"
            name="dtanascimento"
            value={formData.dtanascimento}
            onChange={handleChange}
            required
            readOnly={isViewMode}
            className={isViewMode ? 'visualizacao' : ''}
          />

          <Label>Email</Label>
          <Input
            type="email"
            name="emailcontato"
            value={formData.emailcontato}
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

          <Label>CPF/CNPJ</Label>
          <Input
            name="cpfcnpj"
            value={formData.cpfcnpj}
            onChange={handleChange}
            required
            maxLength={14}
            readOnly={isViewMode}
            className={isViewMode ? 'visualizacao' : ''}
          />


          <ButtonGroup>
            <Button type="button" onClick={() => navigate('/clienteslist')} className="secondary">Voltar</Button>
            {!isViewMode && <Button type="submit">Salvar</Button>}
          </ButtonGroup>
        </Form>
      </PageContainer>
      <Footer />
    </>
  );
};

export default ClientesForm;
