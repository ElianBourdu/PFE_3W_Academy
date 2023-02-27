import User from '../../models/User.js';
import BDD from '../../config/database.js';

export default async(req, res) => {
    try {
        const bdd = new BDD();
        const user = new User(bdd);
        const newUser = await user.createUser(req.body);
        res.json({ newUser });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};