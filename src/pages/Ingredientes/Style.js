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

export const Title = styled.h1`
  font-size: 22px;
  margin-top: 10px;
`;

export const Image = styled.img`
  width: 120px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin: 30px 0;
  width: 100%;
  max-width: 800px;
`;

export const Card = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

export const CardTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Quantity = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

export const Validity = styled.div`
  margin: 5px 0;
  font-size: 13px;
`;

export const OutOfStock = styled.div`
  background: #944;
  color: white;
  padding: 2px 8px;
  margin: 4px 0;
  font-size: 12px;
  border-radius: 4px;
`;

export const DetailButton = styled.button`
  background: #4e73df;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    opacity: 0.9;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const ActionButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  background-color: ${({ color }) =>
    color === 'blue' ? '#4e73df' : '#ccc'};
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
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