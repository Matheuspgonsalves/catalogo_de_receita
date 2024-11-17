import Button from '../Button/Button';
import './Nabvar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return(
        <>
            <header className="header">
                <div id="logo" onClick={() => navigate('/')}>
                    <a href="/" className="logo" onClick={(e) => {e.preventDefault(); navigate('/')}}>Receitas</a>
                </div>

                <nav className="navbar">
                    <Button 
                        className="LoginButton"
                        text="Login"
                        onClick={() => navigate('/')}
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