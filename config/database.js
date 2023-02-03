// import mysql from "mysql";

// export let pool  = mysql.createPool({
//   connectionLimit : 10000,
//     host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
//     user: "elianbourdu", // identifiant BDD
//     Password : "f8622b6571d0ea33c857658708a3102c", // le password
//     database: "elianbourdu_3watrade", // nom de la base de donnée
// });

import mysql from "mysql";
import util from "util";


const pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "elianbourdu", // identifiant BDD
    password: "f8622b6571d0ea33c857658708a3102c", // le password
    database: "elianbourdu_tutotest", // nom de la base de donnée
});

const query = util.promisify(pool.query).bind(pool);

const asyncQuery = async (sql, params) => {
    try {
        const rows = await query(sql, params);
        return rows;
    } catch(err) {
        console.log(err);
    }
};

export {pool, query, asyncQuery};