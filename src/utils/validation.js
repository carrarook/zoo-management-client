export const validateAnimal = (animal) => {
    const errors = {};
    
    if (!animal.nome || animal.nome.trim() === '') {
      errors.nome = 'O nome do animal é obrigatório.';
    }
    
    if (!animal.dataNascimento) {
      errors.dataNascimento = 'A data de nascimento é obrigatória.';
    }
    
    if (!animal.especie || animal.especie.trim() === '') {
      errors.especie = 'A espécie é obrigatória.';
    }
    
    if (!animal.habitat || animal.habitat.trim() === '') {
      errors.habitat = 'O habitat é obrigatório.';
    }
    
    if (!animal.paisOrigem || animal.paisOrigem.trim() === '') {
      errors.paisOrigem = 'O país de origem é obrigatório.';
    }
    
    return errors;
  };
  
  export const validateCuidado = (cuidado) => {
    const errors = {};
    
    if (!cuidado.nome || cuidado.nome.trim() === '') {
      errors.nome = 'O nome do cuidado é obrigatório.';
    }
    
    if (!cuidado.frequencia || cuidado.frequencia.trim() === '') {
      errors.frequencia = 'A frequência é obrigatória.';
    }
    
    return errors;
  };