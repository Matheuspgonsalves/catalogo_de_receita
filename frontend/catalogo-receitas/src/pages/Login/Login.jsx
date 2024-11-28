import Navbar from "../../components/Navbar/Navbar";
import './Login.css';
import loginImage from '../../assets/images/background/login.svg';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert('Login realizado com sucesso!');
                navigate('/home'); // Redirecionar para a página inicial
            } else {
                const errorData = await response.json();
                alert(`Erro no login: ${errorData.message}`);
            }
        } catch (error) {
            alert('Erro ao conectar ao servidor.');
        }
    };

    return (
        <div className="login-page">
            <Navbar />
            <div className="container-login">
                <div className="img-box">
                    <img src={loginImage} alt="Login" />
                </div>

                <div className="content-box">
                    <div className="form-box">
                        <h2>LOGIN</h2>
                        <form onSubmit={handleSubmit}>
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

                            <div className="remember">
                                <label>
                                    <input type="checkbox" name="remember" /> Lembre-se
                                </label>
                                <a href="#">Esqueceu sua senha?</a>
                            </div>

                            <div className="input-box submit">
                                <input type="submit" value="Entrar" />
                            </div>

                            <div className="input-box">
                                <p>Não tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cadastro'); }}>Cadastre-se</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
