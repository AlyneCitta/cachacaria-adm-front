import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
`;

export const PageContainer = styled.div`
  padding: 30px;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
`;

export const Title = styled.h2`
  text-align: center;
  margin: 10px 0 20px 0;
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
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 15px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

export const NewButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
  }
`;

export const BackButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

export const Thead = styled.thead`
  background-color: #f5f5f5;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const Th = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

export const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #eee;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

export const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0069d9;
  }
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #c82333;
  }
`;

export const ViewButton = styled.button`
  background-color: #17a2b8;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #138496;
  }
`;
