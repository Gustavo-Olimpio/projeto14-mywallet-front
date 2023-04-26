import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from 'axios'
import { useState } from "react"

export default function SignInPage() {
  const url = process.env.REACT_APP_BD
  const [login, setLogin] = useState({email:"",password:""})
  const navigate = useNavigate();
  function logar(e){
    e.preventDefault();
    const promessa = axios.post(`${url}/`, login);
  
        promessa.then((res) =>{
          alert("Login efetuado");
          console.log(res.data)
          const token = `Bearer ${res.data.token}`
          localStorage.setItem("token",token)
          localStorage.setItem("nome",res.data.nome)
          
          navigate("/home");
        }); 
        promessa.catch(err => {
          alert(`Erro: ${err.response.status}, ${err.response.data}`)
        });
      }
    
  
  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input value={login.email} onChange={e => setLogin({...login,email:e.target.value})} placeholder="E-mail" type="email" />
        <input value={login.password} onChange={e => setLogin({...login,password:e.target.value})} placeholder="Senha" type="password" autocomplete="new-password" />
        <button onClick={e => logar(e)}>Entrar</button>
      </form>
      
      <Link to="/cadastro">
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
