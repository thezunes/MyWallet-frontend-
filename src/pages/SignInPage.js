import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useEffect, useState } from "react"
import axios from "axios"
 

export default function SignInPage({apiUrl, userName,  setUserName, setToken, token, setTokenStorage}) {

  const [form, setForm] = useState({})
  const navigate = useNavigate()

  useEffect(() => token && userName ? navigate("/home") : navigate("/"), [])

 
  function handleChange (e) {
    setForm({...form, [e.target.name]: e.target.value})
   }

  function signin (event) {

    event.preventDefault();
    axios.post(`${apiUrl}/signin`, form)
    .then((res) => {
      navigate("/home");
      setToken(res.data.token);
      setUserName(res.data.name);
      console.log("Login realizado com sucesso");  
      localStorage.removeItem("token");  
      localStorage.removeItem("userName");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.userName);
  
      if (token) {
        setInterval(() => {
          localStorage.removeItem("token");  
          localStorage.removeItem("userName");  
          localStorage.clear()
          setToken(undefined);
          setUserName(undefined);
          navigate("/");
          alert("Sessão Expirada, faça login novamente");
        }, 600000);
      }
    })
    .catch((err) => alert(err.response.data)); 
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