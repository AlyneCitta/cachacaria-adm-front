import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import GlobalStyle from "../../globalStyle/style.js";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper, PageContainer, Title, BreadcrumbWrapper, Breadcrumb,
  BackButton, SaveButton, CancelButton, FormSection, FormRow, Input, Select,
  CompositionContainer, CompositionRow, CompositionInput, CompositionSelect,
  AddButton, RemoveButton
} from './Style';

const OrdemProducaoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isViewMode = window.location.pathname.includes('/producao/view');
  const [usuarios, setUsuarios] = useState([]);


  const [ordem, setOrdem] = useState({
    usuario: '',
    documento: '',
    dataProducao: '',
    dataValidade: '',
    custoProducao: '',
    produto: '',
    quantidadeProduzida: '',
    codigoLote: '',
  });

  const [composicao, setComposicao] = useState([]);

  useEffect(() => {
    if (id) {
      async function fetchOrdem() {
        try {
          const response = await api.get(`/api/producao/view/${id}`);
          if (response.data && response.data.length > 0) {
            const ordemApi = response.data[0];

            const formatDate = (dateString) => {
              if (!dateString) return '';
              const date = new Date(dateString);
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
            };

            setOrdem({
              usuario: String(ordemApi.idf_usuario),  // Aqui passa o ID como string
              documento: ordemApi.nroordemproducao,
              dataProducao: formatDate(ordemApi.dtaproducao),
              dataValidade: formatDate(ordemApi.dtavalidade),
              custoProducao: ordemApi.custoproducao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
              produto: ordemApi.descricao,
              quantidadeProduzida: ordemApi.qtdproduzida,
              codigoLote: ordemApi.codigolote
            });

          }
        } catch (error) {
          console.error('Erro ao carregar a ordem de produção:', error);
        }
      }

      fetchOrdem();
    }
  }, [id]);

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get('/api/products/Produzidos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    }

    fetchProdutos();
  }, []);


  useEffect(() => {
    if (id) {
      fetchComposicao();
    }
  }, [id]);

  const fetchComposicao = async () => {
    try {
      const response = await api.get(`/api/producao/composicao/${id}`);
      if (response.data && response.data.length > 0) {
        setComposicao(response.data);
      } else {
        setComposicao([]);
      }
    } catch (error) {
      console.error('Erro ao carregar composição da produção:', error);
    }
  };

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await api.get('/api/users');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }

    fetchUsuarios();
  }, []);


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setOrdem((prev) => ({ ...prev, [name]: value }));

    // Quando o usuário escolher um produto, carregue automaticamente a composição dele
    if (name === 'idf_produto') {
      try {
        if (value) {
          const response = await api.get(`/api/composicao/${value}`);
          if (response.data && response.data.length > 0) {
            console.log('Salve');
            console.log(response);
            const novaComposicao = response.data.map((item) => ({
              id: item.idf_produtocomposicao,
              descricao: item.descricao,
              qtdnecessidade: item.qtdcomp || '',
              qtdrequisitado: '',
              qtdsaldo: '',
              unidade: item.nome || '',
            }));
            setComposicao(novaComposicao);
          } else {
            setComposicao([]);
          }
        } else {
          setComposicao([]);
        }
      } catch (error) {
        console.error('Erro ao carregar composição do produto:', error);
      }
    }
  };


  const handleComposicaoChange = (index, field, value) => {
    setComposicao((prev) => {
      return prev.map((item, i) => {
        if (i === index) {
          const updatedItem = {
            ...item,
            [field]: value
          };

          // Se o campo alterado for necessidade ou requisitado, recalcule o saldo
          if (field === 'qtdnecessidade' || field === 'qtdrequisitado') {
            const necessidade = parseInt(field === 'qtdnecessidade' ? value : item.qtdnecessidade || 0);
            const requisitado = parseInt(field === 'qtdrequisitado' ? value : item.qtdrequisitado || 0);
            updatedItem.qtdsaldo = isNaN(necessidade - requisitado) ? 0 : necessidade - requisitado;
          }

          return updatedItem;
        }
        return item;
      });
    });
  };


  const handleProdutoSelect = async (e) => {
    const produtoId = e.target.value;

    setOrdem((prev) => ({
      ...prev,
      idf_produto: produtoId,
    }));

    try {
      const response = await api.get(`/api/composicao/${produtoId}`);
      const composicaoCalculada = response.data.map((item) => ({
        idf_produtocomposicao: item.idf_produtocomposicao,
        qtdnecessidade: item.qtdnecessidade,
        qtdrequisitado: item.qtdrequisitado,
        qtdsaldo: item.qtdnecessidade - item.qtdrequisitado,
        idf_unidade: item.idf_unidade
      }));
      setComposicao(composicaoCalculada);
    } catch (error) {
      console.error('Erro ao carregar composição:', error);
    }
  };


  const handleAddComposicao = () => {
    setComposicao([...composicao, {
      id: Date.now(),
      descricao: '',
      necessidade: '',
      requisitado: '',
      saldo: '',
      unidade: ''
    }]);
  };

  const handleRemoveComposicao = (idToRemove) => {
    setComposicao(composicao.filter((item) => item.id !== idToRemove));
  };

  const handleProdutoChange = async (e) => {
    const produtoId = e.target.value;

    setOrdem((prev) => ({
      ...prev,
      idf_produto: produtoId
    }));

    try {
      const response = await api.get(`/api/composicao/${produtoId}`);

      const composicaoCalculada = response.data.map((item) => ({
        idf_produtocomposicao: item.idf_produtocomposicao,
        qtdnecessidade: item.qtdnecessidade,
        qtdrequisitado: item.qtdrequisitado,
        qtdsaldo: item.qtdnecessidade - item.qtdrequisitado,
        idf_unidade: item.idf_unidade,
        descricao: item.descricao,
        nome_unidade: item.nome_unidade || ''
      }));

      setComposicao(composicaoCalculada);
    } catch (error) {
      console.error('Erro ao carregar composição:', error);
    }
  };


  const handleSave = async () => {
    console.log("AAAAAA");
    try {
      const payload = {
        ...ordem,
        composicao
      };
      console.log(JSON.parse(JSON.stringify(payload)));


      await api.post('/api/producao/new', payload);
      alert('Ordem criada com sucesso!');

      navigate('/producao');
    } catch (error) {
      console.error('Erro ao salvar ordem:', error);
      alert('Erro ao salvar ordem de produção.');
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';  // Retorna string vazia se for null, undefined ou vazio

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';  // Retorna vazio se não for data válida

    return date.toISOString().split('T')[0];  // Retorna no formato yyyy-MM-dd (HTML5 input type="date")
  };


  const formatCurrency = (value) => {
    if (value === null || value === undefined || value === '') return '';
    const numeric = parseFloat(value.toString().replace(/[^\d]/g, '')) / 100;
    return numeric.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const parseCurrency = (value) => {
    const numeric = parseFloat(value.toString().replace(/[^\d]/g, ''));
    return isNaN(numeric) ? '' : numeric / 100;
  };


  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <BreadcrumbWrapper>
          <Breadcrumb>
            <span onClick={() => navigate('/home')}>Principal</span> &gt;
            <span onClick={() => navigate('/producao')}> Ordem de Produção</span> &gt;
            <span>{isViewMode ? ' Visualizar' : (id ? ' Editar' : ' Incluir')}</span>
          </Breadcrumb>
        </BreadcrumbWrapper>

        <PageWrapper>
          <PageContainer>
            <Title>Ordem de Produção</Title>

            <FormSection>
              <FormRow>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '4px', fontSize: '14px' }}>Responsável</label>
                  <Select
                    name="usuario"
                    value={String(ordem.usuario || '')}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    <option value="">Selecione o usuário</option>
                    {usuarios.map((user) => (
                      <option key={user.id} value={String(user.id)}>
                        {user.nome}
                      </option>
                    ))}
                  </Select>

                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '4px', fontSize: '14px' }}>Data de Produção</label>
                  <Input
                    type="date"
                    name="dataProducao"
                    value={formatDateForInput(ordem.dataProducao)}
                    onChange={handleChange}
                    disabled={isViewMode}
                    readOnly={isViewMode}
                  />
                </div>
              </FormRow>

              <FormRow>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '4px', fontSize: '14px' }}>Número Documento</label>
                  <Input name="documento" value={ordem.documento} onChange={handleChange} disabled={isViewMode} readOnly={isViewMode} />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '4px', fontSize: '14px' }}>Data de Validade</label>
                  <Input
                    type="date"
                    name="dataValidade"
                    value={formatDateForInput(ordem.dataValidade)}
                    onChange={handleChange}
                    disabled={isViewMode}
                    readOnly={isViewMode}
                  />
                </div>
              </FormRow>

              <FormRow>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '4px', fontSize: '14px' }}>Custo Produção</label>
                  <Input
                    name="custoProducao"
                    value={isViewMode ? formatCurrency(ordem.custoProducao) : formatCurrency(ordem.custoProducao)}
                    onChange={(e) => {
                      const numericValue = parseCurrency(e.target.value);
                      setOrdem((prev) => ({ ...prev, custoProducao: numericValue }));
                    }}
                    disabled={isViewMode}
                    readOnly={isViewMode}
                  />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '4px', fontSize: '14px' }}>Quantidade Produzida</label>
                  <Input
                    name="quantidadeProduzida"
                    type="number"
                    min="1"
                    step="1"
                    value={ordem.quantidadeProduzida}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setOrdem((prev) => ({
                        ...prev,
                        quantidadeProduzida: value ? parseInt(value) : ''
                      }));
                    }}
                    disabled={isViewMode}
                    readOnly={isViewMode}
                  />
                </div>

              </FormRow>

              <FormRow>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '4px', fontSize: '14px' }}>Produto</label>
                  {isViewMode ? (
                    <Input
                      value={produtos.find(p => p.id_produto === ordem.idf_produto)?.descricao || ordem.produto || ''}
                      disabled
                      readOnly
                    />
                  ) : (
                    <Select
                      name="idf_produto"
                      value={ordem.idf_produto || ''}
                      onChange={handleChange}
                      disabled={isViewMode}
                    >
                      <option value="">Selecione o produto</option>
                      {produtos.map((p) => (
                        <option key={p.id_produto} value={p.id_produto}>
                          {p.descricao}
                        </option>
                      ))}
                    </Select>
                  )}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label style={{ marginBottom: '4px', fontSize: '14px' }}>Lote</label>
                  <Input
                    name="codigoLote"
                    value={ordem.codigoLote}
                    onChange={handleChange}
                    disabled={isViewMode}
                    readOnly={isViewMode}
                  />
                </div>
              </FormRow>

            </FormSection>
            <Title>Composição</Title>
            <CompositionContainer>
              {composicao.length > 0 ? (
                composicao.map((item, index) => (
                  <CompositionRow key={index}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: '4px', fontSize: '14px' }}>Produto</label>
                      <CompositionInput
                        value={item.descricao || ''}
                        onChange={(e) => handleComposicaoChange(index, 'descricao', e.target.value)}
                        disabled={true}
                        readOnly={true}
                      />
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: '4px', fontSize: '14px' }}>Necessidade</label>
                      <CompositionInput
                        value={item.qtdnecessidade || ''}
                        onChange={(e) => handleComposicaoChange(index, 'qtdnecessidade', e.target.value)}
                        disabled={true}
                        readOnly={true}
                      />
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: '4px', fontSize: '14px' }}>Requisitado</label>
                      <CompositionInput
                        type="number"
                        min="0"
                        step="1"
                        value={item.qtdrequisitado || ''}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          handleComposicaoChange(index, 'qtdrequisitado', value ? parseInt(value) : '');
                        }}
                        disabled={isViewMode}
                        readOnly={isViewMode}
                      />
                    </div>


                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: '4px', fontSize: '14px' }}>Saldo</label>
                      <CompositionInput
                        value={
                          (parseInt(item.qtdnecessidade || 0) - parseInt(item.qtdrequisitado || 0)).toString()
                        }
                        disabled={true}
                        readOnly={true}
                      />
                    </div>



                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: '4px', fontSize: '14px' }}>Unidade</label>
                      <CompositionInput
                        value={item.unidade || item.nome || ''}
                        onChange={(e) => handleComposicaoChange(index, 'unidade', e.target.value)}
                        disabled={true}
                        readOnly={true}
                      />
                    </div>

                    {!isViewMode && (
                      <>
                        <RemoveButton onClick={() => handleRemoveComposicao(item.id)}>-</RemoveButton>
                      </>
                    )}
                  </CompositionRow>

                ))
              ) : (
                <>
                  <p>Nenhuma composição cadastrada.</p>
                  {!isViewMode && (
                    <div style={{ marginTop: '10px' }}>
                    </div>
                  )}
                </>
              )}
            </CompositionContainer>
            <div style={{ marginTop: '20px' }}>
              <CancelButton onClick={() => navigate('/producao')}>Cancelar</CancelButton>
              {!isViewMode && <SaveButton onClick={handleSave}>Salvar</SaveButton>}
            </div>
          </PageContainer>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
};

export default OrdemProducaoForm;
