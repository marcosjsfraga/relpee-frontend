import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import api from '../../services/api';

import HeaderComp from '../../components/HeaderComp';
import './styles.css';
import noImg from '../../assets/smiley.png';

export default function Profile() {
    // Declare variables
    const personId = localStorage.getItem('personId');
    const imageUrl = localStorage.getItem('imageUrl');
    const [id, setId] = useState(0);
    const type = "user";
    const [name, setName] = useState('');
    const [email_login, setEmailLogin] = useState('');
    const [password, setPassword] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const history = useHistory();
    let personImg = null;

    /**
     * Run when page load
     */
    useEffect(() => {
        // Get person data from server
        api.get(`person/${personId}`).then(response => {
            // Ger person data from response
            var profile = response.data;
            // Set useState person info
            setId(profile.id);
            setName(profile.name);
            setEmailLogin(profile.email_login);
            setPassword(profile.password);
            setWhatsapp(profile.whatsapp);
            setCity(profile.city);
            setState(profile.state);
        });
    }, [ personId ]);  // Run when personId change
    
    /**
     * Update profile data
     */
    async function profileUpdateHandler(e) {
        // Prevent form submit
        e.preventDefault();
        // Set JSON data
        const data = {
            id, name, email_login, password, type, whatsapp, city, state,
        };

        try {
            // Send data to server
            await api.post('person', data);
            // Push to Main page
            history.push('/main');
        } catch (error) {
            alert('Error Profile().profileUpdateHandler: ' + error);
        }
    }

    /**
     * Senda image to server
     */
    async function fileChangedHandler(e) {
        // Prevent form submit
        e.preventDefault();
        // Set a variable with file data
        const personImage = e.target.files[0];
        // Send as FormData
        const formData = new FormData()
        formData.append('personImage', personImage);
        // Send file to the server
        await api.post(`person/imageupload/${personId}`, formData);        
    }

    /**
     * Render HTML
     */
    return(

        <div>
            {/* Default page header */}
            <HeaderComp showSearch={false} showAddButton={false}/>
        
            <div className="profile-container">
                <div className="content">
                    <section>
                        <h1>Editar perfil</h1>
                        {/* Person image */}
                        {imageUrl !== 'null' ? <img src={imageUrl} alt="avatar" className="avatar" height="150"/>
                        :<img src={noImg} alt="avatar" className="avatar" height="150"/>}
                        
                        <span>
                            {/* https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/ */}
                            <input type="file" name="personImage" id="personImage" onChange={fileChangedHandler} accept="image/*" className="inputfile" />
                            <label htmlFor="personImage"><FiUpload size={20} color="#F5608E"/> Clique para enviar sua foto</label>
                        </span>

                        <Link className="back-link link-voltar" to="/main" >
                            <FiArrowLeft size={16} color="#F5608E"/> Voltar
                        </Link>
                    </section>
                    
                    <form onSubmit={profileUpdateHandler}>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" type="text" autoFocus/>
                        <input defaultValue={email_login} onChange={e => setEmailLogin(e.target.value)} placeholder="Email (Login)" type="email"/>
                        <input defaultValue={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp" type="text"/>
                        <div className="input-group">
                            <input defaultValue={city} onChange={e => setCity(e.target.value)} placeholder="Cidade" type="text"/>
                            <input defaultValue={state} onChange={e => setState(e.target.value)} placeholder="UF" type="text" style={{ width: 80 }}/>
                        </div>
                        <button className="button" type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </div>

    );
}
