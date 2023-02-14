import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, useState } from "react";
// import { NavLink } from 'react-router-dom';

const ReadAllUsers = () => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        if (usersList.length === 0) {
            axios.get(`${BASE_URL}/readUsers`)
                .then(res => setUsersList(res.data.allUsers))
                .catch(err => console.log(err));
        }
    }, [usersList]);

    // const deleteUser = (id) => {
    //     axios.post(`${BASE_URL}/deleteUserById`, { id })
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // };

    return (
        <div>
            {usersList.map((user, i) => {
                return(
                    <ul key={i}>
                        {/*<li>Nom:<NavLink to={`/user/${user.id}`}>{user.last_name}</NavLink></li>*/}
                        <li>Prenom: {user.first_name}</li>
                        {/*<button onClick={() => deleteUser(user.id)}>X</button>*/}
                    </ul>
                );
            })}
        </div>
    );
};

export default ReadAllUsers;