import React, { useState } from 'react';
import { addCuidadoToAnimal, removeCuidadoFromAnimal } from '../../services/animalService';
import { useAppContext } from '../../context/appContext';
import ConfirmDialog from '../shared/ConfirmDialog';
import '../../styles/components/animal.css';

const AnimalCuidadoList = ({ animalId, animalCuidados, allCuidados }) => {
  const [selectedCuidado, setSelectedCuidado] = useState('');
  const [cuidadoToRemove, setCuidadoToRemove] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { loading, setLoading, setError, showNotification } = useAppContext();

  // Garantir que animalCuidados e allCuidados sejam arrays
  const safeAnimalCuidados = Array.isArray(animalCuidados) ? animalCuidados : [];
  const safeAllCuidados = Array.isArray(allCuidados) ? allCuidados : [];

  // Filtrar cuidados disponíveis (não associados ainda)
  const associatedCuidadoIds = safeAnimalCuidados.map(ac => 
    ac.cuidado ? ac.cuidado.id : ac.cuidadoId
  );

  const availableCuidados = safeAllCuidados.filter(cuidado => 
    !associatedCuidadoIds.includes(cuidado.id)
  );

  const handleAddCuidado = async () => {
    if (!selectedCuidado) return;
    
    setLoading(true);
    try {
      await addCuidadoToAnimal(animalId, selectedCuidado);
      showNotification('Cuidado adicionado com sucesso!');
      window.location.reload();
    } catch (err) {
      setError('Falha ao adicionar cuidado ao animal.');
    } finally {
      setLoading(false);
      setSelectedCuidado('');
    }
  };

  const handleRemoveClick = (cuidado) => {
    setCuidadoToRemove(cuidado);
    setConfirmDialogOpen(true);
  };

  const confirmRemove = async () => {
    setLoading(true);
    try {
      await removeCuidadoFromAnimal(animalId, cuidadoToRemove.id || cuidadoToRemove.cuidadoId);
      showNotification('Cuidado removido com sucesso!');
      window.location.reload();
    } catch (err) {
      setError('Falha ao remover cuidado do animal.');
    } finally {
      setLoading(false);
      setConfirmDialogOpen(false);
      setCuidadoToRemove(null);
    }
  };

  const cancelRemove = () => {
    setConfirmDialogOpen(false);
    setCuidadoToRemove(null);
  };

  // Obter cuidados associados para exibição
  const cuidadosAssociados = safeAnimalCuidados.map(ac => {
    if (ac.cuidado) {
      return ac.cuidado;
    }
    return safeAllCuidados.find(c => c.id === ac.cuidadoId) || { id: ac.cuidadoId, nome: 'Cuidado não encontrado' };
  });

  return (
    <div className="animal-cuidados-section">
      <h2>Cuidados do Animal</h2>
      
      <div className="add-cuidado-form">
        <div className="form-row">
          <select 
            value={selectedCuidado} 
            onChange={(e) => setSelectedCuidado(e.target.value)}
            className="form-control"
            disabled={loading || availableCuidados.length === 0}
          >
            <option value="">Selecione um cuidado para adicionar</option>
            {availableCuidados.map(cuidado => (
              <option key={cuidado.id} value={cuidado.id}>
                {cuidado.nome}
              </option>
            ))}
          </select>
          <button 
            type="button" 
            onClick={handleAddCuidado}
            disabled={!selectedCuidado || loading}
            className="btn btn-success"
          >
            Adicionar Cuidado
          </button>
        </div>
      </div>
      
      {cuidadosAssociados.length === 0 ? (
        <p className="no-data-message">Este animal não tem cuidados associados.</p>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome do Cuidado</th>
                <th>Frequência</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cuidadosAssociados.map(cuidado => (
                <tr key={cuidado.id}>
                  <td>{cuidado.nome}</td>
                  <td>{cuidado.frequencia}</td>
                  <td>
                    <button 
                      onClick={() => handleRemoveClick(cuidado)} 
                      className="btn btn-sm btn-danger"
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
      
      <ConfirmDialog 
        isOpen={confirmDialogOpen}
        title="Confirmar Remoção"
        message={`Tem certeza que deseja remover o cuidado ${cuidadoToRemove?.nome} deste animal?`}
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
      />
    </div>
  );
};


export default AnimalCuidadoList;