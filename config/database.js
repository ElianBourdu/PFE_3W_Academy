import mysql from "mysql";

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "elianbourdu", // identifiant BDD
    Password : "f8622b6571d0ea33c857658708a3102c", // le password
    database: null, // nom de la base de donnée
});