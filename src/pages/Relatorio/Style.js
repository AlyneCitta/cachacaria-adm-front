import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 16px;
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 220px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

export const CardIcon = styled.div`
  margin-bottom: 10px;
`;

export const CardTitle = styled.h2`
  font-size: 14px;
  margin-bottom: 16px;
`;

export const GenerateButton = styled.button`
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: #16a34a;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

