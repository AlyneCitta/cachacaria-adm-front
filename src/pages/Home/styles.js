import styled from 'styled-components';

export const HomeContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

export const WelcomeText = styled.h2`
  margin-bottom: 5px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 190px); /* 3 colunas fixas de 200px */
  gap: 50px; /* espaço entre os cards */
  justify-content: center; /* centraliza o grid horizontalmente */
  margin-top: 40px;
  margin-bottom:40px;
`;

export const Card = styled.div`
  background-color: #f9b98b;
  padding: 5px;
  border-radius: 12px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  min-width: 180px;
  aspect-ratio: 1 / 1;

  img {
    padding: 5px;
    width: 70px;
    height: 70px;
    object-fit: contain;
    margin-bottom: 8px;
  }

  &:hover {
    opacity: 0.9;
  }
`;


