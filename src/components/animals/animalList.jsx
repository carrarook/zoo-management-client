import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAnimais, deleteAnimal } from '../../services/animalService';
import { useAppContext } from '../../context/appContext';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import ConfirmDialog from '../shared/ConfirmDialog';
import '../../styles/components/animal.css';

const AnimalList = () => {
  const [animais, setAnimais] = useState([]);
  const [animalToDelete, setAnimalToDelete] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { loading, setLoading, error, setError, showNotification } = useAppContext();

  useEffect(() => {
    fetchAnimais();
  }, []);

  const fetchAnimais = async () => {
    setLoading(true);
    try {
      const response = await getAnimais();
      console.log(response);  
      
      if (Array.isArray(response['$values'])) {
        setAnimais(response['$values']);  // Atualiza o estado com o array de animais
      } else {
        setError('Formato de dados inválido.');
      }
    } catch (err) {
      setError('Falha ao carregar a lista de animais.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (animal) => {
    setAnimalToDelete(animal);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await deleteAnimal(animalToDelete.id);
      setAnimais(animais.filter(animal => animal.id !== animalToDelete.id));
      showNotification(`Animal ${animalToDelete.nome} excluído com sucesso!`);
    } catch (err) {
      setError('Falha ao excluir o animal.');
    } finally {
      setLoading(false);
      setConfirmDialogOpen(false);
      setAnimalToDelete(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDialogOpen(false);
    setAnimalToDelete(null);
  };

  if (loading && animais.length === 0) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="animal-list-container">
      <div className="header-actions">
        <h1>Animais do Zoológico</h1>
        <Link to="/animais/novo" className="btn btn-primary">
          Adicionar Novo Animal
        </Link>
      </div>
      
      {animais.length === 0 ? (
        <p className="no-data-message">Nenhum animal cadastrado.</p>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Data de Nascimento</th>
                <th>Habitat</th>
                <th>País de Origem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {animais.map(animal => (
                <tr key={animal.id}>
                  <td>{animal.nome}</td>
                  <td>{animal.especie}</td>
                  <td>{new Date(animal.dataNascimento).toLocaleDateString()}</td>
                  <td>{animal.habitat}</td>
                  <td>{animal.paisOrigem}</td>
                  <td className="actions">
                    <Link to={`/animais/${animal.id}`} className="btn btn-sm btn-info">
                      Detalhes
                    </Link>
                    <Link to={`/animais/editar/${animal.id}`} className="btn btn-sm btn-warning">
                      Editar
                    </Link>
                    <button 
                      onClick={() => handleDeleteClick(animal)} 
                      className="btn btn-sm btn-danger"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <ConfirmDialog 
        isOpen={confirmDialogOpen}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o animal ${animalToDelete?.nome}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default AnimalList;