import { BrowserRouter, Routes, Route, Router, useNavigate } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useEffect, useState } from "react"



// import dotenv from "dotenv"

export default function App() {
 
  const [token, setToken] = useState()
  const [tokenStorage, setTokenStorage] = useState(localStorage.getItem("token")) 
  const [typeOfTransaction, setTypeOfTransaction] = useState(undefined) 


  // const apiUrl = "https://mywallet-api-kp5h.onrender.com"; // prod
  const apiUrl = "http://localhost:5000" // dev 

  useEffect(() => localStorage.setItem("token", `${token}`),[token])
 
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage apiUrl={apiUrl} setToken={setToken} token={token} setTokenStorage={setTokenStorage} />} />
          <Route path="/cadastro" element={<SignUpPage apiUrl={apiUrl} token={token} />} />
          <Route path="/home" element={<HomePage apiUrl={apiUrl} token={token} tokenStorage={tokenStorage} setTypeOfTransaction={setTypeOfTransaction} typeOfTransaction={typeOfTransaction}/>} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage apiUrl={apiUrl} token={token} typeOfTransaction={typeOfTransaction}/>} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
