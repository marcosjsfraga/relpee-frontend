import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiUser, FiCalendar, FiThumbsUp, FiThumbsDown, FiMapPin } from 'react-icons/fi';
import { IoIosHeart } from 'react-icons/io';
import api from '../../services/api';
// import AddCommentsComp from '../../components/AddCommentsComp';
import HeaderComp from '../../components/HeaderComp';
import ProfileComp from '../../components/ProfileComp';
import './styles.css';
import noImg from '../../assets/smiley.png';

export default function Profile() {
    const personId = localStorage.getItem('personId');
    const [events, setEvents] = useState([]);
    // const history = useHistory();

    /**
     * Page load
     */
    function loadPage() {
        api.get(`event/list/${personId}/`, {
            headers: {
                Authorization: personId,
            }
        }).then(response => {
            setEvents(response.data);
        });
    }

    /**
     * Run when page load
     */
    useEffect(() => {
        loadPage();
    }, [personId]);  // Run when personId change
    
    /**
     * Set participation in event
     */
    async function participateHandler(id) {
        await api.post(`event/participate/${id}/${personId}/`);

        loadPage();
    }

    /**
     * Unset participation in event
     */
    async function unParticipateHandler(id) {
        await api.post(`event/unparticipate/${id}/${personId}/`);

        loadPage();
    }

    /**
     * Render HTML
     */
    return (
        <div>
            {/* Default page header */}
            <HeaderComp showSearch={true} showAddButton={true}/>
            
            <div className="wrapper-content content">
                {/* Logged user data  */}
                <ProfileComp />

                <section className="timeline">
                    <nav>
                        <h2>Ações</h2>
                    </nav>

                    <ul className="social-action">
                        
                        {events.map(event => (
                            <li key={event.id}>
                                {/* Avatar */}
                                {event.person.image_url ? <img src={event.person.image_url} className="personImage" alt="Image"/>
                                :<img src={noImg} className="personImage" alt="Image"/>}
                                
                                <div className="info">
                                    {/* - Title - */}
                                    <strong>{event.title}</strong>
                                    {/* - Creator - */}
                                    <span className="creator">Criado por {event.person.name}</span>
                                    {/* - Description - */}
                                    <p>{event.description}</p>
                                    {/* Actions */}
                                    <div className="actions">
                                        {/* - Number of Comments - */}
                                        <Link title="Comentários" to="/comments" >
                                            <FiMessageSquare size={20} color="#3498DB" className="r-margin"/>0
                                        </Link>
                                        {/* - Number of Participants - */}
                                        <span title="Participantes">
                                            <FiUser size={20} color="#3498DB" className="r-margin"/>{event.participants.length}
                                        </span>
                                        {/* - Start Date/Time - */}
                                        <span>
                                            <FiCalendar size={20} color="#3498DB" className="r-margin"/>
                                            <div title="Início">
                                                {/* <MdFlightLand size={12} color="#F5608E" /> */}
                                                {new Date(event.start_date).toLocaleDateString()} {event.start_time.toString().substring(0, 5)} 
                                            </div>
                                        </span>
                                        {/* - Start Date/Time - */}
                                        <span title="Local"><FiMapPin size={20} color="#3498DB" className="r-margin"/>{event.city}/{event.state}</span>                                        
                                        {/* Label Participate */}
                                        {event.person_participates === true ? 
                                        <span title="Estou participando"><IoIosHeart size={20} color="#d9534f" className="r-margin"/></span> 
                                        : 
                                        <span title="Estou participando"><IoIosHeart size={20} color="#ccc" className="r-margin"/></span>
                                        }
                                        {/* - Participate Button - */}
                                        <span>
                                            {event.person_participates === false ?
                                            <button onClick={() => participateHandler(event.id)} className="btn-part" title="Quero participar">
                                                <FiThumbsUp size={20} className="r-margin"/>
                                            </button>
                                            :
                                            <button onClick={() => unParticipateHandler(event.id)} className="btn-unpart" title="Cancelar participação">
                                                <FiThumbsDown size={20} className="r-margin"/>
                                            </button>
                                            }
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
