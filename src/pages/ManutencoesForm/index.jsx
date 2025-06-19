import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  TextArea,
  Button,
  CancelButton,
  BreadcrumbWrapper,
  Breadcrumb,
  Select,
  ButtonGroup
} from './styles';

const ManutencoesForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const maquinarioId = searchParams.get('maquinario');
  const manutencaoId = searchParams.get('id');

  const [formData, setFormData] = useState({
    data: '',
    tipo: '',
    descricao: '',
    responsavel: '',
    custo: '',
    proxima: '',
    observacoes: ''
  });

  const [tiposManutencao, setTiposManutencao] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposResponse = await api.get('/api/tipos-manutencao');
        setTiposManutencao(tiposResponse.data);

        const usuariosResponse = await api.get('/api/users');
        setUsuarios(usuariosResponse.data);
      } catch (error) {
        console.error('Erro ao carregar tipos de manutenção ou usuários:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchManutencao = async () => {
      try {
        const response = await api.get(`/api/manutencoes/${manutencaoId}`);
        const data = response.data;

        setFormData({
          data: data.datamanutencao?.split('T')[0] || '',
          tipo: String(data.idf_tipomanutencao),
          descricao: data.descricao || '',
          responsavel: String(data.idf_usuario),
          custo: data.custo || '',
          proxima: data.proximamanutencao?.split('T')[0] || '',
          observacoes: data.obersvacao || ''
        });
      } catch (err) {
        console.error('Erro ao carregar manutenção:', err);
      }
    };

    if (manutencaoId) {
      fetchManutencao();
    }
  }, [manutencaoId]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!maquinarioId) {
      alert('ID do maquinário não informado na URL');
      return;
    }

    const dataToSend = {
      idf_maquinario: Number(maquinarioId),
      idf_tipomanutencao: Number(formData.tipo),
      idf_usuario: Number(formData.responsavel),
      datamanutencao: formData.data,
      descricao: formData.descricao,
      custo: Number(formData.custo),
      proximamanutencao: formData.proxima,
      obersvacao: formData.observacoes
    };

    try {
      if (manutencaoId) {
        await api.put(`/api/manutencoes/${manutencaoId}`, dataToSend);
      } else {
        await api.post(`/api/manutencoes`, dataToSend);
      }

      alert('Manutenção salva com sucesso!');
      navigate(`/manutencoeslist?maquinario=${maquinarioId}`);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      console.error('Erro ao salvar manutenção:', error);
      alert('Erro ao salvar: ' + errorMessage);
    }
  };


  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Home</span> &gt;
          <span onClick={() => navigate('/maquinariolist')}> Maquinários</span> &gt;
          <span onClick={() => navigate(`/manutencoeslist?maquinario=${maquinarioId}`)}> Manutenções</span> &gt;
          <span>{manutencaoId ? 'Editar' : 'Nova'} Manutenção</span>
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>{manutencaoId ? 'Editar' : 'Inserir'} Manutenção</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Data:</Label>
            <Input type="date" name="data" value={formData.data} onChange={handleChange} required />

            <Label>Tipo:</Label>
            <Select name="tipo" value={formData.tipo} onChange={handleChange} required>
              <option value="">Selecione um tipo</option>
              {tiposManutencao.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
              ))}
            </Select>

            <Label>Descrição:</Label>
            <TextArea name="descricao" value={formData.descricao} onChange={handleChange} required />

            <Label>Responsável:</Label>
            <Select name="responsavel" value={formData.responsavel} onChange={handleChange} required>
              <option value="">Selecione um responsável</option>
              {usuarios.map(user => (
                <option key={user.id} value={user.id}>{user.nome || user.email}</option>
              ))}
            </Select>

            <Label>Custo:</Label>
            <Input type="number" step="0.01" name="custo" value={formData.custo} onChange={handleChange} required />

            <Label>Próxima Manutenção:</Label>
            <Input type="date" name="proxima" value={formData.proxima} onChange={handleChange} />

            <Label>Observações:</Label>
            <TextArea name="observacoes" value={formData.observacoes} onChange={handleChange} />

            <ButtonGroup>
              <CancelButton type="button" onClick={() => navigate(`/manutencoeslist?maquinario=${maquinarioId}`)}>
                Voltar
              </CancelButton>
              <Button type="submit">Salvar</Button>
            </ButtonGroup>
          </Form>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default ManutencoesForm;
