import User from '../../models/User.js';
import BDD from '../../config/database.js';

export default async (req, res) => {
    try {
        const bdd = new BDD();
        const user = new User(bdd);
        const ban = await user.ban(req.body);
        res.json({ban});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};