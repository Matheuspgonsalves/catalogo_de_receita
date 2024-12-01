/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './RedefinirSenha.module.css';

const RedefinirSenha = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { resetToken } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (resetToken) {
      setToken(resetToken);
    }
  }, [resetToken]);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/solicitar-recuperacao-senha', { email });
      setMessage(response.data.message);
    } catch (err) {
      setMessage('Erro ao enviar o e-mail de recuperação.');
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    setIsResetting(true);
    try {
      const response = await axios.patch(`http://localhost:5000/api/redefinir-senha/${token}`, { password: newPassword });
      setMessage('');
      setSuccessMessage('Senha alterada com sucesso!');

      // Redirecionar para a página de login após 3 segundos
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setMessage('Erro ao redefinir a senha.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className={styles.redefinirSenhaContainer}>
      <h2 className={styles.redefinirSenhaHeader}>Redefinir Senha</h2>

      {!token ? (
        <div className={styles.redefinirSenhaFormContainer}>
          <h3>Solicitar Recuperação de Senha</h3>
          <form onSubmit={handleSubmitEmail} className={styles.redefinirSenhaForm}>
            <label htmlFor="email" className={styles.redefinirSenhaLabel}>Digite seu e-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.redefinirSenhaInput}
            />
            <button type="submit" className={styles.redefinirSenhaButton}>Enviar link de recuperação</button>
          </form>
        </div>
      ) : (
        <div className={styles.redefinirSenhaFormContainer}>
          <h3>Redefinir Senha</h3>
          <form onSubmit={handleSubmitNewPassword} className={styles.redefinirSenhaForm}>
            <label htmlFor="newPassword" className={styles.redefinirSenhaLabel}>Nova Senha:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={styles.redefinirSenhaInput}
            />
            <button type="submit" className={styles.redefinirSenhaButton} disabled={isResetting}>
              {isResetting ? 'Redefinindo...' : 'Redefinir Senha'}
            </button>
          </form>
        </div>
      )}

      {successMessage && <p className={styles.redefinirSenhaMessage}>{successMessage}</p>}
      {message && <p className={styles.redefinirSenhaMessage}>{message}</p>}
    </div>
  );
};

export default RedefinirSenha;
