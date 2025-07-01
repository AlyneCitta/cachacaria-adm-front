import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import GlobalStyle from "../../globalStyle/style.js";
import api from '../../api/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  PageWrapper, PageContainer, Title, BreadcrumbWrapper, Breadcrumb,
  CancelButton, SaveButton, FormSection, FormRow, Input, ContentWrapper,
  AddButton, RemoveButton, CompositionRow, CompositionInput, CompositionSelect
} from './Style';

const VendasForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  // detecta se está em /view/:id
  const isViewMode = pathname.includes('/view/');

  const [venda, setVenda] = useState({
    cliente: '',
    idf_identificacao: '',
    documento: '',
    dataEmissao: '',
    dataEntrada: '',
    valorBruto: '',
    valorLiquido: '',
    protocolo: '',
    frete: '',
    chave: '',
    natureza: '',
  });

  const [itens, setItens] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(false);

  const somaValorTotal = itens.reduce((acc, item) => {
    const valor = parseFloat(item.valorTotal) || 0;
    return acc + valor;
  }, 0).toFixed(2);

  useEffect(() => {
    setVenda((prev) => ({
      ...prev,
      valorLiquido: somaValorTotal,
    }));
  }, [somaValorTotal]);

  useEffect(() => {
    const frete = parseFloat(venda.frete) || 0;
    const bruto = (parseFloat(somaValorTotal) + frete).toFixed(2);
    setVenda((prev) => ({
      ...prev,
      valorBruto: bruto,
    }));
  }, [somaValorTotal, venda.frete]);



  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/api/compravenda/${id}`)
        .then((response) => {
          const data = response.data;

          setVenda({
            idf_identificacao: data.idf_identificacao || '',   // deve ser um número, tipo 2
            documento: data.nrodocto || '',                    // número do documento
            dataEmissao: formatDateInput(data.dtaemissao),
            dataEntrada: formatDateInput(data.dtaentrada),
            valorBruto: data.valorbruto?.toString() || '',
            valorLiquido: data.valorliquido?.toString() || '',
            protocolo: data.protocoloaut || '',
            frete: data.valorfrete?.toString() || '',
            chave: data.chavenfe || '',
            natureza: data.naturezamovimentacao || '',
          });


          setItens(data.itens?.map((item, index) => ({
            id: Date.now() + index,
            idf_produto: item.idf_produto || null,           // ← aqui!
            produto: item.descricao || '',
            quantidade: item.qtdmov?.toString() || '',
            unidade: item.nome || '',
            idf_lote: item.idf_lote || null,
            valorUnitario: item.valorunitario?.toString() || '',
            valorTotal: ((item.qtdmov * item.valorunitario)?.toFixed(2)) || ''
          })) || []);

          setLoading(false);
        })
        .catch((err) => {
          console.error('Erro ao carregar venda:', err);
          alert('Não foi possível carregar os dados.');
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    api.get('/api/compravenda/venda/cli')
      .then(response => {
        setClientes(response.data);
      })
      .catch(err => {
        console.error('Erro ao carregar clientes:', err);
        alert('Erro ao carregar a lista de clientes.');
      });
  }, []);


  useEffect(() => {
    api.get('/api/unidades')
      .then(response => {
        setUnidades(response.data);
      })
      .catch(err => {
        console.error('Erro ao carregar unidades:', err);
        alert('Erro ao carregar unidades.');
      });
  }, []);

  useEffect(() => {
    api.get('/api/products/produto/preco')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(err => {
        console.error('Erro ao carregar produtos:', err);
        alert('Erro ao carregar produtos.');
      });
  }, []);

  const formatCurrency = (value) => {
    if (value === '' || isNaN(value)) return '';
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const onlyNumbersAndComma = (value) => {
    return value.replace(/[^\d,]/g, '').replace(',', '.');
  };

  const formatNumber = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  const parseCurrency = (value) => {
    const num = value.replace(/[^\d,.-]/g, '').replace(',', '.');
    return isNaN(num) ? '' : num;
  };


  const formatDateInput = dateString => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenda((prev) => ({
      ...prev,
      [name]: name === 'idf_identificacao' ? parseInt(value, 10) : value,
    }));
  };




  const handleAddItem = () => {
    setItens(a => [...a, { id: Date.now(), produto: '', quantidade: '', unidade: '', valorUnitario: '', valorTotal: '' }]);
  };

  const handleRemoveItem = remId => {
    setItens(a => a.filter(i => i.id !== remId));
  };

  const handleItemChange = (itemId, field, val) => {
    setItens(prevItens =>
      prevItens.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: val };

          if (field === 'quantidade' && updatedItem.valorUnitario) {
            const total = (parseFloat(val || 0) * parseFloat(updatedItem.valorUnitario || 0)).toFixed(2);
            updatedItem.valorTotal = isNaN(total) ? '' : total;
          }

          return updatedItem;
        }
        return item;
      })
    );
  };


  const handleSave = async () => {
    try {
      const payload = {
        nrodocto: venda.documento,
        protocoloaut: venda.protocolo,
        chavenfe: venda.chave,
        dtaemissao: venda.dataEmissao,
        dtaentrada: venda.dataEntrada,
        valorbruto: parseFloat(venda.valorBruto) || 0,
        valorliquido: parseFloat(venda.valorLiquido) || 0,
        valorfrete: parseFloat(venda.frete) || 0,
        naturezamovimentacao: "venda",
        idf_identificacao: venda.idf_identificacao,
        idf_usuario: 1,
        itens: itens.map(item => {
          const produtoObj = produtos.find(p => p.descricao === item.produto);
          const unidadeObj = unidades.find(u => u.nome === item.unidade);

          return {
            qtdmov: parseInt(item.quantidade) || 0,
            valorunitario: parseFloat(item.valorUnitario) || 0,
            idf_produto: produtoObj?.id || null,
            idf_lote: 1,
            idf_unidade: unidadeObj?.id || null
          };
        })

      };

      console.log('aa');

      console.log('Payload final para envio:', payload);

      await api.post('/api/compravenda/new/venda', payload);
      alert('Documento salvo com sucesso!');
      navigate('/vendas');
    } catch (error) {
      console.error('Erro ao salvar venda:', error);
      alert('Erro ao salvar o documento de venda.');
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
            <span onClick={() => navigate('/vendas')}> Vendas</span> &gt;
            <span>{isViewMode ? ' Visualizar Documento' : id ? ' Editar Documento' : ' Nova Venda'}</span>
          </Breadcrumb>
        </BreadcrumbWrapper>
        <PageWrapper>
          <PageContainer>
            <Title>
              {isViewMode ? 'Visualizar Venda' : id ? 'Editar Venda' : 'Nova Venda'}
            </Title>

            {loading ? (
              <p>Carregando dados...</p>
            ) : (
              <>
                <FormSection>
                  <FormRow>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 4, fontSize: 14 }}>Cliente</label>
                      <select
                        name="idf_identificacao"
                        value={venda.idf_identificacao}
                        onChange={handleChange}
                        disabled={isViewMode}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
                      >
                        <option value="">Selecione um cliente</option>
                        {clientes.map(cli => (
                          <option key={cli.id} value={cli.id}>
                            {cli.nome}
                          </option>
                        ))}
                      </select>

                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 4, fontSize: 14 }}>Data de Emissão</label>
                      <Input
                        name="dataEmissao"
                        type="date"
                        value={venda.dataEmissao}
                        onChange={handleChange}
                        disabled={isViewMode}
                      />
                    </div>
                  </FormRow>

                  <FormRow>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 4, fontSize: 14 }}>Número Documento</label>
                      <Input
                        name="documento"
                        value={venda.documento}
                        onChange={handleChange}
                        disabled={isViewMode}
                      />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 4, fontSize: 14 }}>Valor Bruto</label>
                      <Input
                        name="valorBruto"
                        value={venda.valorBruto}
                        onChange={(e) => {
                          const numericValue = onlyNumbersAndComma(e.target.value);
                          setVenda((prev) => ({ ...prev, valorBruto: numericValue }));
                        }}
                        onBlur={() => {
                          setVenda((prev) => ({
                            ...prev,
                            valorBruto: prev.valorBruto ? parseFloat(prev.valorBruto).toFixed(2) : '0.00',
                          }));
                        }}
                        disabled={true}
                        readOnly={true}
                      />
                    </div>
                  </FormRow>

                  <FormRow>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 4, fontSize: 14 }}>Valor do Frete</label>
                      <Input
                        name="frete"
                        value={venda.frete}
                        onChange={(e) => {
                          const numericValue = onlyNumbersAndComma(e.target.value);
                          setVenda((prev) => ({ ...prev, frete: numericValue }));
                        }}
                        onBlur={() => {
                          setVenda((prev) => ({
                            ...prev,
                            frete: prev.frete ? parseFloat(prev.frete).toFixed(2) : '0.00',
                          }));
                        }}
                        disabled={isViewMode}
                      />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 4, fontSize: 14 }}>Valor Líquido</label>
                      <Input
                        name="valorLiquido"
                        value={venda.valorLiquido}
                        onChange={(e) => {
                          const numericValue = onlyNumbersAndComma(e.target.value);
                          setVenda((prev) => ({ ...prev, valorLiquido: numericValue }));
                        }}
                        onBlur={() => {
                          setVenda((prev) => ({
                            ...prev,
                            valorLiquido: prev.valorLiquido ? parseFloat(prev.valorLiquido).toFixed(2) : '0.00',
                          }));
                        }}
                        disabled={true}
                        readOnly={true}
                      />
                    </div>
                  </FormRow>

                  <FormRow>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 4, fontSize: 14 }}>Protocolo de Autorização</label>
                      <Input
                        name="protocolo"
                        value={venda.protocolo}
                        onChange={handleChange}
                        disabled={isViewMode}
                      />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 4, fontSize: 14 }}>Data Entrada</label>
                      <Input
                        name="dataEntrada"
                        type="date"
                        value={venda.dataEntrada}
                        onChange={handleChange}
                        disabled={isViewMode}
                      />
                    </div>
                  </FormRow>
                  <FormRow>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label style={{ marginBottom: 4, fontSize: 14 }}>Chave NFE</label>
                      <Input
                        name="chave"
                        value={venda.chave}
                        onChange={handleChange}
                        disabled={isViewMode}
                      />
                    </div>
                  </FormRow>
                </FormSection>
              </>
            )}
            <Title>Itens</Title>
            <FormSection>
              {itens.map(item => (
                <CompositionRow key={item.id}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: 4, fontSize: 14 }}>Produto</label>
                    <select
                      value={item.idf_produto || ''} // você precisará armazenar o ID agora
                      onChange={(e) => {
                        const produtoId = parseInt(e.target.value, 10);
                        const produtoObj = produtos.find(p => p.id === produtoId);

                        if (produtoObj) {
                          handleItemChange(item.id, 'idf_produto', produtoId); // armazenar o ID
                          handleItemChange(item.id, 'produto', produtoObj.descricao); // se quiser manter nome
                          handleItemChange(item.id, 'valorUnitario', produtoObj.preco.toString());

                          if (item.quantidade) {
                            const total = (parseFloat(item.quantidade) * produtoObj.preco).toFixed(2);
                            handleItemChange(item.id, 'valorTotal', total);
                          }
                        }
                      }}
                      disabled={isViewMode}
                      style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Selecione um produto</option>
                      {produtos.map(p => (
                        <option key={p.id} value={p.id}>
                          {`${p.descricao} - Lote: ${p.codigo}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: 4, fontSize: 14 }}>Quantidade</label>
                    <CompositionInput
                      placeholder="Quantidade"
                      value={item.quantidade}
                      onChange={(e) => {
                        const intVal = formatNumber(e.target.value);
                        handleItemChange(item.id, 'quantidade', intVal);

                        // Atualiza total se já tiver valorUnitario preenchido:
                        if (item.valorUnitario) {
                          const total = (parseFloat(item.valorUnitario) * parseInt(intVal || 0)).toFixed(2);
                          handleItemChange(item.id, 'valorTotal', isNaN(total) ? '' : total);
                        }
                      }}
                      disabled={isViewMode}
                    />

                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: 4, fontSize: 14 }}>Unidade</label>
                    <select
                      value={item.unidade}
                      onChange={e => handleItemChange(item.id, 'unidade', e.target.value)}
                      disabled={isViewMode}
                      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
                    >
                      <option value="">Selecione uma unidade</option>
                      {(!unidades.some(u => u.nome === item.unidade) && item.unidade) && (
                        <option value={item.unidade}>{item.unidade}</option>
                      )}

                      {unidades.map(un => (
                        <option key={un.id} value={un.nome}>
                          {un.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: 4, fontSize: 14 }}>Valor Unitário</label>
                    <CompositionInput
                      placeholder="Valor Unitário"
                      value={item.valorUnitario}
                      onChange={(e) => {
                        const numeric = onlyNumbersAndComma(e.target.value);
                        handleItemChange(item.id, 'valorUnitario', numeric);

                        if (numeric && item.quantidade) {
                          const total = (parseFloat(numeric) * parseInt(item.quantidade)).toFixed(2);
                          handleItemChange(item.id, 'valorTotal', total);
                        }
                      }}
                      onBlur={() => {
                        handleItemChange(item.id, 'valorUnitario', item.valorUnitario ? parseFloat(item.valorUnitario).toFixed(2) : '0.00');
                      }}
                      disabled={isViewMode}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: 4, fontSize: 14 }}>Valor Total</label>
                    <CompositionInput
                      placeholder="Valor Total"
                      value={item.valorTotal}
                      onChange={(e) => {
                        const numeric = onlyNumbersAndComma(e.target.value);
                        handleItemChange(item.id, 'valorTotal', numeric);
                      }}
                      onBlur={() => {
                        handleItemChange(item.id, 'valorTotal', item.valorTotal ? parseFloat(item.valorTotal).toFixed(2) : '0.00');
                      }}
                      disabled={true}
                      readOnly={true}
                    />
                  </div>
                  {!isViewMode && (
                    <>
                      <AddButton onClick={handleAddItem}>+</AddButton>
                      <RemoveButton onClick={() => handleRemoveItem(item.id)}>-</RemoveButton>
                    </>
                  )}
                </CompositionRow>
              ))}
              {/* ✅ Botão para adicionar o primeiro item */}
              {!isViewMode && itens.length === 0 && (
                <div style={{ marginTop: '10px' }}>
                  <AddButton onClick={handleAddItem}>Adicionar Item</AddButton>
                </div>
              )}
            </FormSection>


            <div style={{ marginTop: 20 }}>
              <CancelButton onClick={() => navigate('/vendas')}>Cancelar</CancelButton>
              {!isViewMode && <SaveButton onClick={handleSave}>Salvar</SaveButton>}
            </div>
          </PageContainer>
        </PageWrapper>
      </main>
      <Footer />
    </>
  );
};

export default VendasForm;
