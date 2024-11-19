import Navbar from "../../components/Navbar/Navbar";
import './Login.css'
import loginImage from '../../assets/images/background/login.svg'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();


    return(
        <div className="login-page">
            <Navbar />
            <div className="container-login">
                <div className="img-box">
                    <img src={loginImage} alt="imagem" />
                </div>

                <div className="content-box">
                    <div className="form-box">
                        <h2>LOGIN</h2>
                        <form action="">
                            <div className="input-box">
                                <span>Email</span>
                                <input type="email" name="email" id="email" placeholder="Email" />
                            </div>

                            <div className="input-box">
                                <span>Senha</span>
                                <input type="senha" name="senha" id="senha" placeholder="Senha" />
                            </div>

                            <div className="remember">
                                <label>
                                    <input type="checkbox" name="remember" id="remember" /> Lembre-se
                                </label>
                                <a href="">Esqueceu sua senha?</a>
                            </div>

                            <div className="input-box submit" >
                                <input type="submit" value="Entrar" />
                            </div>

                            <div className="input-box">
                                <p>Não tem uma conta? <a href="" onClick={() => {navigate('/cadastro')}}>Cadastre-se</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;