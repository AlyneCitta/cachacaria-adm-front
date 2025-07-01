import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalStyle from "../../globalStyle/style.js";
import api from '../../api/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper, PageContainer, Title, BreadcrumbWrapper, Breadcrumb,
  BackButton, SaveButton, CancelButton, TabContainer, TabButton, FormSection, FormRow, Input, Select, Checkbox,
  CompositionContainer, CompositionRow, CompositionInput, CompositionSelect, AddButton, RemoveButton
} from './Style';

const ProdutoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('geral');
  const [produto, setProduto] = useState({});
  const [composicao, setComposicao] = useState([]);
  const [itensComposicao, setItensComposicao] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [sabores, setSabores] = useState([]);
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    const fetchAuxiliares = async () => {
      try {
        const [catResponse, sabResponse, unidResponse, itensCompResponse] = await Promise.all([
          api.get('/api/categorias'),
          api.get('/api/sabores'),
          api.get('/api/unidades'),
          api.get('/api/composicao')
        ]);

        setCategorias(catResponse.data);
        setSabores(sabResponse.data);
        setUnidades(unidResponse.data);
        setItensComposicao(itensCompResponse.data);
      } catch (error) {
        console.error('Erro ao carregar tabelas auxiliares:', error);
      }
    };

    fetchAuxiliares();
  }, []);


  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/api/products/${id}`);
        if (response.data.length > 0) {
          const produtoData = response.data[0];

          setProduto({
            ...produtoData,
            ativo: produtoData.ativo === 1 ? 1 : 0,
            temcomposicao: produtoData.temcomposicao === 1 ? 1 : 0
          });
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };

    const fetchComposicao = async () => {
      try {
        const response = await api.get(`/api/composicao/${id}`);
        const composicaoFormatada = response.data.map((comp) => ({
          id: comp.id || Date.now(),
          item: comp.idf_produtocomposicao || '',  
          quantidade: comp.qtdcomp || '',
          unidade: comp.idf_unidade || ''
        }));
        setComposicao(composicaoFormatada);
      } catch (error) {
        console.error('Erro ao carregar composição:', error);
      }
    };

    if (id) {
      fetchProduto();
      fetchComposicao();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setProduto((prev) => ({
        ...prev,
        [name]: checked ? 1 : 0
      }));
    } else {
      setProduto((prev) => ({
        ...prev,
        [name]: value
      }));
    }
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

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        ...produto,
        composicao
      };

      if (id) {
        await api.put(`/api/products/edit/${id}`, payload);
        alert('Produto atualizado com sucesso!');
      } else {
        await api.post('/api/products/new', payload);
        alert('Produto criado com sucesso!');
      }

      navigate('/bebidas');
    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
      alert('Erro ao salvar o produto.');
    }
  };

  const validateForm = () => {
    const requiredFields = [
      { field: 'codigo', label: 'Código' },
      { field: 'descricao', label: 'Descrição' },
      { field: 'idf_categoria', label: 'Categoria' },
      { field: 'idf_sabor', label: 'Sabor' },
      { field: 'capacidade_ml', label: 'Capacidade (ml)' },
      { field: 'custo', label: 'Custo (R$)' },
      { field: 'preco', label: 'Preço de Venda (R$)' },
      { field: 'estoqueminimo', label: 'Estoque Mínimo' },
      { field: 'idf_unidade', label: 'Unidade de Controle' }
    ];

    for (const item of requiredFields) {
      if (!produto[item.field] || produto[item.field].toString().trim() === '') {
        alert(`O campo "${item.label}" é obrigatório.`);
        return false;
      }
    }

    // Validação de composição caso tenha composição
    if (produto.temcomposicao === 1) {
      for (const comp of composicao) {
        if (!comp.item || !comp.quantidade || !comp.unidade) {
          alert('Preencha todos os campos das composições.');
          return false;
        }
      }
    }

    return true;
  };

  const handleCancel = () => {
    goToProdutos();
  };

  const goToHome = () => navigate('/home');
  const goToProdutos = () => navigate('/bebidas');

  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <BreadcrumbWrapper>
          <Breadcrumb>
            <span onClick={goToHome}>Principal</span> &gt; <span onClick={goToProdutos}>Bebidas</span> &gt; <span>{id ? ' Editar Bebida' : ' Incluir Bebida'}</span>
          </Breadcrumb>
        </BreadcrumbWrapper>
        <PageWrapper>
          <PageContainer>
            <Title>{id ? 'Edição de Produto' : 'Cadastro de Produto'}</Title>

            <TabContainer>
              <TabButton active={activeTab === 'geral'} onClick={() => setActiveTab('geral')}>Geral</TabButton>
              {produto.temcomposicao === 1 && (
                <TabButton active={activeTab === 'composicao'} onClick={() => setActiveTab('composicao')}>Composição</TabButton>
              )}
            </TabContainer>
            {activeTab === 'geral' && (
              <FormSection>
                <FormRow>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Código</label>
                    <Input name="codigo" placeholder="Código" value={produto.codigo || ''} onChange={handleChange} />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Código EAN</label>
                    <Input name="codigoean" placeholder="Código EAN" value={produto.codigoean || ''} onChange={handleChange} />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Código de Barras</label>
                    <Input name="codigobarras" placeholder="Código de Barras" value={produto.codigobarras || ''} onChange={handleChange} />
                  </div>

                  <Checkbox>
                    <label>
                      <input type="checkbox" name="ativo" checked={produto.ativo === 1} onChange={handleChange} /> Item Ativo
                    </label>
                  </Checkbox>

                  <Checkbox>
                    <label>
                      <input type="checkbox" name="temcomposicao" checked={produto.temcomposicao === 1} onChange={handleChange} /> Tem Composição
                    </label>
                  </Checkbox>
                </FormRow>
                <FormRow>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Descrição</label>
                    <Input name="descricao" placeholder="Descrição" value={produto.descricao || ''} onChange={handleChange} />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Categoria</label>
                    <Select name="idf_categoria" value={produto.idf_categoria || ''} onChange={handleChange}>
                      <option value="">Categoria</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.nome}</option>
                      ))}
                    </Select>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Sabor</label>
                    <Select name="idf_sabor" value={produto.idf_sabor || ''} onChange={handleChange}>
                      <option value="">Sabor</option>
                      {sabores.map((sab) => (
                        <option key={sab.id} value={sab.id}>{sab.nome}</option>
                      ))}
                    </Select>
                  </div>
                </FormRow>

                <FormRow>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Capacidade (ml)</label>
                    <Input name="capacidade_ml" placeholder="Capacidade (ml)" value={produto.capacidade_ml || ''} onChange={handleChange} />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Custo (R$)</label>
                    <Input name="custo" placeholder="Custo (R$)" value={produto.custo || ''} onChange={handleChange} />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Preço de Venda (R$)</label>
                    <Input name="preco" placeholder="Preço de Venda (R$)" value={produto.preco || ''} onChange={handleChange} />
                  </div>
                </FormRow>

                <FormRow>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Estoque Mínimo</label>
                    <Input
                      name="estoqueminimo"
                      placeholder="Estoque Mínimo"
                      value={produto.estoqueminimo || ''}
                      onChange={handleChange}
                    />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Unidade de Controle</label>
                    <Select name="idf_unidade" value={produto.idf_unidade || ''} onChange={handleChange}>
                      <option value="">Unidade de Controle</option>
                      {unidades.map((un) => (
                        <option key={un.id} value={un.id}>{un.nome}</option>
                      ))}
                    </Select>
                  </div>
                </FormRow>

                <FormRow>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Data Cadastro</label>
                    <Input value={produto.dtacadastro ? new Date(produto.dtacadastro).toLocaleDateString('pt-BR') : ''} readOnly />
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontSize: '14px' }}>Data Alteração</label>
                    <Input value={produto.dtaalteracao ? new Date(produto.dtaalteracao).toLocaleDateString('pt-BR') : ''} readOnly />
                  </div>
                </FormRow>
              </FormSection>
            )}
            {activeTab === 'composicao' && produto.temcomposicao === 1 && (
              <CompositionContainer>
                {composicao.length > 0 ? (
                  composicao.map((comp) => (
                    <CompositionRow key={comp.id}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: '8px' }}>
                        <label style={{ marginBottom: '4px', fontSize: '14px' }}>Item Composição</label>
                        <CompositionSelect
                          value={comp.item}
                          onChange={(e) => handleChangeComposicao(comp.id, 'item', e.target.value)}
                        >
                          <option value="">Selecione o item</option>
                          {itensComposicao.map((item) => (
                            <option key={item.id} value={item.id}>{item.descricao}</option>
                          ))}
                        </CompositionSelect>
                      </div>

                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: '8px' }}>
                        <label style={{ marginBottom: '4px', fontSize: '14px' }}>Quantidade</label>
                        <CompositionInput
                          type="number"
                          min="1"
                          placeholder="Quantidade"
                          value={comp.quantidade}
                          onChange={(e) => handleChangeComposicao(comp.id, 'quantidade', e.target.value)}
                        />
                      </div>

                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginRight: '8px' }}>
                        <label style={{ marginBottom: '4px', fontSize: '14px' }}>Unidade</label>
                        <CompositionSelect
                          value={comp.unidade}
                          onChange={(e) => handleChangeComposicao(comp.id, 'unidade', e.target.value)}
                        >
                          <option value="">Selecione a unidade</option>
                          {unidades.map((un) => (
                            <option key={un.id} value={un.id}>{un.nome}</option>
                          ))}
                        </CompositionSelect>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <RemoveButton onClick={() => handleRemoveComposicao(comp.id)}>-</RemoveButton>
                      </div>
                    </CompositionRow>
                  ))
                ) : (
                  <p>Nenhuma composição cadastrada.</p>
                )}

                <div style={{ marginTop: '10px' }}>
                  <AddButton onClick={handleAddComposicao}>Adicionar Composição</AddButton>
                </div>
              </CompositionContainer>
            )}
            <div style={{ marginTop: '20px' }}>
              <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
              <SaveButton onClick={handleSave}>Salvar</SaveButton>
            </div>
          </PageContainer>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
};

export default ProdutoForm;
