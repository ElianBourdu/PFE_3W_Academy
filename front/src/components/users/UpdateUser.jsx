import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../tools/utils.js";
import { useState, useEffect, Fragment } from "react";
// import moment from 'moment';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ last_name: '', first_name: '', email: '' });


    useEffect(() => {
        axios.post(`${BASE_URL}/readUser`, { id })
            .then(res => setUser(res.data.readUser[0]))
            .catch(err => console.log(err));
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(user);
        axios.post(`${BASE_URL}/updateUser`, { ...user })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const reformeDate = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString("fr-CA");
    };
    // , { year: 'numeric', month: '2-digit', day: '2-digit' }


    return (
        <Fragment>
            { !user && (<p>loading</p>)}
            { user && (
                <form onSubmit={submit}>
                    <div>
                        <label htmlFor="last_name">last_name</label>
                        <input type='text' name='last_name' placeholder='last_name' onChange={handleChange} value={user.last_name} />
                    </div>
                    <div>
                        <label htmlFor="first_name">first_name</label>
                        <input type='text' name='first_name' placeholder='first_name' onChange={handleChange} value={user.first_name} />
                    </div>
                    <div>
                        <label htmlFor="email">email</label>
                        <input type='text' name='email' placeholder='email' onChange={handleChange} value={user.email} />
                    </div>
                    <div>
                        <label htmlFor="birth_date">birth_date</label>
                        <input type='date' name='birth_date' onChange={handleChange} value={reformeDate(user.birth_date)} />
                    </div>
                    {/*
                    <select onChange={null} value={null}>
                        <option value='6'>Admin</option>
                        <option value='5'>user</option>
                    </select>
                    */}
                    <input type='submit' />
                </form>
            )}
        </Fragment>
    );
};

export default UpdateUser;
