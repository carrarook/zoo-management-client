import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/authServices';
import '../../styles/components/auth.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.nome || !formData.email || !formData.senha) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    if (formData.senha !== formData.confirmSenha) {
      setError('As senhas não coincidem');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Chama o serviço de registro
      await AuthService.register(formData.nome, formData.email, formData.senha);
      
      // Redireciona para o login após registro bem-sucedido
      navigate('/login', { state: { message: 'Cadastro realizado com sucesso! Faça login para continuar.' } });
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Erro ao realizar o cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Registro</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu email"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmSenha"
            name="confirmSenha"
            value={formData.confirmSenha}
            onChange={handleChange}
            placeholder="Confirme sua senha"
            required
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="auth-button"
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Registrar'}
        </button>
      </form>
      
      <div className="auth-links">
        <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
      </div>
    </div>
  );
};

export default SignupForm;