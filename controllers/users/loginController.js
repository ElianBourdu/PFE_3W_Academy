// import {pool} from "../../config/database.js";
// import bcrypt from "bcrypt";

// export default (req, res) => {
//     const {password, email} = req.body;
//     const sql = "SELECT password FROM user WHERE email = ?";
//     const paramsSql = [email];
//     //
//     pool.query(sql, paramsSql, async (err, result) => {
//         if(err) throw err;
        
//         try {
//           const resultCompare = await bcrypt.compare(password, result[0].password);
//           res.json({result:resultCompare});
//         } catch(err) {
//             console.log(err);
//         }
//     });
// };

import User from '../../models/User.js';
import BDD from '../../config/database.js';

export default async (req, res) => {
    try {
        const bdd = new BDD();
        const user = new User(bdd);
        const login = await user.login(req.body);
        res.json({login});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};