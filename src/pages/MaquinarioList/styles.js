import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 30px;
`;

export const PageContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
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
  margin-bottom: 15px;
`;

export const BackButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

export const NewButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: #f2f2f2;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #ccc;
`;

export const Th = styled.th`
  padding: 10px;
  text-align: left;
`;

export const Td = styled.td`
  padding: 10px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-start;  /* puxando para a esquerda */
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ViewButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;

export const EditButton = styled.button`
  background-color: #ffc107;
  color: black;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0a800;
  }
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;
