
import { BrowserRouter } from 'react-router-dom';
import { AuthRoutes } from './auth.routes';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login'; // Caminho para o componente Login

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}