import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper, PageContainer, Title, BreadcrumbWrapper, Breadcrumb,
  BackButton, SaveButton, CancelButton, TabContainer, TabButton, FormSection, FormRow, Input, Select, Checkbox,
  CompositionContainer, CompositionRow, CompositionInput, CompositionSelect, AddButton, RemoveButton
} from './Style';

const ProdutoForm = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('geral');

  const [produto, setProduto] = useState({
    codigo: '',
    descricao: '',
    categoria: '',
    sabor: '',
    capacidade: '',
    codigoEAN: '',
    custo: '',
    precoVenda: '',
    estoqueMinimo: '',
    unidadeControle: '',
    ativo: true,
    dataCadastro: '01/01/2025',
    dataAlteracao: '01/01/2025'
  });

  const [composicao, setComposicao] = useState([
    { id: 1, item: '', quantidade: '', unidade: '' }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddComposicao = () => {
    setComposicao([...composicao, { id: Date.now(), item: '', quantidade: '', unidade: '' }]);
  };

  const handleRemoveComposicao = (id) => {
    setComposicao(composicao.filter((c) => c.id !== id));
  };

  const handleChangeComposicao = (id, field, value) => {
    setComposicao(composicao.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleSave = () => {
    alert('Produto salvo com sucesso!');
    navigate('/produtolist');
  };

  const handleCancel = () => {
    navigate('/produtolist');
  };

  const goToHome = () => navigate('/home');

  return (
    <>
      <Header />
      <BreadcrumbWrapper>
        <Breadcrumb>
          <span onClick={goToHome}>Principal</span> &gt; <span>Produtos</span> &gt; Incluir Produto
        </Breadcrumb>
      </BreadcrumbWrapper>
      <PageWrapper>
        <PageContainer>
          <Title>Cadastro de Produto</Title>

          <TabContainer>
            <TabButton active={activeTab === 'geral'} onClick={() => setActiveTab('geral')}>Geral</TabButton>
            <TabButton active={activeTab === 'composicao'} onClick={() => setActiveTab('composicao')}>Composição</TabButton>
          </TabContainer>

          {activeTab === 'geral' && (
            <FormSection>
              <FormRow>
                <Input name="codigo" placeholder="Código" value={produto.codigo} onChange={handleChange} />
                <Input name="codigoEAN" placeholder="Código EAN" value={produto.codigoEAN} onChange={handleChange} />
                <Checkbox>
                  <label>
                    <input type="checkbox" name="ativo" checked={produto.ativo} onChange={handleChange} /> Item Ativo
                  </label>
                </Checkbox>
              </FormRow>

              <FormRow>
                <Input name="descricao" placeholder="Descrição" value={produto.descricao} onChange={handleChange} />
                <Select name="categoria" value={produto.categoria} onChange={handleChange}>
                  <option value="">Categoria</option>
                  <option value="Licor">Licor</option>
                  <option value="Vodka">Vodka</option>
                  <option value="Cachaça">Cachaça</option>
                  <option value="Coquetel Alcoólico">Coquetel Alcoólico</option>
                </Select>
                <Select name="sabor" value={produto.sabor} onChange={handleChange}>
                  <option value="">Sabor</option>
                  <option value="Limão">Limão</option>
                  <option value="Maracujá">Maracujá</option>
                  <option value="Café">Café</option>
                  <option value="Gengibre">Gengibre</option>
                  <option value="Amendoim">Amendoim</option>
                </Select>
              </FormRow>

              <FormRow>
                <Input name="capacidade" placeholder="Capacidade (ml)" value={produto.capacidade} onChange={handleChange} />
                <Input name="custo" placeholder="Custo (R$)" value={produto.custo} onChange={handleChange} />
                <Input name="precoVenda" placeholder="Preço de Venda (R$)" value={produto.precoVenda} onChange={handleChange} />
              </FormRow>

              <FormRow>
                <Input name="estoqueMinimo" placeholder="Estoque Mínimo" value={produto.estoqueMinimo} onChange={handleChange} />
                <Select name="unidadeControle" value={produto.unidadeControle} onChange={handleChange}>
                  <option value="">Unidade de Controle</option>
                  <option value="Unidade">Unidade</option>
                  <option value="Litro">Litro</option>
                  <option value="Mililitro">Mililitro</option>
                </Select>
              </FormRow>
                <FormRow>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="dataCadastro" style={{ marginBottom: '4px', fontSize: '14px' }}>Data Cadastro</label>
                        <Input
                        id="dataCadastro"
                        name="dataCadastro"
                        value={produto.dataCadastro}
                        readOnly
                        />
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="dataAlteracao" style={{ marginBottom: '4px', fontSize: '14px' }}>Data Alteração</label>
                        <Input
                        id="dataAlteracao"
                        name="dataAlteracao"
                        value={produto.dataAlteracao}
                        readOnly
                        />
                    </div>
                </FormRow>
            </FormSection>
          )}

          {activeTab === 'composicao' && (
            <CompositionContainer>
              {composicao.map((comp) => (
                <CompositionRow key={comp.id}>
                  <CompositionSelect
                    value={comp.item}
                    onChange={(e) => handleChangeComposicao(comp.id, 'item', e.target.value)}
                  >
                    <option value="">Item Composição</option>
                    <option value="Água">Água</option>
                    <option value="Álcool">Álcool</option>
                  </CompositionSelect>
                  <CompositionInput
                    placeholder="Quantidade"
                    value={comp.quantidade}
                    onChange={(e) => handleChangeComposicao(comp.id, 'quantidade', e.target.value)}
                  />
                  <CompositionInput
                    placeholder="Unidade"
                    value={comp.unidade}
                    onChange={(e) => handleChangeComposicao(comp.id, 'unidade', e.target.value)}
                  />
                  <AddButton onClick={handleAddComposicao}>+</AddButton>
                  <RemoveButton onClick={() => handleRemoveComposicao(comp.id)}>-</RemoveButton>
                </CompositionRow>
              ))}
            </CompositionContainer>
          )}

          <div style={{ marginTop: '20px' }}>
            <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
            <SaveButton onClick={handleSave}>Salvar</SaveButton>
          </div>
        </PageContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default ProdutoForm;
