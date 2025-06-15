import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  Wrapper,
  Container,
  Form,
  InputGroup,
  Input,
  Label,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  IconButton
} from './Style';

import { FaTrash, FaEdit } from 'react-icons/fa';

const Utensilios = () => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Form>
          <InputGroup>
            <Label>Nome:</Label>
            <Input type="text" />
          </InputGroup>
          <InputGroup>
            <Label>Data Aquisição:</Label>
            <Input type="date" />
          </InputGroup>
          <InputGroup>
            <Label>Condição:</Label>
            <Input type="text" />
          </InputGroup>
          <Button color="green">Cadastrar Utensílios</Button>
          <Button color="red">Limpar</Button>
          <Button color="blue">Atualizar</Button>
        </Form>

        <Table>
          <thead>
            <TableRow>
              <TableHeader>Nome do Utensílio</TableHeader>
              <TableHeader>Data Aquisição</TableHeader>
              <TableHeader>Condição</TableHeader>
              <TableHeader>Opções</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((_, index) => (
              <TableRow key={index}>
                <TableCell>ESPÁTULA</TableCell>
                <TableCell>22/01/2025</TableCell>
                <TableCell>NOVO</TableCell>
                <TableCell>
                  <IconButton><FaEdit /></IconButton>
                  <IconButton><FaTrash /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Utensilios;
