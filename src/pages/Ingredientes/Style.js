import styled from 'styled-components';

// Estrutura geral
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const PageContainer = styled.div`  
  margin: 50px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center; /* Centraliza o título */
`;

export const BreadcrumbWrapper = styled.div`
  padding: 20px 30px 0 30px;
`;

export const Breadcrumb = styled.div`
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: #666;

  span {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.5);

    &:hover {
      color: #0056b3;
    }
  }
`;

export const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

// Tabela
export const TableWrapper = styled.div`
  flex: 1;
  overflow-x: auto; /* Scroll horizontal */
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1200px; /* Força largura mínima para ativar o scroll horizontal */
`;

export const Thead = styled.thead`
  background-color: #ddd;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #ccc;

  /* Zebra striping - Linhas pares com cor diferente */
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:nth-child(odd) {
    background-color: #ffffff;
  }
`;

export const Th = styled.th`
  padding: 10px;
  text-align: center; /* Centraliza os títulos */
`;

export const Td = styled.td`
  padding: 10px;
  text-align: center; /* Centraliza todas as células */
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

// Botões principais
export const EditButton = styled.button`
  background-color: #ffc107;
  color: #fff;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
`;

export const BackButton = styled.button`
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
`;

export const NewButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
`;

export const SaveButton = styled(NewButton)`
  background-color: green;
`;

export const CancelButton = styled(BackButton)`
  background-color: #dc3545;
  margin-right: 10px;
`;

// Filtros
export const FilterContainer = styled.div`
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 8px;
  width: 250px;
`;

export const FilterTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 16px;
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`;

export const TabButton = styled.button`
  background-color: ${(props) => (props.active ? '#007bff' : '#ccc')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
`;

// Formulários gerais
export const FormSection = styled.div`
  background-color: #d9dde2;
  padding: 20px;
  border-radius: 8px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Checkbox = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 6px;
  }
`;

// Composição
export const CompositionContainer = styled.div`
  background-color: #d9dde2;
  padding: 20px;
  border-radius: 8px;
`;

export const CompositionRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

export const CompositionInput = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const CompositionSelect = styled.select`
  flex: 2;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const AddButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
`;

export const RemoveButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
`;