
import React from 'react';
import styled from 'styled-components';
import logo from '../assets/mini-logo.png'; 

const FooterContainer = styled.footer`
  background-color: #aeb6bd;
  padding: 20px;
  display: flex;
  justify-content: center;
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
