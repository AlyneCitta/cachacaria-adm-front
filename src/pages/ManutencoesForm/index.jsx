import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
    fetch('http://localhost:3001/api/tipos-manutencao')
      .then(res => res.json())
      .then(data => setTiposManutencao(data))
      .catch(err => console.error('Erro ao carregar tipos de manutenção:', err));

    fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Erro ao carregar usuários:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
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
      obersvacao: formData.observacoes // mantendo o erro no nome como solicitado
    };

    try {
      const response = await fetch('http://localhost:3001/api/manutencoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert('Manutenção registrada com sucesso!');
        navigate(`/manutencoeslist?maquinario=${maquinarioId}`);
      } else {
        const errorData = await response.json();
        alert('Erro ao salvar manutenção: ' + (errorData.error || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Erro ao salvar manutenção:', error);
      alert('Erro na comunicação com o servidor.');
    }
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
            <Select name="tipo" value={formData.tipo} onChange={handleChange}>
              <option value="">Selecione um tipo</option>
              {tiposManutencao.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
              ))}
            </Select>

            <Label>Descrição:</Label>
            <TextArea 
              name="descricao" 
              value={formData.descricao} 
              onChange={handleChange} 
              placeholder="Descreva o serviço realizado"
            />

            <Label>Responsável:</Label>
            <Select name="responsavel" value={formData.responsavel} onChange={handleChange}>
              <option value="">Selecione um responsável</option>
              {usuarios.map(user => (
                <option key={user.id} value={user.id}>{user.nome || user.email}</option>
              ))}
            </Select>

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
