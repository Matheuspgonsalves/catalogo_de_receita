import Button from '../Button/Button';
import './Nabvar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const isAuthenticated = !!token;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div id="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <a href="/" className="logo" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Receitas</a>
            </div>

            <nav className="navbar">
                {isAuthenticated ? (
                    <>
                        <Button
                            className="RegisterButton"
                            text="Registrar receita"
                            onClick={() => navigate('/nova-receita')}
                        />
                        <Button
                            className="ListButton"
                            text="Listar receitas"
                            onClick={() => navigate('/lista-receitas')}
                        />
                        <Button
                            className="LogoutButton"
                            text="Logout"
                            onClick={handleLogout}
                        />
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
