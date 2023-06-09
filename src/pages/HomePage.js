import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useState , useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from "react-router-dom"


export default function HomePage() {
  const [info, setInfo] = useState([])
  const url = process.env.REACT_APP_BD
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (!localStorage.getItem("token")){
      navigate("/");
      
    }
    
		const requisicao = axios.get(`${url}/home`,{headers:{"Authorization":localStorage.getItem("token")}});

		requisicao.then(resposta => {
      setInfo(resposta.data)
      
      
		});
	}, []);
  
  function deslogar(){
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    navigate("/");
  }
  
  function saldo(){
   let positivo = 0
   let negativo = 0
    for(let i = 0; i<info.length;i++){
      if(info[i].tipo === "entrada"){
        positivo+=Number(info[i].valor)
      } else {
        negativo+=Number(info[i].valor)
      }
    }
    
    return (positivo-negativo).toFixed(2)
  }
  
  return (
    <HomeContainer>
      <Header>
        <h1>Ola, {localStorage.getItem("nome")}</h1>
        <BiExit onClick={deslogar} />
      </Header>

      <TransactionsContainer>
        <ul>

          {(info.length === 0)? <p>Não há registros de <br />
        entrada ou saída</p>: info.map((a) => <ListItemContainer key={a._id}>
         <div>
              <span>{a.data}</span>
              <strong>{a.descricao}</strong>
            </div>
            <Value color={(a.tipo === "entrada")? "positivo" : "negativo"}>{Number(a.valor).toFixed(2)}</Value>
         </ListItemContainer>)}

         
        </ul>
        {(info.length === 0)? <p></p>:
        <article>
          <strong>Saldo</strong>
          <Value color={(saldo()>= 0)? "positivo" : "negativo"}>{saldo()}</Value>
        </article>
        }
      </TransactionsContainer>


      <ButtonsContainer>
      
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          
        </button>
        
        <button onClick={() => navigate("/nova-transacao/saida")}>
         
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
            
        </button>
       
      </ButtonsContainer>

    </HomeContainer>
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
  justify-content: space-between;
  overflow-y: scroll;
  p{
  color: #868686;
  text-align: center;
  font-size: 20px;
  margin-top: 55%;
  }
  article {
    height:22px;
    width: 76vw;
    background-color: #fff;
    z-index: 1;
    position: fixed;
    bottom: 155px;
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
      
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
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
