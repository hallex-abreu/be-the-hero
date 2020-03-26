import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi'; 
import './styles.scss';
import { Link, useHistory } from 'react-router-dom'; //Usado para não recarregar a página, conceito de SPA
import logo from '../../assets/logo.svg';
import api from '../../services/api';


export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    
    async function handleNewIncidents(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try{
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile'); 
        }
        catch(err){
            alert('Erro ao cadastra caso, tente novamente');
            console.log(err)
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section id="register">
                    <img src={logo} alt="logo"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para a Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncidents}>
                    <input 
                        value={title}
                        onChange={e=> setTitle(e.target.value)}
                        placeholder="Título do caso"
                    />
                    <textarea 
                        value={description}
                        onChange={e=> setDescription(e.target.value)}
                        placeholder="Descrição"
                    />
                
                    <input 
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                        placeholder="Valor em reais"
                    />
                
                 
                   <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}