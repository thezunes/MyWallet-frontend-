import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import dotenv from "dotenv"

export default function App() {


  const apiUrl = process.env.API_URL;
  dotenv.config()


  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage apiUrl={apiUrl} />} />
          <Route path="/cadastro" element={<SignUpPage apiUrl={apiUrl}/>} />
          <Route path="/home" element={<HomePage apiUrl={apiUrl}/>} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage apiUrl={apiUrl}/>} />
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
