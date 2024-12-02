import Navbar from '../../components/Navbar/Navbar';
import './Cadastro.css';
import cadImage from '../../assets/images/background/cadastro.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Cadastro = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, email, confirmEmail, password, confirmPassword } = formData;

        if (!firstName || !lastName || !email || !confirmEmail || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        if (email !== confirmEmail) {
            alert('Os emails não correspondem.');
            return;
        }
        if (password !== confirmPassword) {
            alert('As senhas não correspondem.');
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });


            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Erro no cadastro: ${errorData.message}`);
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert('Erro ao conectar ao servidor.');
        }
    };

    return (
        <div className="cad-page">
            <Navbar />
            <div className="container-cadastro">
                <div className="img-box">
                    <img src={cadImage} alt="Cadastro" />
                </div>

                <div className="content-box">
                    <div className="form-box">
                        <h2>Cadastre-se</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="container-form">
                                <div className="content-input">
                                    <div className="input-container">
                                        <div className="input-box">
                                            <span>Nome</span>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="Nome"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="input-box">
                                            <span>Email</span>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="input-box">
                                            <span>Senha</span>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Senha"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="input-container">
                                        <div className="input-box">
                                            <span>Sobrenome</span>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Sobrenome"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="input-box">
                                            <span>Confirmar email</span>
                                            <input
                                                type="email"
                                                name="confirmEmail"
                                                placeholder="Confirmar Email"
                                                value={formData.confirmEmail}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="input-box">
                                            <span>Confirmar senha</span>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Confirmar Senha"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-box submit">
                                    <input type="submit" value="Cadastrar" />
                                </div>

                                <div className="input-box">
                                    <p>
                                        Possui uma conta?{' '}
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/');
                                            }}
                                        >
                                            Faça login
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;