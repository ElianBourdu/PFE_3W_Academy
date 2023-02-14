import mysql from "mysql";

class BDD {
    constructor() {
        this.pool = mysql.createPool({
            connectionLimit: 10000,
            host: "db.3wa.io", // on rentre l'hôte, l'adresse url où se trouve la bdd
            user: "elianbourdu", // identifiant BDD
            password: "f8622b6571d0ea33c857658708a3102c", // le password
            database: "elianbourdu_3w_pfe" // nom de la base de donnée
        });
    }

    async asyncQuery(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }
}

export default BDD
