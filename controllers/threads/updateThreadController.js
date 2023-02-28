import Thread from '../../models/Thread.js';
import BDD from '../../config/database.js';

export default async(req, res) => {
    try {
        const bdd = new BDD();
        const thread = new Thread(bdd);
        const update = await thread.updateThread(req.body);
        res.json({ update });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
