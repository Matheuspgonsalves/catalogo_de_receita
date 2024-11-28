import Navbar from "../../components/Navbar/Navbar";
import './novaReceita.css';

const NovaReceita = () => {
    return (
        <>
            <Navbar isAutenticated={true} />
            
            <div className="nova-receita-container">
                <h1>Adicionar Nova Receita</h1>
                <form className="nova-receita-form">
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
