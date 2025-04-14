import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AuthLayout from '../components/auth/AuthLayout';
import Dashboard from '../components/Dashboard';

// Animais
import AnimalList from '../components/animals/animalList';
import AnimalForm from '../components/animals/animalForm';
import AnimalDetails from '../components/animals/animalDetails';

// Cuidados
import CuidadoList from '../components/cares/cuidadoList';
import CuidadoForm from '../components/cares/cuidadoForm';
import CuidadoDetails from '../components/cares/cuidadoDetails';
import CuidadoAnimalList from '../components/cares/cuidadoAnimalList';

// Outros
import NotFound from '../components/NotFound';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import Profile from '../components/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas de autenticação com layout próprio */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Route>

      {/* Redirecionar raiz para dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Rotas públicas com layout principal */}
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />

        {/* Rotas de Animais */}
        <Route path="animais">
          <Route index element={<AnimalList />} />
          <Route path="novo" element={<AnimalForm />} />
          <Route path=":id" element={<AnimalDetails />} />
          <Route path="editar/:id" element={<AnimalForm />} />
        </Route>

        {/* Rotas de Cuidados */}
        <Route path="cuidados">
          <Route index element={<CuidadoList />} />
          <Route path="novo" element={<CuidadoForm />} />
          <Route path=":id" element={<CuidadoDetails />} />
          <Route path=":id/animais" element={<CuidadoAnimalList />} />
          <Route path="editar/:id" element={<CuidadoForm />} />
        </Route>

        {/* Perfil e NotFound (também públicos) */}
        <Route path="perfil" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
