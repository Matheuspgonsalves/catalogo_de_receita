/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./ListaReceitas.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ListaReceitas = () => {
  const [receitas, setReceitas] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDificuldade, setFilterDificuldade] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      fetchReceitas(storedUserId);
    } else {
      console.log("Usuário não autenticado.");
      navigate("/");
    }
  }, [navigate]);

  const fetchReceitas = async (userId) => {
    try {
      const response = await fetch(`${backendUrl}/api/receitas?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar receitas");
      }
      const data = await response.json();
      setReceitas(data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  };

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredReceitas.length / recipesPerPage);

  const handleDelete = async () => {
    if (deleteData) {
      try {
        const response = await fetch(`${backendUrl}/api/receita/${deleteData.id}`, {
          method: 'DELETE',
        });
        console.log("id aqui" + deleteData.id);
        if (!response.ok) {
          throw new Error("Erro ao excluir receita");
        }
        setReceitas((prevReceitas) => prevReceitas.filter((receita) => receita.id !== deleteData.id));
        setDeleteData(null);
      } catch (error) {
        console.error("Erro ao excluir receita:", error);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (editData) {
      try {
        const token = localStorage.getItem("token");  // Supondo que o token esteja armazenado no localStorage
        console.log(token);
        const response = await fetch(`${backendUrl}/api/receita/${editData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Adicionando o token no cabeçalho
          },
          body: JSON.stringify(editData),
        });

        if (!response.ok) {
          throw new Error("Erro ao editar receita");
        }

        // Atualizando as receitas com a nova receita editada
        setReceitas((prevReceitas) =>
          prevReceitas.map((receita) =>
            receita.id === editData.id ? editData : receita
          )
        );
        setEditData(null);  // Fechar o modal de edição após salvar
      } catch (error) {
        console.error("Erro ao editar receita:", error);
      }
    }
  };


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

        {receitas.length === 0 ? (
          <div className="no-recipes-message">
            <p>Você ainda não possui receitas. <Link to="/nova-receita">Registre agora</Link></p>
          </div>
        ) : (
          <div className="cards">
            {currentRecipes.map((receita) => (
              <div className="card" key={receita.id}>
                <h3>{receita.nome}</h3>
                <p>Dificuldade: {receita.dificuldade}</p>
                <p>Tempo de Preparo: {receita.tempoPreparo} minutos</p>
                <div className="card-buttons">
                  <button onClick={() => setModalData(receita)}>Ver mais</button>
                  <button onClick={() => setEditData({ ...receita })}>Editar</button>
                  <button onClick={() => setDeleteData(receita)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || currentRecipes.length === 0}
          >
            Próxima
          </button>
        </div>
      </div>

      {/* Modal de visualização */}
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalData.nome}</h2>
            <p><strong>Dificuldade:</strong> {modalData.dificuldade}</p>
            <p><strong>Tempo de Preparo:</strong> {modalData.tempoPreparo} minutos</p>
            <p><strong>Ingredientes:</strong> {modalData.ingredientes}</p>
            <p><strong>Modo de Preparo:</strong> {modalData.modoPreparo}</p>
            <button className="modal-button close" onClick={() => setModalData(null)}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal de edição */}
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
              <label>Tempo de Preparo:</label>
              <input
                type="text"
                value={editData.tempoPreparo}
                onChange={(e) => setEditData({ ...editData, tempoPreparo: e.target.value })}
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
              <button type="submit" className="modal-button save">Salvar</button>
              <button className="modal-button close" onClick={() => setEditData(null)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de exclusão */}
      {deleteData && (
        <div className="modal">
          <div className="modal-content">
            <h2>Tem certeza que deseja excluir esta receita?</h2>
            <p><strong>{deleteData.nome}</strong></p>
            <button className="modal-button confirm" onClick={handleDelete}>
              Sim
            </button>
            <button
              className="modal-button cancel"
              onClick={() => setDeleteData(null)}
            >
              Não
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaReceitas;
