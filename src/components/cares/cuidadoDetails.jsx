import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCuidado, getAnimaisPorCuidado } from '../../services/cuidadoService';
import { useAppContext } from '../../context/appContext';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import '../../styles/components/cuidado.css';

const CuidadoDetails = () => {
  const { id } = useParams();
  const [cuidado, setCuidado] = useState(null);
  const [animais, setAnimais] = useState([]);
  const { loading, setLoading, error, setError } = useAppContext();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const cuidadoData = await getCuidado(id);
      setCuidado(cuidadoData);
      
      const animaisData = await getAnimaisPorCuidado(id);
      setAnimais(animaisData);
    } catch (err) {
      setError('Falha ao carregar os detalhes do cuidado.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!cuidado) return null;

  return (
    <div className="cuidado-details-container">
      <div className="header-actions">
        <h1>Detalhes do Cuidado</h1>
        <div>
          <Link to={`/cuidados/editar/${cuidado.id}`} className="btn btn-warning">
            Editar
          </Link>
          <Link to="/cuidados" className="btn btn-secondary ml-2">
            Voltar para Lista
          </Link>
        </div>
      </div>

      <div className="details-card">
        <div className="detail-item">
          <strong>Nome:</strong>
          <span>{cuidado.nome}</span>
        </div>
        
        <div className="detail-item">
          <strong>Frequência:</strong>
          <span>{cuidado.frequencia}</span>
        </div>
        
        <div className="detail-item full-width">
          <strong>Descrição:</strong>
          <p className="description">{cuidado.descricao || 'Sem descrição disponível.'}</p>
        </div>
      </div>
      
      <div className="related-data-section">
        <h2>Animais que Recebem este Cuidado</h2>
        
        {animais.length === 0 ? (
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
                {animais.map(animal => (
                  <tr key={animal.id}>
                    <td>{animal.nome}</td>
                    <td>{animal.especie}</td>
                    <td>{animal.habitat}</td>
                    <td>
                      <Link to={`/animais/${animal.id}`} className="btn btn-sm btn-info">
                        Ver Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CuidadoDetails;