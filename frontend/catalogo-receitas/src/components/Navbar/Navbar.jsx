import Button from '../Button/Button';
import './Nabvar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return(
        <>
            <header className="header">
                <div id="logo">
                    <a href="/" className="logo" onClick={(e) => {e.preventDefault(); navigate('/')}}>Receitas</a>
                </div>

                <nav className="navbar">
                    <a href="/" onClick={(e) => {e.preventDefault(); navigate('/')}}>Home</a>
                    <a href="/sobre" onClick={(e) => {e.preventDefault(); navigate('/sobre')}}>Sobre</a>
                    <Button 
                        className="LoginButton"
                        text="Login"
                        onClick={() => navigate('/login')}
                    />
                    <Button 
                        className="buttonCadastro"
                        text="Cadastre-se"
                        onClick={() => navigate('/cadastro')}
                    />
                </nav>
            </header>
        </>
    )
}

export default Navbar;