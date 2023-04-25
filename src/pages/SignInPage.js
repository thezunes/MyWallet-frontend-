import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useEffect, useState } from "react"
import axios from "axios"
 

export default function SignInPage({apiUrl, setToken, token, setTokenStorage}) {

  const [form, setForm] = useState({})
  const navigate = useNavigate()
 
  function handleChange (e) {
    setForm({...form, [e.target.name]: e.target.value})
   }

  function signin (event) {

    event.preventDefault();
    axios.post(`${apiUrl}/signin`, form)
    .then((res) => {
    navigate("/home")
    setToken(res.data)
    console.log("Login realizado com sucesso")  
  //   setInterval(() => {
  //   setToken(res.data)
  //   console.log(token); 
  //   setToken(false); 
  //   console.log(token); 
  //   localStorage.removeItem("token");  
  //   setTokenStorage(false)
  // }
  //   , 50000)  
    })
    .catch((err) => alert(err.response.data))
    
  }

  return (
    <SingInContainer>
      <form onSubmit={signin}>
        <MyWalletLogo />
         <input 
        placeholder="E-mail"
        type="email" 
        required
        value={form.email}
        name={"email"}
        onChange={handleChange}/>
       
        <input 
        placeholder="Senha" 
        type="password" 
        autocomplete="new-password" 
        required
        value={form.password}
        name={"password"}
        onChange={handleChange}/>
      
        <button>Entrar</button>
       </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
