import SVGDelete from "../../assets/icons/SVGDelete";
import SVGEdit from "../../assets/icons/SVGEdit";
import Button from "../../components/Button/Button";
import Navbar from "../../components/Navbar/Navbar";
import './Listagem.css';

const Listagem = () => {
    return (
        <>
            <Navbar isAutenticated={true}/>

            <div className="container-list">
                <div className="head">
                    <div className="title">
                        <h2>Lista de receitas</h2>
                    </div>

                    <div className="ordenar-por">
                        <select name="cars" id="cars">
                            <option>Dificuldade</option>
                            <option value="easy">Fácil</option>
                            <option value="medium">Médio</option>
                            <option value="hard">Difícil</option>
                        </select>
                    </div>
                </div>

                <div className="tabela">
                    <div className="list-box">

                        <div className="card">
                            <div className="field">Nome da receita: </div>
                            <div className="field">Tempo de preparo:</div>
                            <div className="field">Nível de dificuldade:</div>
                            <div className="field">
                                <span className="icon"><SVGEdit /></span>
                                <span className="icon"><SVGDelete /></span>
                                <span className="icon">
                                <Button 
                                    className="ViewButton"
                                    text="Visualizar"
                                />
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Listagem;