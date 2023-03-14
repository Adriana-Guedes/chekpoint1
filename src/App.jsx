import { useState } from "react";


function App (){

  //variaveis a serem utilizadas
  const [id,setId] = useState ("");
  const [titulo,setTitulo] = useState ("");
  const [categoria,setCategoria] = useState ("");
  const [data,setData] = useState ("");
  const [descricao,setDescricao] = useState ("");
  const [listaCategoria,setListaCategoria] = useState ([]);//array




  //função para adicionar
  function adicionar (event){
    event.preventDefault( )
    if(categoria === "" || data === "" || descricao === ""){
      alert("Campos obrigatorio") //ponto extra
      return 
    } 
    setListaCategoria([...listaCategoria
    ,{
      //criação do objeto
      id:Date.now(),
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
   function editar (event){
    event.preventDefault( )
    const copiaListaCategoria = [...listaCategoria]; //spread
    const index = copiaListaCategoria.findIndex((categoria)=> categoria.id === id);
    copiaListaCategoria[index].categoria = categoria;

    copiaListaCategoria[index].data = data;
    copiaListaCategoria[index].titulo = titulo;
    copiaListaCategoria[index].descricao = descricao;
     
   }

   
    //função para apagar
  function apagar (event){
    if(confirm("Deseja deletar?")){
      const result = listaCategoria.filter((item)=> item.id !== id )
      setListaCategoria(result);
    }
    
    
  }


 //função preencher estados
 function preencher (event){
  setCategoria(item.categoria);
  setId(item.id);
  setData(item.data);
  setTitulo(item.titulo);
  setDescricao(item.descricao);

    
 }



return (

<div>
  <h1> CADASTRAR </h1>
  <form>
    <input requered value={titulo} type="text" 
    placeholder="Titulo" onChange={(event)=> setTitulo(event.target.value) }/>

   {/*TARGET - para que o valor a ser editado seja localizado  */}
    <select value={categoria} onChange={(event)=> setCategoria(event.target.value)} >

          <option value="" disabled>Selecione uma categoria</option> 
          <option value="romance">Romance</option> 
          <option value="acao">Ação </option> 
          <option value="comedia">Comedia</option> 
          <option value="terror">Terror</option> 
    </select>
    <input requered value={data} type="date" 
    placeholder="Data" onChange={(event)=> setData(event.target.value) }/>

    <input requered value={descricao} type="text" 
    placeholder="Descricao" onChange={(event)=> setDescricao(event.target.value) }/>
   <input type="submit" value= {id ? "Salvar":"Cadastrar" }/>

  </form>

  {/*retorno de dados salvos*/}
  {listaCategoria.length > 0 ?
  (
    <ul>
      { listaCategoria.map((item)=> 
      (

      <li key={item.id} > 
      <p >{item.titulo} </p> 
      <p >{item.data} </p> 
      <p >{item.categoria} </p> 
      <p >{item.descricao} </p> 
      <button onClick={()=> apagar(item.id)}>Apagar </button>
      <button onClick={()=> preencher(item.id)}>Editar </button>
      </li>

      ))}
    </ul>
  ):(
    <p >Nenhuma categoria cadastrada</p> 
  )
  }

  
</div>




)}


export default App;