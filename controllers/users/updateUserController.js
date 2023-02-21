import User from '../../models/User.js';
import BDD from '../../config/database.js';

export default async (req, res) => {
    try {
        const bdd = new BDD();
        const user = new User(bdd);
        const data = {
            profil_picture: req.body.files,
            ...req.body
        }
        console.log(req.body)
        const update = await user.updateUser(data);
        res.json({update});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};