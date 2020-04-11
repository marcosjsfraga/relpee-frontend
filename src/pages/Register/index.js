import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoTextImg from '../../assets/logo_text.png';

export default function Register() {
    const id = 0;
    const type = "user";
    const [name, setName] = useState('');
    const [email_login, setEmailLogin] = useState('');
    const [password, setPassword] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            id,
            name,
            email_login,
            password,
            type,
            whatsapp,
            city,
            state,
        };

        try {
            const response = await api.post('person', data);
            console.log(`Seu ID de acesso ${response.data.id}`);
            
            // Enviar para pagina especifica
            history.push('/');
        } catch (error) {
            alert('Erro no cadastro: ' + error);
        }
    }
    
    return (
        
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoTextImg} alt="Relpee" height="70" />
                    <h1>Criar conta</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas.</p>

                    <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#F5608E"/> Voltar para Login
                    </Link>
                </section>
                
                <form onSubmit={handleRegister}>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" type="text" autoFocus/>
                    <input value={email_login} onChange={e => setEmailLogin(e.target.value)} placeholder="Email (Login)" type="email"/>
                    <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password"/>
                    <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp" type="text"/>
                    <div className="input-group">
                        <input value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade" type="text"/>
                        <input value={state} onChange={e => setState(e.target.value)} placeholder="UF" type="text" style={{ width: 80 }}/>
                    </div>
                    <button className="button" type="submit">Inscrever-se</button>
                </form>
            </div>
        </div>

    );
}