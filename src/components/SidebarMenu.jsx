// src/components/SidebarMenu.jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  position: fixed;
  top: 168px; /* altura do header */
  width: 180px;
  background-color: #e6ebf0;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  padding: 20px;
  z-index: 1000;
  border-radius: 8px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const MenuItem = styled.a`
  display: block;
  margin-bottom: 20px;
  text-decoration: none;
  color: #000; /* texto preto */
  font-size: 18px; /* maior que o padrão */
  font-weight: bold;

  &:hover {
    color: #007BFF; /* azul no hover */
  }
`;

const SidebarMenu = ({ isOpen, onClose, items, ignoreRef }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        (!ignoreRef?.current || !ignoreRef.current.contains(event.target))
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, ignoreRef]);

  return (
    <SidebarContainer ref={menuRef} isOpen={isOpen}>
      {items.map((item, index) => (
        <MenuItem key={index} href={item.href}>
          {item.label}
        </MenuItem>
      ))}
    </SidebarContainer>
  );
};

export default SidebarMenu;
