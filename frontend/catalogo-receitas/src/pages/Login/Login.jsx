import Navbar from "../../components/Navbar/Navbar";
import './Login.css';
import loginImage from '../../assets/images/background/login.svg';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const navigate = useNavigate();
    const { setUserId, setToken } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const loginData = { email, password };

        try {
            const response = await fetch(`${backendUrl}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro no login: ${errorData.message || 'Erro desconhecido'}`);
                return;
            }

            const data = await response.json();

            if (data && data.userId && data.token) {
                setUserId(data.userId);
                setToken(data.token);

                if (rememberMe) {
                    localStorage.setItem('rememberMe', true);
                }

                alert('Login bem-sucedido!');
                navigate('/');
            } else {
                alert('Dados de login inválidos.');
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert('Erro ao tentar fazer login.');
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
                        <form onSubmit={handleLogin}>
                            <div className="input-box">
                                <span>Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>

                            <div className="input-box">
                                <span>Senha</span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>

                            <div className="remember">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                    />
                                    Lembre-se
                                </label>
                                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/recuperar-senha'); }}>
                                    Esqueceu sua senha?
                                </a>
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
