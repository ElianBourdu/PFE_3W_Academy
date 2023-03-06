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