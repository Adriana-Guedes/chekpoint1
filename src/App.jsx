import { useState } from "react";
import styles from "./style.module.css";
import { BsTrash2 } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

function App() {
  //variaveis a serem utilizadas
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [listaCategoria, setListaCategoria] = useState([]); //array

  const validaInputForm = () => {
    let titulo = document.getElementById("titulo").value;
    let categoria = document.getElementById("categoria").value;
    let data = document.getElementById("data").value;
    let descricao = document.getElementById("descricao").value;

    if (titulo !== "" && categoria !== "" && data !== "" && descricao !== "") {
      return true;
    }

    if (titulo == "") {
      document.getElementById("warningTitulo").innerHTML =
        "Este campo é obrigatório";
    }

    if (categoria == "") {
      document.getElementById("warningCategoria").innerHTML =
        "Este campo é obrigatório";
    }

    if (data == "") {
      document.getElementById("warningData").innerHTML =
        "Este campo é obrigatório";
    }

    if (descricao == "") {
      document.getElementById("warningDescricao").innerHTML =
        "Este campo é obrigatório";
    }

    return false;
  };

  //função para adicionar
  function adicionar(event) {
    event.preventDefault();

    if (validaInputForm()) {
      setListaCategoria([
        ...listaCategoria,
        {
          //criação do objeto
          id: Date.now(),
          data,
          categoria,
          descricao,
          titulo,
        },
      ]); //spread
      //setar os dados
      setId("");
      setData("");
      setCategoria("");
      setDescricao("");
      setTitulo("");
    }
  }

  //função para editar
  function editar(event) {
    event.preventDefault();

    if (validaInputForm()) {
      const copiaListaCategoria = [...listaCategoria]; //spread

      const index = copiaListaCategoria.findIndex(
        (categoria) => categoria.id === id
      );

      copiaListaCategoria[index].categoria = categoria;
      copiaListaCategoria[index].data = data;
      copiaListaCategoria[index].titulo = titulo;
      copiaListaCategoria[index].descricao = descricao;

      setListaCategoria(copiaListaCategoria);
      setId("");
      setData("");
      setCategoria("");
      setDescricao("");
      setTitulo("");
    }
  }

  //função para apagar
  function apagar(id) {
    if (confirm("Deseja deletar?")) {
      const result = listaCategoria.filter((item) => item.id !== id);
      setListaCategoria(result);
    }
  }

  //função preencher estados
  function preencher(item) {
    setId(item.id);
    setTitulo(item.titulo);
    setCategoria(item.categoria);
    setData(item.data);
    setDescricao(item.descricao);
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.form}>
          <form onSubmit={id ? editar : adicionar}>
            <h3 className={styles.title}> Adicione filmes para assistir </h3>
            <input
              className={styles.input}
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              placeholder="Titulo"
              id="titulo"
            />
            {!titulo && (
              <span className={styles.warning} id="warningTitulo"></span>
            )}

            {/*TARGET - para que o valor a ser editado seja localizado  */}
            <select
              className={styles.input}
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
              id="categoria"
            >
              <option value="" disabled>
                Selecione o gênero
              </option>
              <option value="Ação e aventura">Ação e aventura</option>
              <option value="Comédia">Comedia</option>
              <option value="Drama">Drama</option>
              <option value="Ficção científica">Ficção científica</option>
              <option value="Romance">Romance</option>
              <option value="Terror">Terror</option>
            </select>

            {!categoria && (
              <span className={styles.warning} id="warningCategoria"></span>
            )}

            <input
              id="descricao"
              className={styles.input}
              value={descricao}
              type="textarea"
              placeholder="Descricao"
              onChange={(event) => setDescricao(event.target.value)}
            />
            {!descricao && (
              <span className={styles.warning} id="warningDescricao"></span>
            )}

            <input
              id="data"
              className={styles.input}
              value={data}
              type="date"
              placeholder="Data"
              onChange={(event) => setData(event.target.value)}
            />

            {!data && <span className={styles.warning} id="warningData"></span>}

            <input
              className={styles.submit}
              type="submit"
              value={id ? "Salvar" : "Cadastrar"}
            />
          </form>
        </div>

        <h2 className={styles.tituloPagina}>Filmes</h2>
      </div>

      {/*retorno de dados salvos*/}
      {listaCategoria.length > 0 ? (
        <ul>
          {listaCategoria.map((item) => (
            <li className={styles.card} key={item.id}>
              <p className={styles.titulo}>{item.titulo} </p>
              <p className={styles.data}>{item.data} </p>
              <p>{item.categoria} </p>
              <p>{item.descricao} </p>
              <button
                className={styles.buttonEdit}
                onClick={() => preencher(item)}
              >
                <AiOutlineEdit />{" "}
              </button>
              <button
                className={styles.buttonDelete}
                onClick={() => apagar(item.id)}
              >
                <BsTrash2 />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.vazio}>Nenhuma categoria cadastrada</p>
      )}
    </div>
  );
}

export default App;
