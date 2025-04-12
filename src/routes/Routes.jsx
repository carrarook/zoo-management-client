import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        
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
        
        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;