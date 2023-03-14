import { useState } from "react";


function App() {

  //variaveis a serem utilizadas
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const [listaCategoria, setListaCategoria] = useState([]);//array




  //função para adicionar
  function adicionar(event) {
    event.preventDefault()
    if (categoria === "" || data === "" || descricao === "") {
      alert("Campos obrigatórios") //ponto extra
      return
    }
    setListaCategoria([...listaCategoria
      , {
      //criação do objeto
      id: Date.now(),
      data,
      categoria,
      descricao,
      titulo

    }])//spread
    //setar os dados
    setId("")
    setData("")
    setCategoria("")
    setDescricao("")
    setTitulo("")

  }




  //função para editar
  function editar(event) {
    event.preventDefault()

    const copiaListaCategoria = [...listaCategoria]; //spread

    const index = copiaListaCategoria.findIndex((categoria) => categoria.id === id);

    copiaListaCategoria[index].categoria = categoria;
    copiaListaCategoria[index].data = data;
    copiaListaCategoria[index].titulo = titulo;
    copiaListaCategoria[index].descricao = descricao;

    setListaCategoria(copiaListaCategoria);
    setId("")
    setData("")
    setCategoria("")
    setDescricao("")
    setTitulo("")

  }


  //função para apagar
  function apagar(id) {
    if (confirm("Deseja deletar?")) {
      const result = listaCategoria.filter((item) => item.id !== id)
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

    <div className="App">
      <h1> Filmes para assistir </h1>


      <form onSubmit={id ? editar : adicionar}>
        <input
          required
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          placeholder="Titulo" />

        {/*TARGET - para que o valor a ser editado seja localizado  */}
        <select value={categoria} onChange={(event) => setCategoria(event.target.value)} >

          <option value="" disabled>Selecione o gênero</option>
          <option value="Ação e aventura">Ação e aventura</option>
          <option value="Comédia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Ficção científica">Ficção científica</option>
          <option value="Romance">Romance</option>
          <option value="Terror">Terror</option>
        </select>
        <input requered value={data} type="date"
          placeholder="Data" onChange={(event) => setData(event.target.value)} />

        <input requered value={descricao} type="textarea"
          placeholder="Descricao" onChange={(event) => setDescricao(event.target.value)} />

        <input type="submit" value={id ? "Salvar" : "Cadastrar"} />

      </form>

      {/*retorno de dados salvos*/}
      {listaCategoria.length > 0 ?
        (
          <ul>
            {listaCategoria.map((item) =>
            (

              <li key={item.id} >
                <p >{item.titulo} </p>
                <p >{item.data} </p>
                <p >{item.categoria} </p>
                <p >{item.descricao} </p>

                <button onClick={() => apagar(item.id)}>Apagar </button>
                <button onClick={() => preencher(item)}>Editar </button>

              </li>
            ))}
          </ul>
        ) : (
          <p >Nenhuma categoria cadastrada</p>
        )}


    </div>




  )
}


export default App;