import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Container = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Button = styled.button`
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 6px;
  color: white;
  background-color: ${({ color }) =>
    color === 'green' ? '#28a745' :
    color === 'red' ? '#dc3545' :
    '#4e73df'};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const Table = styled.table`
  width: 100%;
  max-width: 900px;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHeader = styled.th`
  padding: 10px;
  background: #f5f5f5;
  text-align: left;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 10px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  margin-right: 10px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    opacity: 0.6;
  }
`;
