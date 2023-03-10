import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, useState, Fragment } from "react";
import { NavLink } from 'react-router-dom';


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

    return (
        <ul>
            { usersList.length === 0 && (<p>loading</p>) }
            { usersList.map((user, i) => {
                return(
                    <Fragment key={i}>
                        <li>Nom:<NavLink to={`/user/${user.id}`}>{user.last_name}</NavLink></li>
                        <li>Prenom: {user.first_name}</li>
                        { user.profil_picture !== null && (
                            <li><img src={require(`../../../../public/img/${user.profil_picture}`)} alt='profil'/></li>)
                        }
                        { user.profil_picture === null && (
                            <img src={require(`../../../../public/img/${defaultPP}`)} alt='default profil'/>)
                        }
                        <button onClick={() => deleteUser(user.id)}>X</button>
                        <form>
                            <label htmlFor="ban user">Choose a date to ban this user !</label>
                            <input id="ban user" type="datetime-local" name="ban user"/>
                            <input type="submit" value="Ban this user !"/>
                        </form>
                    </Fragment>
                );
            })}
        </ul>
    );
};

export default ReadAllUsers;
