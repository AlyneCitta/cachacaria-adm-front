// src/components/Header.jsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png'; // <- nova imagem
import { FaBars } from 'react-icons/fa';
import SidebarMenu from './SidebarMenu';

const HeaderContainer = styled.header`
  background-color: #aeb6bd;
  position: relative;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 140px;
`;

const MenuIcon = styled.div`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40px;
  cursor: pointer;
  color: white; /* Altera a cor do ícone para branco */
`;

const ProfileSection = styled.div`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const ExitLink = styled.a`
  color: blue;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef();

  const menuItems = [
    { label: 'Home', href: '/home' },
    { label: 'Sabores', href: '/sabores' },
    { label: 'Estoque', href: '/estoque' },
    { label: 'Compras', href: '/compra' },
    { label: 'Vendas', href: '/vendas' },
    { label: 'Clientes', href: '/clientes' },
    { label: 'Fornecedores', href: '/fornecedores' },
    { label: 'Ingredientes', href: '/ingredientes' },
    { label: 'Utensílios', href: '/utensilios' },
    { label: 'Bebidas', href: '/bebidas' },
    { label: 'Maquinário', href: '/maquinario' },
    { label: 'Relatórios', href: '/relatorio' },
  ];

  return (
    <>
      <HeaderContainer>
        <MenuIcon ref={menuButtonRef} onClick={() => setMenuOpen(prev => !prev)}>
          <FaBars />
        </MenuIcon>
        <Logo src={logo} alt="Logo Cachaçaria Antônio Carlos" />
        <ProfileSection>
          <ProfileText>
            <Name>Guilherme</Name>
            <ExitLink href="/">Sair →</ExitLink>
          </ProfileText>
          <ProfileImage src={profileIcon} alt="Ícone do perfil" />
        </ProfileSection>
      </HeaderContainer>

      <SidebarMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={menuItems}
        ignoreRef={menuButtonRef}
      />
    </>
  );
};

export default Header;
