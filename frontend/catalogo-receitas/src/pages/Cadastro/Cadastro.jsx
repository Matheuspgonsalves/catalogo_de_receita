import Navbar from '../../components/Navbar/Navbar';
import './Cadastro.css';
import cadImage from '../../assets/images/background/cadastro.svg';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    const navigate = useNavigate();

    return(
        <div className="cad-page">
            <Navbar />
            <div className="container-cadastro">
                <div className="img-box">
                    <img src={cadImage} alt="" />
                </div>

                <div className="content-box">
                    <div className="form-box">
                        <h2>Cadastre-se</h2>
                        <form action="">
                            <div className="container-form">
                                <div className="content-input">
                                    <div className="input-container">
                                        <div className="input-box">
                                            <span>Nome</span>
                                            <input type="text" name="name" id="name" placeholder='Nome'/>
                                        </div>

                                        <div className="input-box">
                                            <span>Email</span>
                                            <input type="email" name="email" id="email" placeholder='Email' />
                                        </div>

                                        <div className="input-box">
                                            <span>Senha</span>
                                            <input type="password" name="password" id="password" placeholder='Senha'/>
                                        </div>
                                    </div>

                                    <div className="input-container">
                                        <div className="input-box">
                                            <span>Sobrenome</span>
                                            <input type="text" name="name" id="name" placeholder='Nome'/>
                                        </div>

                                        <div className="input-box">
                                            <span>Confirmar email</span>
                                            <input type="email" name="email" id="email" placeholder='Confirmar Email' />
                                        </div>

                                        <div className="input-box">
                                            <span>Confirmar senha</span>
                                            <input type="password" name="password" id="password" placeholder='Confirmar Senha'/>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-box submit" >
                                    <input type="submit" value="Entrar" />
                                </div>

                                <div className="input-box">
                                    <p>Possui uma conta? <a href="" onClick={() => {navigate('/')}}>Faça login</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cadastro;