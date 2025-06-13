import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper, PageContainer, Title, BreadcrumbWrapper, Breadcrumb,
  BackButton, SaveButton, CancelButton, FormSection, FormRow, Input, Select, ContentWrapper,
  AddButton, RemoveButton, CompositionRow, CompositionInput, CompositionSelect
} from './Style';

const VendasForm = () => {
  const navigate = useNavigate();

  const [venda, setVenda] = useState({
    cliente: '',
    documento: '',
    dataEmissao: '01/01/2025',
    valorBruto: '',
    valorLiquido: '',
    uf: '',
    protocolo: '',
    frete: '',
    chave: '',
  });

  const [itens, setItens] = useState([
    { id: 1, produto: '', quantidade: '', unidade: '', valorUnitario: '', valorTotal: '' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenda({ ...venda, [name]: value });
  };

  const handleAddItem = () => {
    setItens([...itens, { id: Date.now(), produto: '', quantidade: '', unidade: '', valorUnitario: '', valorTotal: '' }]);
  };

  const handleRemoveItem = (id) => {
    setItens(itens.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItens(itens.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = () => {
    alert('Venda salva com sucesso!');
    navigate('/vendaslist');
  };

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={() => navigate('/home')}>Principal</span> &gt; <span onClick={() => navigate('/vendalist')}>Vendas</span> &gt; Incluir Documento
        </Breadcrumb>
      </BreadcrumbWrapper>

      <PageWrapper>
        <PageContainer>
          <Title>Vendas</Title>

          <FormSection>
            <FormRow>
              <Input name="cliente" placeholder="Cliente" value={venda.cliente} onChange={handleChange} />
              <Input name="dataEmissao" placeholder="Data de Emissão" value={venda.dataEmissao} onChange={handleChange} />
            </FormRow>

            <FormRow>
              <Input name="documento" placeholder="Número Documento" value={venda.documento} onChange={handleChange} />
              <Input name="valorBruto" placeholder="Valor Bruto" value={venda.valorBruto} onChange={handleChange} />
            </FormRow>

            <FormRow>
              <Select name="uf" value={venda.uf} onChange={handleChange}>
                <option value="">UF Destinatário</option>
                <option value="Santa Catarina">Santa Catarina</option>
              </Select>
              <Input name="valorLiquido" placeholder="Valor Líquido" value={venda.valorLiquido} onChange={handleChange} />
            </FormRow>

            <FormRow>
              <Input name="protocolo" placeholder="Protocolo de Autorização" value={venda.protocolo} onChange={handleChange} />
              <Input name="frete" placeholder="Valor do Frete" value={venda.frete} onChange={handleChange} />
            </FormRow>

            <FormRow>
              <Input name="chave" placeholder="Chave NFE" value={venda.chave} onChange={handleChange} />
            </FormRow>
          </FormSection>

          <Title>Itens</Title>

          <FormSection>
            {itens.map(item => (
              <CompositionRow key={item.id}>
                <CompositionSelect value={item.produto} onChange={(e) => handleItemChange(item.id, 'produto', e.target.value)}>
                  <option value="">Produto</option>
                  <option value="Produto A">Produto A</option>
                  <option value="Produto B">Produto B</option>
                </CompositionSelect>
                <CompositionInput placeholder="Quantidade" value={item.quantidade} onChange={(e) => handleItemChange(item.id, 'quantidade', e.target.value)} />
                <CompositionInput placeholder="Unidade" value={item.unidade} onChange={(e) => handleItemChange(item.id, 'unidade', e.target.value)} />
                <CompositionInput placeholder="Valor Unitário" value={item.valorUnitario} onChange={(e) => handleItemChange(item.id, 'valorUnitario', e.target.value)} />
                <CompositionInput placeholder="Valor Total" value={item.valorTotal} onChange={(e) => handleItemChange(item.id, 'valorTotal', e.target.value)} />
                <AddButton onClick={handleAddItem}>+</AddButton>
                <RemoveButton onClick={() => handleRemoveItem(item.id)}>-</RemoveButton>
              </CompositionRow>
            ))}
          </FormSection>

          <div style={{ marginTop: '20px' }}>
            <CancelButton onClick={() => navigate('/vendaslist')}>Cancelar</CancelButton>
            <SaveButton onClick={handleSave}>Salvar</SaveButton>
          </div>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default VendasForm;
