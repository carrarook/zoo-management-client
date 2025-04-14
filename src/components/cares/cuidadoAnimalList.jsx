import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCuidado, getAnimaisPorCuidado } from '../../services/cuidadoService';
import { getAnimais } from '../../services/animalService';
import { useAppContext } from '../../context/appContext';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import { addAnimalToCuidado } from '../../services/cuidadoService'; 
import '../../styles/components/cuidado.css';
import { API_URL } from '../../services/cuidadoService';

const CuidadoAnimalList = () => {
  const { id } = useParams();
  const [cuidado, setCuidado] = useState(null);
  const [animaisAssociados, setAnimaisAssociados] = useState([]);
  const [todosAnimais, setTodosAnimais] = useState([]);
  const [animalSelecionado, setAnimalSelecionado] = useState('');
  const { loading, setLoading, error, setError, showNotification } = useAppContext();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cuidadoData, animaisAssociadosData, todosAnimaisData] = await Promise.all([
        getCuidado(id),
        getAnimaisPorCuidado(id),
        getAnimais()
      ]);
      
      setCuidado(cuidadoData);
      setAnimaisAssociados(animaisAssociadosData?.$values ?? []);
      setTodosAnimais(todosAnimaisData?.$values ?? []); // 👈 AQUI!
    } catch (err) {
      setError('Falha ao carregar os dados.');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar animais não associados
  const animaisDisponiveis = todosAnimais.filter(animal => 
    !animaisAssociados.some(a => a.id === animal.id)
  );

  const handleAddAnimal = async () => {
    if (!animalSelecionado) return;
    
    setLoading(true);
    try {
      await addAnimalToCuidado(id, animalSelecionado);
      
      showNotification('Animal adicionado com sucesso!');
      fetchData(); // Recarregar dados
    } catch (err) {
      setError('Falha ao adicionar animal ao cuidado.');
    } finally {
      setLoading(false);
      setAnimalSelecionado('');
    }
  };

  const handleRemoveAnimal = async (animalId) => {
    setLoading(true);
    try {
      await removeAnimalFromCuidado(id, animalId);
      
      showNotification('Animal removido com sucesso!');
      fetchData(); // Recarregar dados
    } catch (err) {
      setError('Falha ao remover animal do cuidado.');
    } finally {
      setLoading(false);
    }
  };

  //apis

  const removeAnimalFromCuidado = async (cuidadoId, animalId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/cuidados/${cuidadoId}/animais/${animalId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        showNotification('Animal removido com sucesso!');
        fetchData(); // Recarregar dados
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao remover o animal');
      }
    } catch (err) {
      setError('Falha ao remover animal do cuidado.');
    } finally {
      setLoading(false);
    }
  };
  

  if (loading && !cuidado) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!cuidado) return null;

  return (
    <div className="cuidado-animal-list-container">
      <div className="header-actions">
        <h1>Animais Associados ao Cuidado: {cuidado.nome}</h1>
        <Link to={`/cuidados/${id}`} className="btn btn-secondary">
          Voltar para Detalhes
        </Link>
      </div>
      
      <div className="add-animal-form">
        <div className="form-row">
          <select 
            value={animalSelecionado} 
            onChange={(e) => setAnimalSelecionado(e.target.value)}
            className="form-control"
            disabled={loading || animaisDisponiveis.length === 0}
          >
            <option value="">Selecione um animal para adicionar</option>
            {animaisDisponiveis.map(animal => (
              <option key={animal.id} value={animal.id}>
                {animal.nome} ({animal.especie})
              </option>
            ))}
          </select>
          <button 
            type="button" 
            onClick={handleAddAnimal}
            disabled={!animalSelecionado || loading}
            className="btn btn-success"
          >
            Adicionar Animal
          </button>
        </div>
      </div>
      
      {animaisAssociados.length === 0 ? (
        <p className="no-data-message">Nenhum animal associado a este cuidado.</p>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Espécie</th>
                <th>Habitat</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {animaisAssociados.map(animal => (
                <tr key={animal.id}>
                  <td>{animal.nome}</td>
                  <td>{animal.especie}</td>
                  <td>{animal.habitat}</td>
                  <td>
                    <Link to={`/animais/${animal.id}`} className="btn btn-sm btn-info">
                      Detalhes
                    </Link>
                    <button 
                      onClick={() => handleRemoveAnimal(animal.id)} 
                      className="btn btn-sm btn-danger ml-2"
                      disabled={loading}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CuidadoAnimalList;