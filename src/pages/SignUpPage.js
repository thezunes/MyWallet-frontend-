import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useEffect, useState } from "react"
import axios from "axios"


 
export default function SignUpPage() {
	
  const [form, setForm] = useState ({name: "",email: "",password: ""})
  const [confirmPaswword, setConfirmPassword] = useState ({password: "", password2: ""})
  const [teste, setTeste] = useState ({password: "dddd", password2: "dddd"})
  const [password, setPassword] = useState()
  const [disabledButton, setdisabledButton] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {if(form.password !== "" && form.email !== "" && form.name !== "") {setdisabledButton(false)} else {setdisabledButton(true)}}, [form.name, form.email, form.password])

  useEffect(() => {
  
  if(confirmPaswword.password === confirmPaswword.password2) {
    setPassword(true) 
  } else {
    setPassword(false)

  }}, [confirmPaswword])

  function testee(){

  
  }

  testee();

function handleChange(e){
  
  if(e.target.name !== "password2") {setForm({...form, [e.target.name]: e.target.value})}  
  setConfirmPassword({...confirmPaswword, [e.target.name]: e.target.value}) 
 
}

  function signup(event){

  event.preventDefault();

  if(password){

  axios.post(`${apiUrl}/signup`, form)
  .then(() =>  navigate("/"))
  .catch((err) => alert(err.response.data))

  } else 
  {alert("A sua senha de confirmação deve ser igual à sua senha")}

  }

  return (
    <SingUpContainer>
      <form onSubmit={signup}>
        <MyWalletLogo />
        <input 
        placeholder="Nome" 
        type="text" 
        required
        value={form.name}
        name={"name"}
        onChange={handleChange} />

        <input placeholder="E-mail" 
        type="email"
        required 
        value={form.email}
        name={"email"}
        onChange={handleChange}/>

        <input 
        placeholder="Senha" 
        type="password" 
        autocomplete="new-password" required
        value={form.password}
        name={"password"}
        onChange={handleChange}/>

        <input 
        placeholder="Confirme a senha" 
        type="password" 
        autocomplete="new-password" 
        value={form.password2}
        name={"password2"}
      
        required 
        onChange={handleChange}/>

        <button disabled={disabledButton}>Cadastrar</button> 
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
