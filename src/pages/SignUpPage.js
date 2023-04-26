import { Link , useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from 'axios'


export default function SignUpPage() {
  const navigate = useNavigate();
  const [cadastro, setCadastro] = useState({name:"",email:"",password:""})
  const [confirm,setConfirm] = useState()

  function cadastrar(e){
    const url = process.env.REACT_APP_API
    e.preventDefault();
    if (cadastro.password !== confirm){
      alert("Senha incorreta, tente novamente")
    } else {
      const promessa = axios.post(`${url}/cadastro`, cadastro);

      promessa.then(() =>{
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      }); 
      promessa.catch(err => {
        alert(`Erro: ${err.response.status}, ${err.response.data}`)
      });
    }
  }
  return (
    <SingUpContainer>
      <form>
        <MyWalletLogo />
        <input value={cadastro.nome} onChange={e => setCadastro({...cadastro,name:e.target.value})} placeholder="Nome" type="text" />
        <input value={cadastro.email} onChange={e => setCadastro({...cadastro,email:e.target.value})}placeholder="E-mail" type="email" />
        <input value={cadastro.password} onChange={e => setCadastro({...cadastro,password:e.target.value})}placeholder="Senha" type="password" autocomplete="new-password" />
        <input value={confirm} onChange={e => setConfirm(e.target.value)}placeholder="Confirme a senha" type="password" autocomplete="new-password" />
        <button onClick={e => cadastrar(e)} >Cadastrar</button>
      </form>
       
      <Link to="/"> 
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
