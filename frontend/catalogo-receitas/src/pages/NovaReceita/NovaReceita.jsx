import { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import './NovaReceita.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const NovaReceita = () => {
    const [userId, setUserId] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    const getUserDataFromLocalStorage = () => {
        const storedUserId = localStorage.getItem('userId');
        const storedToken = localStorage.getItem('token');
        if (storedUserId && storedToken) {
            setUserId(storedUserId);
            setToken(storedToken);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
            console.error('User ID ou Token não encontrado no localStorage');
        }
    };

    useEffect(() => {
        getUserDataFromLocalStorage();
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!userId || !token) {
            alert('Você precisa estar logado para enviar uma receita.');
            return;
        }

        const formData = new FormData(event.target);
        const newRecipe = {
            nome: formData.get('nome'),
            ingredientes: formData.get('ingredientes'),
            modoPreparo: formData.get('modo-preparo'),
            tempoPreparo: formData.get('tempo-preparo'),
            dificuldade: formData.get('dificuldade'),
            userId: userId,
        };
        console.log(newRecipe.modoPreparo);
        const response = await fetch(`${backendUrl}/api/nova-receita`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newRecipe),
        });

        if (response.ok) {
            alert('Receita salva com sucesso!');
        } else {
            alert('Erro ao salvar receita.');
            console.error('Erro:', response.status, await response.text());
        }
    };

    return (
        <>
            <Navbar isAutenticated={isUserLoggedIn} />

            <div className="nova-receita-container">
                <h1>Adicionar Nova Receita</h1>
                <form className="nova-receita-form" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome da Receita:</label>
                        <input type="text" id="nome" name="nome" placeholder="Digite o nome da receita" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredientes">Ingredientes:</label>
                        <textarea
                            id="ingredientes"
                            name="ingredientes"
                            placeholder="Liste os ingredientes separados por vírgula"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="modo-preparo">Modo de Preparo:</label>
                        <textarea
                            id="modo-preparo"
                            name="modo-preparo"
                            placeholder="Descreva o modo de preparo"
                            rows="6"
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tempo-preparo">Tempo de Preparo (em minutos):</label>
                        <input type="number" id="tempo-preparo" name="tempo-preparo" placeholder="Ex.: 30" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dificuldade">Nível de Dificuldade:</label>
                        <select id="dificuldade" name="dificuldade" required>
                            <option value="">Selecione</option>
                            <option value="facil">Fácil</option>
                            <option value="medio">Médio</option>
                            <option value="dificil">Difícil</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">Salvar Receita</button>
                </form>
            </div>
        </>
    );
};

export default NovaReceita;
