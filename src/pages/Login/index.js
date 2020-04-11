import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaUserPlus, FaExclamationCircle } from 'react-icons/fa';
import api from '../../services/api';
import './styles.css';
import logoTextImg from '../../assets/logo_text.png';
import logingImg from '../../assets/login.png'

export default function Login() {
    const [email_login, setEmailLogin] = useState('');
    const [password, setPassword] = useState('');
    const [respMessage, setRespMessage] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session/validate', { email_login, password });

            localStorage.setItem('personId', response.data.personId);
            localStorage.setItem('personName', response.data.personName);
            localStorage.setItem('imageUrl', response.data.imageUrl);
            localStorage.setItem('personAddress', response.data.personAddress);
            
            // Send to specific page
            history.push('/main');

        } catch (error) {
            // alert('Falha no login');
            setRespMessage('Email ou senha inválida.');
        }
    }

    return (

        <div className="login-container">
            <div className="content">
                <section className="form">
                    <img src={logoTextImg} alt="Relpee" height="70"/>

                    <h1>Informe seus dados</h1>
                    
                    <form onSubmit={handleLogin}>
                        
                        <input value={email_login} onChange={e => setEmailLogin(e.target.value)} placeholder="Email" type="email" autoFocus/>
                        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password"/>
                        
                        {respMessage !== '' ? <p className="response-msg"><FaExclamationCircle size={12} /> {respMessage}</p> : null}
                        
                        <button className="button" type="submit">Entrar</button>
                        
                        <Link className="back-link btn-back-link" to="/register">
                            <FaUserPlus size={12} color="#F5608E" />
                            Não tenho uma conta
                        </Link>
                    </form>

                </section>
                {/* Right image */}
                <img src={logingImg} alt="Login" height="250" className="img-rigth" />
            </div>
        </div>

    );

}
