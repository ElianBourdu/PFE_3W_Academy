import User from '../../models/User.js';
import BDD from '../../config/database.js';

export default async (req, res) => {
    try {
        const bdd = new BDD();
        const user = new User(bdd);
        const update = await user.updateUser(req.body);
        res.json({update});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};