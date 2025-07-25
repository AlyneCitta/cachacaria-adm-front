import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 1rem;
`;

export const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &.visualizacao {
    background-color: #f5f5f5;
    border-color: transparent;
    color: #666;
  }
`;

export const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &.visualizacao {
    background-color: #f5f5f5;
    border-color: transparent;
    color: #666;
    pointer-events: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.className === 'secondary' ? '#6c757d' : '#28a745')};
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  min-width: 120px;

  &:hover {
    background-color: ${(props) => (props.className === 'secondary' ? '#5a6268' : '#218838')};
  }
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
