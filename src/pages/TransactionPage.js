import { useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function TransactionsPage({typeOfTransaction, token, apiUrl}) {

  const path=window.location.pathname;
  const parts = path.split('/');  
  const tipo = parts[2];
  const navigate = useNavigate()

  const [formTransaction, setFormTransaction] = useState({type:`${tipo}`})
  

   function handleChange (e) {
    setFormTransaction({...formTransaction, [e.target.name]: e.target.value})
   }
  
  function newTransaction(event){
    event.preventDefault();
    save();
  }

  function save() {

  console.log(token)

    const config={
      headers:{
          Authorization:`Bearer ${token}`
      }  }

    axios.post(`${apiUrl}/transaction`, formTransaction, config)
    .then(() =>  {console.log("Transação efetuada com sucesso"); navigate("/home");} )
    .catch((err) => console.log(err.response.data))
    }
 
   return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={newTransaction}>
        <input 
        name={"value"} 
        required
        value={formTransaction.value}
        onChange={handleChange}
        placeholder="Valor"
        type="text"/>

        <input 
        name={"name"} 
        required
        value={formTransaction.name}
        onChange={handleChange}
        placeholder="Descrição" type="text" />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
