import bcrypt from "bcrypt";

export default class User {
    constructor(bdd) {
        this.pool = bdd.pool;
        this.asyncQuery = bdd.asyncQuery;
        this.saltRounds = 10;
    }

    async login({ email, password }) {
        try {
            const dataBDD = await this._emailExist(email);

            if (!dataBDD[0]) {
                return { response: "email ou mot de passe invalide" };
            }

            const passwordIsValide = await bcrypt.compare(password, dataBDD[0].password);

            if (passwordIsValide) {
                return { response: passwordIsValide };
            }

            return { response: "email ou mot de passe invalide" };
        }
        catch (err) {
            return { error: err };
        }
    }

    async _emailExist(email) {
        try {
            const sql = "SELECT * FROM user WHERE email = ?";
            const response = await this.asyncQuery(sql, [email]);
            if (response.length > 0) return true;
            return false;
        }
        catch (err) {
            return;
        }
    }

    async register(data) {
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
            const paramsSql = [1 ,first_name, last_name, email, mpdHash];

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

    async deleteAccount({ id }) {
        const sql = "DELETE FROM user WHERE id = ?";
        const paramsSql = [id];

        try {
            const result = await this.asyncQuery(sql, paramsSql);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;

        }
    }

    async getAllUser() {
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

    async getByID({ id }) {
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
}