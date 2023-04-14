import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, useState, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ReadAllUsers = () => {
    const [usersList, setUsersList] = useState([]);
    const defaultPP = 'default.png';
    
    
    useEffect(() => {
        if (usersList.length === 0) {
            axios.get(`${BASE_URL}/readUsers`)
                .then(res => {
                    setUsersList(res.data.allUsers);
                })
                .catch(err => console.log(err));
        }
    }, [usersList]);

    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUser`, { id })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const [banDate, setBanDate] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBanDate({ ...banDate, [name]: value });
        console.log(banDate)
    };

    const banUser = (e, id) => {
        e.preventDefault();
        axios
            .post(`${BASE_URL}/ban`, {
                id: id,
                ban_date: banDate.ban_date
            })
            .then(res => {
                console.log(res);
            });
    };

    return (
        <div className="user__container">
            { usersList.length === 0 && (<p>loading</p>) }
            { usersList.map((user, i) => {
                return(
                    <div key={i} className='user'>
                        <div className="user__detail">
                            <div className="user__name">
                                <p><NavLink className="button button--link" to={`/user/${user.id}`}>{user.first_name} {user.last_name}</NavLink></p>
                                <button className='button--delete' onClick={() => deleteUser(user.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                            <form onSubmit={(e) => banUser(e, user.id)} className="user__ban">
                                <label htmlFor="ban user">Ban this user until :</label>
                                <input id="ban_date" type="datetime-local" name="ban_date" onChange={handleChange} value={banDate.value}/>
                                <input className="button--submit" type="submit" value="ban"/>
                            </form>
                        </div>
                        { user.profil_picture !== null && (
                            <img className='user__profil-picture' src={require(`../../../../public/img/${user.profil_picture}`)} alt='profil'/>)
                        }
                        { user.profil_picture === null && (
                            <img className='user__profil-picture' src={require(`../../../../public/img/${defaultPP}`)} alt='default profil'/>)
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default ReadAllUsers;
