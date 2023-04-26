import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { Navigate, useFetcher, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function HomePage({token,userName, apiUrl, tokenStorage,setTypeOfTransaction,typeOfTransaction}) {
  const navigate = useNavigate()
   const [transactions, setTransactions] = useState([]);

  useEffect(() => renderTransactions(),[])
  
  function renderTransactions(){ 
    axios.get(`${apiUrl}/transactions`, {headers: {
      token: token
    }})
    .then(res => setTransactions(res.data))
    .catch(err => console.log(err))
  }
 
 
  function navigateToTransaction(newTypeOfTransaction) {
    navigate(`/nova-transacao/${newTypeOfTransaction}`)
  }
  
  function transaction(t) {
    setTypeOfTransaction(t)
    navigateToTransaction(t);
    console.log(setTransactions)
  }

  return (
    // tokenStorage ? (
    
   <HomeContainer>
      <Header>
        <h1>{`Olá, ${userName}`}</h1>
        <BiExit />
      </Header>

   
      <TransactionsContainer>
      {transactions.map((t) => 
        <ul>
          <ListItemContainer color={t.type}>
            <div>
              <span>{`${t.date}`}</span>
              <strong>{`${t.name}`}</strong>
            </div>
            <Value color={`${t.type}`}>{`${t.value}`}</Value>
          </ListItemContainer>
          </ul> )}

        <Total>
          <Money>Saldo:</Money>
          <Value color={"positivo"}>R$ 2880,00</Value>
        </Total>
      </TransactionsContainer>


      <ButtonsContainer>
      <button onClick={() => {transaction("entrada")}}>
      <p>Nova <br /> entrada</p>
      </button>
      <button onClick={() => {transaction("saida")}}>
      <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
    // ) : navigate("/")
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  overflow: scroll;
  color: #000000;
  margin-right: 10px;
  div span {  
    color: #c6c6c6;
    margin-right: 10px;
  }
`   

const Total = styled.div`
  display:flex;
  justify-content: flex-end;
  font-size: 16px;
  text-align: right;
  color: black;
  padding-top: 480px;
`

const Money = styled.div`
  padding-right: 5px;
`