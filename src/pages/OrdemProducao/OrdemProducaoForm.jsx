import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper, PageContainer, Title, BreadcrumbWrapper, Breadcrumb,
  BackButton, SaveButton, CancelButton, FormSection, FormRow, Input, Select, ContentWrapper,
  AddButton, RemoveButton, CompositionRow, CompositionInput, CompositionSelect
} from './Style';

const OrdemProducaoForm = () => {
  const navigate = useNavigate();

  const [ordem, setOrdem] = useState({
    usuario: '',
    documento: '',
    dataProducao: '01/01/2025',
    dataValidade: '01/01/2026',
    custoProducao: '',
    produto: '',
    quantidadeProduzida: '',
    codigoLote: '',
  });

  const [composicao, setComposicao] = useState([
    { id: 1, produto: '', necessidade: '', requisitado: '', saldo: '', unidade: '' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrdem({ ...ordem, [name]: value });
  };

  const handleAddComposicao = () => {
    setComposicao([...composicao, { id: Date.now(), produto: '', necessidade: '', requisitado: '', saldo: '', unidade: '' }]);
  };

  const handleRemoveComposicao = (id) => {
    setComposicao(composicao.filter((item) => item.id !== id));
  };

  const handleComposicaoChange = (id, field, value) => {
    setComposicao(composicao.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = () => {
    alert('Ordem de Produção salva com sucesso!');
    navigate('/ordemproducaolist');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Principal</span> &gt; <span onClick={() => navigate('/ordemproducaolist')}>Ordem de Produção</span> &gt; Incluir Documento
        </Breadcrumb>
      </BreadcrumbWrapper>

      <PageWrapper>
        <PageContainer>
          <Title>Ordem de Produção</Title>

          <FormSection>
            <FormRow>
              <Input name="usuario" placeholder="Usuário" value={ordem.usuario} onChange={handleChange} />
              <Input name="dataProducao" placeholder="Data de Produção" value={ordem.dataProducao} onChange={handleChange} />
            </FormRow>

            <FormRow>
              <Input name="documento" placeholder="Número Documento" value={ordem.documento} onChange={handleChange} />
              <Input name="dataValidade" placeholder="Data de Validade" value={ordem.dataValidade} onChange={handleChange} />
            </FormRow>

            <FormRow>
              <Input name="custoProducao" placeholder="Custo Produção" value={ordem.custoProducao} onChange={handleChange} />
              <Input name="quantidadeProduzida" placeholder="Quantidade Produzida" value={ordem.quantidadeProduzida} onChange={handleChange} />
            </FormRow>

            <FormRow>
              <Select name="produto" value={ordem.produto} onChange={handleChange}>
                <option value="">Produto</option>
                <option value="Licor de Limão 1L">Licor de Limão 1L</option>
                <option value="Licor de Maracujá 1L">Licor de Maracujá 1L</option>
              </Select>
              <Input name="codigoLote" placeholder="Lote" value={ordem.codigoLote} onChange={handleChange} />
            </FormRow>
          </FormSection>

          <Title>Composição</Title>

          <FormSection>
            {composicao.map(item => (
              <CompositionRow key={item.id}>
                <CompositionSelect value={item.produto} onChange={(e) => handleComposicaoChange(item.id, 'produto', e.target.value)}>
                  <option value="">Produto</option>
                  <option value="Água">Água</option>
                  <option value="Álcool">Álcool</option>
                </CompositionSelect>
                <CompositionInput placeholder="Necessidade" value={item.necessidade} onChange={(e) => handleComposicaoChange(item.id, 'necessidade', e.target.value)} />
                <CompositionInput placeholder="Requisitado" value={item.requisitado} onChange={(e) => handleComposicaoChange(item.id, 'requisitado', e.target.value)} />
                <CompositionInput placeholder="Saldo" value={item.saldo} onChange={(e) => handleComposicaoChange(item.id, 'saldo', e.target.value)} />
                <CompositionInput placeholder="Unidade" value={item.unidade} onChange={(e) => handleComposicaoChange(item.id, 'unidade', e.target.value)} />
                <AddButton onClick={handleAddComposicao}>+</AddButton>
                <RemoveButton onClick={() => handleRemoveComposicao(item.id)}>-</RemoveButton>
              </CompositionRow>
            ))}
          </FormSection>

          <div style={{ marginTop: '20px' }}>
            <CancelButton onClick={() => navigate('/ordemproducaolist')}>Cancelar</CancelButton>
            <SaveButton onClick={handleSave}>Salvar</SaveButton>
          </div>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default OrdemProducaoForm;
