import React from 'react';
import { FiPower } from 'react-icons/fi';
import { FaRegEdit  } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import './styles.css';
import noImg from '../../assets/smiley.png';

export default function ProfileComp() {
    // Declare variables
    const personName = localStorage.getItem('personName');
    const imageUrl = localStorage.getItem('imageUrl');
    const history = useHistory();
    
    /**
     * Send to Profile page
     */
    function editProfileHandler(e) {
        history.push('/profile');
    }

    /**
     * Execute Logout
     */
    function logoutHandler() {
        localStorage.clear();

        history.push('/');
    }

    /**
     * Render HTML
     */
    return (
        <aside className="profile">
            {/* Person image */}
            {imageUrl !== 'null' ? <img src={imageUrl} alt="avatar" className="avatar"/>
            :<img src={noImg} alt="avatar" className="avatar"/>}

            <h1>
                {personName} 
            </h1>
            
            <button title="Editar perfil" onClick={editProfileHandler} type="button"><FaRegEdit size={20} color="#3399FF"/></button>
            <button title="Sair" onClick={logoutHandler} type="button"><FiPower size={20} color="#E02041"/></button>

            <ul className="info">
                {/* <li><FiMapPin size={14} className="r-margin" />{endereco}</li> */}
                {/* <li><img src={joinedImg} alt="Place" className="alt"/>{joined}</li> */}
            </ul> 
        </aside>
    );
}
