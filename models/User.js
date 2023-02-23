import bcrypt from "bcrypt";
import { generateToken } from "../config/token.js";

export default class User {
    constructor(bdd) {
        this.pool = bdd.pool;
        this.asyncQuery = bdd.asyncQuery;
        this.saltRounds = 10;
    }

    // async login({ email, password }) {
    //     try {
    //         const dataBDD = await this._emailExist(email);
    //         console.log(dataBDD[0])
    //         if (!dataBDD[0]) {
    //             return { res: "email invalide" };
    //         }

    //         const passwordIsValide = await bcrypt.compare(password, dataBDD[0].password);

    //         if (passwordIsValide) {
    //             return { response: passwordIsValide };
    //         }

    //         return { res1: "mot de passe invalide" };
    //     }
    //     catch (err) {
    //         return { error: err };
    //     }
    // }

    // async _emailExist(email) {
    //     try {
    //         console.log("email : " + email)
    //         const sql = "SELECT * FROM user WHERE email = ?";
    //         const response = await this.asyncQuery(sql, [email]);
    //         console.log(response)
    //         if (response.length > 0) return response;
    //         return false;
    //     }
    //     catch (err) {
    //         return;
    //     }
    // }

    async generateResponse(userDataSQL) {
        // ID du role Admin en BDD
        const ADMIN_ROLE_ID = 1;
        // verifie si le user est admin return true OR false

        const userData = {
            id: userDataSQL.id,
            last_name: userDataSQL.last_name,
            first_name: userDataSQL.first_name,
            email: userDataSQL.email,
            user: true,
            admin: userDataSQL.role__id === ADMIN_ROLE_ID
        };
        try {
            const token = await generateToken(userData);
            return { response: userData, token };
        }
        catch (err) {
            console.log(err);
            return;
        }
    }

    async login({ email, password }) {
        const sql = "SELECT * FROM user WHERE email = ?";
        const paramsSql = [email];

        try {
            const result = await this.asyncQuery(sql, paramsSql);
            const response = await this.generateResponse(result[0]);
            console.log(response);
            const resultCompare = await bcrypt.compare(password, result[0].password);
            console.log(resultCompare);
            if (resultCompare) return { response };

            return {response: null};
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }
    
    async createUser(data) {
        const { last_name, first_name, email, password } = data;
        const sql = "INSERT INTO user (role__id, first_name, last_name, email, password) VALUES (?,?,?,?,?)";

        if (password.length <= 8) {
            return { response: 'mdp trop court' };
        }

        try {
            // check duplicate mail in BDD
            const emailPresent = await this._emailExist(email);

            // error a la verification de l'email
            if (emailPresent === undefined) {
                return;
            }

            // Email deja present en BDD 
            if (emailPresent === true) {
                return { response: 'email deja present' };
            }

            // On hash le password
            const mpdHash = await bcrypt.hash(password, this.saltRounds);

            // on creer la liste des params pour add user
            const paramsSql = [1, first_name, last_name, email, mpdHash];

            // on fait la requete
            const createUser = await this.asyncQuery(sql, paramsSql);

            // on retourn la reponse
            return { response: createUser };
        }
        catch (err) {
            console.log(err);
            return;
        }
    }

    async readAllUser() {
        const sql = "SELECT * FROM user";

        try {
            const result = await this.asyncQuery(sql);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async readByID({ id }) {
        const sql = "SELECT * FROM user WHERE id = ?";

        try {
            const result = await this.asyncQuery(sql, [id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async updateUser({ birth_date, last_name, first_name, email, profil_picture, id }) {
        const sql = "UPDATE user SET birth_date = ?, last_name = ?, first_name = ?, email = ?, profil_picture = ? WHERE id = ?";
        try {
            const result = await this.asyncQuery(sql, [birth_date, last_name, first_name, email, profil_picture, id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async deleteUser({ id }) {
        console.log(id);
        const sql = "DELETE FROM user WHERE id = ?";
        try {
            const result = await this.asyncQuery(sql, [id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

}
