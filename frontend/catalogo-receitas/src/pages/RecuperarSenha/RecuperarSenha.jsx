/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecuperarSenha.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecuperarSenha = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMensagem('Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/solicitar-recuperacao-senha`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem('Um link para redefinir sua senha foi enviado para seu e-mail.');

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMensagem(data.message || 'Erro ao enviar e-mail de recuperação.');
      }
    } catch (error) {
      setMensagem('Erro ao tentar recuperar a senha.');
    }
    setLoading(false);
  };

  return (
    <div className="recuperar-senha-page">
      <h2>Recuperar Senha</h2>
      <form className='recuperar-senha-form' onSubmit={handleRecuperarSenha}>
        <div className="recuperar-senha-input-box">
          <span>Email</span>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="recuperar-senha-input-box submit">
          <input type="submit" value={loading ? 'Enviando...' : 'Enviar link de recuperação'} disabled={loading} />
        </div>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}

      <p>
        <a className="voltar-login" href="#" onClick={() => navigate('/')}>&lt; Voltar ao Login</a>
      </p>
    </div>
  );
};

export default RecuperarSenha;
