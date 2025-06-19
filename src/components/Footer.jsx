
import React from 'react';
import styled from 'styled-components';
import logo from '../assets/mini-logo.png';

const FooterContainer = styled.footer`
  background-color: #aeb6bd;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
`;


const MiniLogo = styled.img`
  height: 80px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <MiniLogo src={logo} alt="Mini Logo Cachaçaria" />
    </FooterContainer>
  );
};

export default Footer;
