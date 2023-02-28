import Thread from '../../models/Thread.js';
import BDD from '../../config/database.js';

export default async(req, res) => {
    try {
        const bdd = new BDD();
        const thread = new Thread(bdd);
        const newThread = await thread.createThread(req.body);
        res.json({ newThread });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};