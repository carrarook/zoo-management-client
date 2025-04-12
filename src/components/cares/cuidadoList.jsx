import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCuidados, deleteCuidado } from '../../services/cuidadoService';
import { useAppContext } from '../../context/appContext';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import ConfirmDialog from '../shared/ConfirmDialog';
import '../../styles/components/cuidado.css';

const CuidadoList = () => {
  const [cuidados, setCuidados] = useState([]);
  const [cuidadoToDelete, setCuidadoToDelete] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { loading, setLoading, error, setError, showNotification } = useAppContext();

  useEffect(() => {
    fetchCuidados();
  }, []);

  const fetchCuidados = async () => {
    setLoading(true);
    try {
      const data = await getCuidados();
      setCuidados(data);
    } catch (err) {
      setError('Falha ao carregar a lista de cuidados.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (cuidado) => {
    setCuidadoToDelete(cuidado);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await deleteCuidado(cuidadoToDelete.id);
      setCuidados(cuidados.filter(c => c.id !== cuidadoToDelete.id));
      showNotification(`Cuidado ${cuidadoToDelete.nome} excluído com sucesso!`);
    } catch (err) {
      setError('Falha ao excluir o cuidado.');
    } finally {
      setLoading(false);
      setConfirmDialogOpen(false);
      setCuidadoToDelete(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDialogOpen(false);
    setCuidadoToDelete(null);
  };

  if (loading && cuidados.length === 0) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="cuidado-list-container">
      <div className="header-actions">
        <h1>Cuidados do Zoológico</h1>
        <Link to="/cuidados/novo" className="btn btn-primary">
          Adicionar Novo Cuidado
        </Link>
      </div>
      
      {cuidados.length === 0 ? (
        <p className="no-data-message">Nenhum cuidado cadastrado.</p>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Frequência</th>
                <th>Animais Associados</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cuidados.map(cuidado => (
                <tr key={cuidado.id}>
                  <td>{cuidado.nome}</td>
                  <td>{cuidado.frequencia}</td>
                  <td>{cuidado.animalCuidados?.length || 0}</td>
                  <td className="actions">
                    <Link to={`/cuidados/${cuidado.id}`} className="btn btn-sm btn-info">
                      Detalhes
                    </Link>
                    <Link to={`/cuidados/editar/${cuidado.id}`} className="btn btn-sm btn-warning">
                      Editar
                    </Link>
                    <button 
                      onClick={() => handleDeleteClick(cuidado)} 
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
        message={`Tem certeza que deseja excluir o cuidado ${cuidadoToDelete?.nome}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default CuidadoList;