import bcrypt from "bcrypt";
import { generateToken } from "../config/token.js";
import fs from 'fs'

export default class User {
    constructor(bdd) {
        this.pool = bdd.pool;
        this.asyncQuery = bdd.asyncQuery;
        this.saltRounds = 10;
    }

    async generateResponse(userDataSQL) {
        // admin role id defined in BDD
        const ADMIN_ROLE_ID = 1;
        // check admin right of a user, return true OR false

        const userData = {
            id: userDataSQL.id,
            first_name: userDataSQL.first_name,
            last_name: userDataSQL.last_name,
            birth_date: userDataSQL.birth_date.toLocaleDateString('fr-FR'),
            last_connection: userDataSQL.last_connection,
            profil_picture: userDataSQL.profil_picture,
            ban_date: userDataSQL.ban_date,
            role_name: userDataSQL.role_name,
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
        // const sql = "SELECT * FROM user WHERE email = ?";
        const sql = `
        SELECT u.*, role_name 
        FROM user u
        JOIN role r
        	ON u.role__id = r.id
        WHERE email = ?
        `;
        const paramsSql = [email];

        try {
            const result = await this.asyncQuery(sql, paramsSql);
            if (!result.length) {
                return { response: null };
            }
            const response = await this.generateResponse(result[0]);
            const isPasswordMatching = await bcrypt.compare(password, result[0].password);
            if (isPasswordMatching) return { response };
            return { response: null };
        }
        catch (err) {
            console.log(err);
            return { response: null };
        }
    }

    async _emailExist(email) {
        try {
            const sql = "SELECT * FROM user WHERE email = ?";
            const response = await this.asyncQuery(sql, [email]);
            if (response.length > 0) return response;
            return false;
        }
        catch (err) {
            return;
        }
    }

    async createUser(data) {
        const { last_name, first_name, email, password } = data;
        const sql = "INSERT INTO user (role__id, first_name, last_name, email, password) VALUES (?,?,?,?,?)";

        if (password.length <= 8) return { response: 'password too short, the length must be 8 or more' };

        try {
            // check duplicate email in BDD
            const emailPresent = await this._emailExist(email);

            // check occurring error
            if (emailPresent === undefined) return { response: 'Error occurred while checking' };

            // email already in BDD 
            if (emailPresent === true) return { response: 'Email already exist' };

            // hash password
            const mpdHash = await bcrypt.hash(password, this.saltRounds);

            // create param list to add user
            const paramsSql = [1, first_name, last_name, email, mpdHash];

            // request bdd
            const createUser = await this.asyncQuery(sql, paramsSql);

            // return request
            return { response: createUser };
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
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
