import styled from "styled-components"
import axios from 'axios'
import { useState , useEffect} from "react"
import { useParams ,  useNavigate  } from 'react-router-dom';


export default function TransactionsPage() {
  const [transacao, setTransacao] = useState({valor:"",descricao:""})
  const params = useParams();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!localStorage.getItem("token")){
      navigate("/");
      
    }
  }, []);
  
  function listar(e){
    e.preventDefault();
    const promessa = axios.post(`http://localhost:5000/nova-transacao/${params.tipo}`, transacao, {headers:{"Authorization":localStorage.getItem("token")}});

      promessa.then(() =>{
        alert("Item cadastrado com sucesso");
        navigate("/home");
      }); 
      promessa.catch(err => {
        alert(`Erro: ${err.response.status}, ${err.response.data}`)
      });
  }
  
  return (
    <TransactionsContainer>
      
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input value={transacao.valor} onChange={e => setTransacao({...transacao,valor:e.target.value})} placeholder="Valor" type="text"/>
        <input value={transacao.descricao} onChange={e => setTransacao({...transacao,descricao:e.target.value})} placeholder="Descrição" type="text" />
        <button onClick={e => listar(e)} >Salvar TRANSAÇÃO</button>
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
