import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'; //Usado para não recarregar a página, conceito de SPA
import api from '../../services/api';


import './styles.scss';
import logo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function hanbleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('/session', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');

        }
        catch(err){
            alert('Falha no login, tente novamente.')
            console.log(err);
        }
        
    }

    return(
        <div className="logon-container">
            <section id="form">
                <img src={logo} alt="logo"/>
                <form onSubmit={hanbleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder="Sua ID"
                    />
                    <button type="submit" className="button">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}