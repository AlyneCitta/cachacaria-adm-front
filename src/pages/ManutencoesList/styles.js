import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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

export const PageContainer = styled.div`
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

export const Thead = styled.thead`
  background-color: #007bff;
  color: white;
`;

export const Tbody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f3f3f3;
  }
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

export const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

export const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const NewButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const BackButton = styled(NewButton)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const EditButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #0056b3;
  }
`;

export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #c82333;
  }
`;
