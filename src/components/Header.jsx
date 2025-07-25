import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import profileIcon from '../assets/profileIcon.png';
import { FaBars } from 'react-icons/fa';
import SidebarMenu from './SidebarMenu';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #aeb6bd;
  position: relative;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  color: white;
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

const LoginButton = styled.button`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #2980b9;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1f6391;
  }
`;

const Header = () => {

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Sessão expirada ou não autenticado. Faça login novamente.');
      logout();
      navigate('/login');
    }
  }, []);


  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const menuItems = [
    { label: 'Home', href: '/home' },
    { label: 'Bebidas', href: '/bebidas' },
    { label: 'Ingredientes', href: '/ingredientes' },
    { label: 'Compras', href: '/compras' },
    { label: 'Vendas', href: '/vendas' },
    { label: 'Estoque', href: '/estoque' },
    { label: 'Produção', href: '/producao' },
    { label: 'Clientes', href: '/clientesList' },
    { label: 'Fornecedores', href: '/fornecedoreslist' },
    { label: 'Maquinário', href: '/maquinariolist' },
  ];

  return (
    <>
      <HeaderContainer>
        <MenuIcon ref={menuButtonRef} onClick={() => setMenuOpen(prev => !prev)}>
          <FaBars />
        </MenuIcon>
        <Logo src={logo} alt="Logo Cachaçaria Antônio Carlos" />

        {user ? (
          <ProfileSection>
            <ProfileImage src={profileIcon} alt="Ícone do perfil" />
            <ExitLink href="/" onClick={(e) => {
              e.preventDefault();
              logout();
            }}>
              Sair →
            </ExitLink>
          </ProfileSection>
        ) : (
          <LoginButton onClick={() => navigate('/login')}>
            Entrar
          </LoginButton>
        )}
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
