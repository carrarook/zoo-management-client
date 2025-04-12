// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getAnimal } from '../../services/animalService';
// import { useAppContext } from '../../context/AppContext';
// import Spinner from '../shared/Spinner';
// import ErrorMessage from '../shared/ErrorMessage';
// import { formatDate } from '../../utils/formatters';
// import '../../styles/components/animal.css';

// const AnimalDetails = () => {
//   const { id } = useParams();
//   const [animal, setAnimal] = useState(null);
//   const { loading, setLoading, error, setError } = useAppContext();

//   useEffect(() => {
//     const fetchAnimal = async () => {
//       setLoading(true);
//       try {
//         const data = await getAnimal(id);
//         setAnimal(data);
//       } catch (err) {
//         setError('Falha ao carregar os detalhes do animal.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnimal();
//   }, [id, setLoading, setError]);

//   if (loading) return <Spinner />;
//   if (error) return <ErrorMessage message={error} />;
//   if (!animal) return null;

//   return (
//     <div className="animal-details-container">
//       <div className="header-actions">
//         <h1>Detalhes do Animal</h1>
//         <div>
//           <Link to={`/animais/editar/${animal.id}`} className="btn btn-warning">
//             Editar
//           </Link>
//           <Link to="/animais" className="btn btn-secondary ml-2">
//             Voltar para Lista
//           </Link>
//         </div>
//       </div>

//       <div className="details-card">
//         <div className="detail-item">
//           <strong>Nome:</strong>
//           <span>{animal.nome}</span>
//         </div>
        
//         <div className="detail-item">
//           <strong>Espécie:</strong>
//           <span>{animal.especie}</span>
//         </div>
        
//         <div className="detail-item">
//           <strong>Data de Nascimento:</strong>
//           <span>{formatDate(animal.dataNascimento)}</span>
//         </div>
        
//         <div className="detail-item">
//           <strong>Habitat:</strong>
//           <span>{animal.habitat}</span>
//         </div>
        
//         <div className="detail-item">
//           <strong>País de Origem:</strong>
//           <span>{animal.paisOrigem}</span>
//         </div>
        
//         <div className="detail-item full-width">
//           <strong>Descrição:</strong>
//           <p className="description">{animal.descricao || 'Sem descrição disponível.'}</p>
//         </div>
//       </div>
