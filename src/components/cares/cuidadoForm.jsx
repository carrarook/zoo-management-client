import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCuidado, createCuidado, updateCuidado } from '../../services/cuidadoService';
import { useAppContext } from '../../context/appContext';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import { validateCuidado } from '../../utils/validation';
import '../../styles/components/form.css';

const CuidadoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { loading, setLoading, error, setError, showNotification } = useAppContext();

  const [cuidado, setCuidado] = useState({
    nome: '',
    descricao: '',
    frequencia: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetchCuidado();
    }
  }, [id, isEditMode]);

  const fetchCuidado = async () => {
    setLoading(true);
    try {
      const data = await getCuidado(id);
      setCuidado(data);
    } catch (err) {
      setError('Falha ao carregar os dados do cuidado.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuidado(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa o erro específico do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateCuidado(cuidado);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    try {
      if (isEditMode) {
        await updateCuidado(id, cuidado);
        showNotification(`Cuidado ${cuidado.nome} atualizado com sucesso!`);
      } else {
        const novoCuidado = await createCuidado(cuidado);
        showNotification(`Cuidado ${cuidado.nome} cadastrado com sucesso!`);
        navigate(`/cuidados/editar/${novoCuidado.id}`);
        return;
      }
      
      navigate('/cuidados');
    } catch (err) {
      setError('Falha ao salvar o cuidado. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode && !cuidado.nome) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const frequenciaOptions = [
    "Diária",
    "Semanal",
    "Quinzenal",
    "Mensal",
    "Bimestral",
    "Trimestral",
    "Semestral",
    "Anual"
  ];

  return (
    <div className="cuidado-form-container">
      <h1>{isEditMode ? 'Editar Cuidado' : 'Novo Cuidado'}</h1>
      
      <form onSubmit={handleSubmit} className="data-form">
        <div className="form-group">
          <label htmlFor="nome">Nome do Cuidado*</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={cuidado.nome}
            onChange={handleChange}
            className={errors.nome ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={cuidado.descricao}
            onChange={handleChange}
            rows="4"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="frequencia">Frequência*</label>
          <select
            id="frequencia"
            name="frequencia"
            value={cuidado.frequencia}
            onChange={handleChange}
            className={errors.frequencia ? 'form-control is-invalid' : 'form-control'}
          >
            <option value="">Selecione uma frequência</option>
            {frequenciaOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.frequencia && <div className="invalid-feedback">{errors.frequencia}</div>}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/cuidados')}
          >
            Cancelar
          </button>
        </div>
      </form>
      
      {isEditMode && (
        <div className="cuidado-animals-section">
          <h2>Animais Associados</h2>
          <Link to={`/cuidados/${id}/animais`} className="btn btn-info">
            Ver Animais Associados
          </Link>
        </div>
      )}
    </div>
  );
};

export default CuidadoForm;