import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo_text.png';

export default function HeaderComp(props) {
    const history = useHistory();
    
    /**
     * Send to Event page
     */
    function createActionHandler(e) {
        history.push('/event');
    }
    
    /**
     * Render HTML
     */
    return (
        
        <header className="main-header">
            
            <div className="content">
                {/* Logo Image */}
                <div>
                    <a href="/main">
                        <img src={logoImg} alt="logotipo" className="logo" height="40"/>
                    </a>
                </div>
                {/* Serach Input */}
                <div className="item">
                    {props.showSearch ? <input type="text" placeholder="Procurar em ações"/> : null}
                </div>
                {/* Add Event Button */}
                <div className="item">
                    {props.showAddButton ? 
                    <button onClick={createActionHandler}>
                        <FiPlus className="btn-icon"/> Criar Ação
                    </button>
                    : null}
                </div>
            </div>

        </header>

    );
}
