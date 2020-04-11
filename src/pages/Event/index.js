import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import InputMask from "react-input-mask"; // https://github.com/sanniassin/react-input-mask

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import HeaderComp from '../../components/HeaderComp';
import './styles.css';
import helpingImg from '../../assets/helping.png'

export default function Event() {
    const personId = localStorage.getItem('personId');
    const id = 0;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
	const [start_date, setStartDate] = useState('');
	const [start_time, setStartTime] = useState('');
	const [end_date, setEndDate] = useState('');
	const [end_time, setEndTime] = useState('');
    const [street, setStreet] = useState('');
	const [street_number, setStreetNumber] = useState('');
	const [street_complement, setStreetComplement] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
	const [city, setCity] = useState('');
    const [state, setState] = useState('');
    
    // registerLocale('ptBR', ptBR)
    
    const history = useHistory();

    /**
     * Event Insert
     */
    async function eventInsertHandler(e) {
        e.preventDefault();

        const data = {
            id,
            title,
            description,
            start_date,
            start_time,
            end_date,
            end_time,
            street,
            street_number,
            street_complement,
            neighborhood,
            city,
            state,
            person_id: personId
        };

        try {
            const response = await api.post('event', data);
            console.log(`O ID do evento é ${response.data.id}`);
            
            // Enviar para pagina especifica
            history.push('/main');
        } catch (error) {
            alert('Erro no cadastro: ' + error);
        }
    }

    /**
     * Render HTML
     */
    return(

        <div>
            {/* Default page header */}
            <HeaderComp showSearch={false} showAddButton={false}/>
        
            <div className="event-container">
                <div className="content">
                    <section>
                        <h1>Criar ação</h1>
                        <img src={helpingImg} alt="Relpee" height="250" />

                        <Link className="back-link link-voltar" to="/main" >
                            <FiArrowLeft size={16} color="#F5608E"/> Voltar
                        </Link>
                    </section>
                    
                    <form onSubmit={eventInsertHandler}>
                        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" type="text" autoFocus/>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"></textarea>
                        <div className="input-group">
                            <InputMask value={start_date} onChange={e => setStartDate(e.target.value)} placeholder="Data Início" mask="99/99/9999" />
                            <InputMask value={start_time} onChange={e => setStartTime(e.target.value)} placeholder="Hora" mask="99:99" style={{ width: 110 }}/>
                            <InputMask value={end_date} onChange={e => setEndDate(e.target.value)} placeholder="Data Fim" mask="99/99/9999" />
                            <InputMask value={end_time} onChange={e => setEndTime(e.target.value)} placeholder="Hora" mask="99:99" style={{ width: 110 }}/>
                        </div>
                        <div className="input-group">
                            <input value={street} onChange={e => setStreet(e.target.value)} placeholder="Rua" type="text"/>
                            <input value={street_number} onChange={e => setStreetNumber(e.target.value)}  placeholder="Nº" type="text" style={{ width: 110 }}/>
                            <input value={street_complement} onChange={e => setStreetComplement(e.target.value)} placeholder="Compl." type="text" style={{ width: 110 }}/>
                        </div>
                        <input value={neighborhood} onChange={e => setNeighborhood(e.target.value)} placeholder="Bairro" type="text"/>
                        <div className="input-group">
                            <input value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade" type="text"/>
                            <input value={state} onChange={e => setState(e.target.value)} placeholder="UF" type="text" style={{ width: 80 }}/>
                        </div>
                        
                        <button className="button" type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </div>

    );
}
