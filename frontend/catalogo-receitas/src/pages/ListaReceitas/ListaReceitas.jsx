import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./listaReceitas.css";

const receitasMock = [
    { id: 1, nome: "Bolo de Chocolate", dificuldade: "facil", tempo: "45 min", ingredientes: "Farinha, Ovos, Chocolate", preparo: "Misture tudo e asse." },
    { id: 2, nome: "Lasanha à Bolonhesa", dificuldade: "medio", tempo: "1h 20 min", ingredientes: "Massa, Molho, Carne", preparo: "Monte as camadas e asse." },
    { id: 3, nome: "Macaron Francês", dificuldade: "dificil", tempo: "2h", ingredientes: "Farinha de amêndoas, Açúcar, Claras de ovo", preparo: "Misture, molde e asse." },
    { id: 4, nome: "Bolo de Cenoura", dificuldade: "facil", tempo: "50 min", ingredientes: "Cenoura, Farinha, Ovos", preparo: "Misture e asse." },
    { id: 5, nome: "Pizza de Margherita", dificuldade: "medio", tempo: "1h", ingredientes: "Massa, Tomate, Queijo", preparo: "Monte a pizza e asse." },
    { id: 6, nome: "Feijoada", dificuldade: "dificil", tempo: "4h", ingredientes: "Feijão, Carne de porco, Arroz", preparo: "Cozinhe tudo junto." },
];

const ListaReceitas = () => {
    const [receitas, setReceitas] = useState(receitasMock);
    const [modalData, setModalData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterDificuldade, setFilterDificuldade] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(3);

    const filteredReceitas = receitas.filter((receita) => {
        const matchesSearch =
            receita.nome.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
            !filterDificuldade || receita.dificuldade === filterDificuldade;
        return matchesSearch && matchesFilter;
    });

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredReceitas.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const handleSaveEdit = () => {
        setReceitas((prevReceitas) =>
            prevReceitas.map((receita) =>
                receita.id === editData.id ? editData : receita
            )
        );
        setEditData(null);
    };

    const handleDelete = () => {
        setReceitas((prevReceitas) =>
            prevReceitas.filter((receita) => receita.id !== deleteData.id)
        );
        setDeleteData(null);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredReceitas.length / recipesPerPage);

    return (
        <div>
            <Navbar isAutenticated={true} />
            <div className="lista-receitas">
                <h1>Lista de Receitas</h1>
                <input
                    type="text"
                    placeholder="Pesquisar por receita"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
                <select
                    value={filterDificuldade}
                    onChange={(e) => setFilterDificuldade(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Todos</option>
                    <option value="facil">Fácil</option>
                    <option value="medio">Médio</option>
                    <option value="dificil">Difícil</option>
                </select>
                <div className="cards">
                    {currentRecipes.map((receita) => (
                        <div className="card" key={receita.id}>
                            <h3>{receita.nome}</h3>
                            <p>Dificuldade: {receita.dificuldade}</p>
                            <p>Tempo: {receita.tempo}</p>
                            <div className="card-buttons">
                                <button onClick={() => setModalData(receita)}>
                                    Ver mais
                                </button>
                                <button onClick={() => setEditData({ ...receita })}>
                                    Editar
                                </button>
                                <button onClick={() => setDeleteData(receita)}>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span>{currentPage}</span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Próxima
                    </button>
                </div>
            </div>
            {modalData && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{modalData.nome}</h2>
                        <p><strong>Dificuldade:</strong> {modalData.dificuldade}</p>
                        <p><strong>Tempo:</strong> {modalData.tempo}</p>
                        <p><strong>Ingredientes:</strong> {modalData.ingredientes}</p>
                        <p><strong>Modo de Preparo:</strong> {modalData.preparo}</p>
                        <button onClick={() => setModalData(null)}>Fechar</button>
                    </div>
                </div>
            )}
            {editData && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Receita</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveEdit();
                            }}
                        >
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={editData.nome}
                                onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                            />
                            <label>Dificuldade:</label>
                            <select
                                value={editData.dificuldade}
                                onChange={(e) =>
                                    setEditData({ ...editData, dificuldade: e.target.value })
                                }
                            >
                                <option value="facil">Fácil</option>
                                <option value="medio">Médio</option>
                                <option value="dificil">Difícil</option>
                            </select>
                            <label>Tempo:</label>
                            <input
                                type="text"
                                value={editData.tempo}
                                onChange={(e) => setEditData({ ...editData, tempo: e.target.value })}
                            />
                            <label>Ingredientes:</label>
                            <textarea
                                value={editData.ingredientes}
                                onChange={(e) =>
                                    setEditData({ ...editData, ingredientes: e.target.value })
                                }
                            />
                            <label>Modo de Preparo:</label>
                            <textarea
                                value={editData.preparo}
                                onChange={(e) =>
                                    setEditData({ ...editData, preparo: e.target.value })
                                }
                            />
                            <div className="modal-buttons">
                                <button type="submit">Salvar</button>
                                <button onClick={() => setEditData(null)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deleteData && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirmar Exclusão</h2>
                        <p>Tem certeza de que deseja excluir &quot;{deleteData.nome}&quot;?</p>
                        <div className="modal-buttons">
                            <button onClick={handleDelete}>Sim</button>
                            <button onClick={() => setDeleteData(null)}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaReceitas;
