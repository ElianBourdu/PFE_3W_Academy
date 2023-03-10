import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../tools/utils.js";
import { useState, useEffect, Fragment } from "react";
// import UploadFile from '../UploadFile'

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState();
    const defaultPP = 'default.png';

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
        
        const dataFile = new FormData();
        const files = { ...e.target.profil_picture.files };

        // ajouter d'autre input au formulaire
        dataFile.append('last_name', user.last_name);
        dataFile.append('first_name', user.first_name);
        dataFile.append('email', user.email);
        dataFile.append('birth_date', user.birth_date.split("T")[0]);
        dataFile.append('id', id);
        // if (files[0].name) {
            dataFile.append('files', files[0], files[0].name);
        // }

        axios.post(`${BASE_URL}/updateUser`, dataFile)
            .then(res => console.log('res updateUser', res))
            .catch(err => console.log(err));
    };

    const formattingDate = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString("fr-CA");
    };

    return (
        <Fragment>
            { !user && (<p>loading</p>)}
            { user && (
                <Fragment>
                    <form onSubmit={submit} encType="multipart/form-data">
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
                            <input type='date' name='birth_date' onChange={handleChange} value={formattingDate(user.birth_date)} />
                        </div>
                        { user.profil_picture !== null && (
                            <img src={require(`../../../../public/img/${user.profil_picture}`)} alt='profil'/>)
                        }
                        { user.profil_picture === null && (
                            <img src={require(`../../../../public/img/${defaultPP}`)} alt='default profil'/>)
                        }
                        <div>
                            <label name='profil_picture'>
                                <input type='file' name='profil_picture'/>
                            </label>
                        </div>
                        <input type='submit' value='update user !'/>
                    </form>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdateUser;