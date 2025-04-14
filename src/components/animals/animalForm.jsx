import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimal, createAnimal, updateAnimal } from '../../services/animalService';
import { getCuidados } from '../../services/cuidadoService';
import { useAppContext } from '../../context/appContext';
import Spinner from '../shared/Spinner';
import ErrorMessage from '../shared/ErrorMessage';
import AnimalCuidadoList from './animalCuidadoList';
import { validateAnimal } from '../../utils/validation';
import '../../styles/components/form.css';

const AnimalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { loading, setLoading, error, setError, showNotification } = useAppContext();

  const [animal, setAnimal] = useState({
    nome: '',
    descricao: '',
    dataNascimento: '',
    especie: '',
    habitat: '',
    paisOrigem: ''
  });

  const [cuidados, setCuidados] = useState([]);
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Carregar lista de cuidados
        const cuidadosData = await getCuidados();
        const cuidadosFormatados = cuidadosData?.$values || cuidadosData || [];
        setCuidados(cuidadosFormatados);
        

        // Se for modo de edição, carregar dados do animal
        if (isEditMode) {
          const animalData = await getAnimal(id);
          
          // Formatar a data para o formato ISO (YYYY-MM-DD)
          const formattedDate = animalData.dataNascimento ? 
            new Date(animalData.dataNascimento).toISOString().split('T')[0] : '';
          
            setAnimal({
              ...animalData,
              dataNascimento: formattedDate,
              animalCuidados: animalData.animalCuidados?.$values || []
            });
            
        }
      } catch (err) {
        setError('Falha ao carregar os dados. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditMode, setLoading, setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimal(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpa o erro específico do campo quando o usr começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateAnimal(animal);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    try {
      if (isEditMode) {
        await updateAnimal(id, animal);
        showNotification(`Animal ${animal.nome} atualizado com sucesso!`);
      } else {
        const novoAnimal = await createAnimal(animal);
        showNotification(`Animal ${animal.nome} cadastrado com sucesso!`);
        navigate(`/animais/editar/${novoAnimal.id}`);
        return;
      }
      
      navigate('/animais');
    } catch (err) {
      setError('Falha ao salvar o animal. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !animal.nome) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="animal-form-container">
      <h1>{isEditMode ? 'Editar Animal' : 'Novo Animal'}</h1>
      
      <form onSubmit={handleSubmit} className="data-form">
        <div className="form-group">
          <label htmlFor="nome">Nome*</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={animal.nome}
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
            value={animal.descricao}
            onChange={handleChange}
            rows="4"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento*</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={animal.dataNascimento}
            onChange={handleChange}
            className={errors.dataNascimento ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.dataNascimento && <div className="invalid-feedback">{errors.dataNascimento}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="especie">Espécie*</label>
          <input
            type="text"
            id="especie"
            name="especie"
            value={animal.especie}
            onChange={handleChange}
            className={errors.especie ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.especie && <div className="invalid-feedback">{errors.especie}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="habitat">Habitat*</label>
          <input
            type="text"
            id="habitat"
            name="habitat"
            value={animal.habitat}
            onChange={handleChange}
            className={errors.habitat ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.habitat && <div className="invalid-feedback">{errors.habitat}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="paisOrigem">País de Origem*</label>
          <input
            type="text"
            id="paisOrigem"
            name="paisOrigem"
            value={animal.paisOrigem}
            onChange={handleChange}
            className={errors.paisOrigem ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.paisOrigem && <div className="invalid-feedback">{errors.paisOrigem}</div>}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
          //  onClick={() => navigate('/animais')}
          >
            Cancelar
          </button>
        </div>
      </form>
      
      {isEditMode && (
        <AnimalCuidadoList 
          animalId={id} 
          animalCuidados={animal.animalCuidados || []} 
          allCuidados={cuidados} 
        />
      )}
    </div>
  );
};

export default AnimalForm;