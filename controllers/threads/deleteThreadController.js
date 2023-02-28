import Thread from '../../models/Thread.js';
import BDD from '../../config/database.js';

export default async(req, res) => {
    try {
        const bdd = new BDD();
        const thread = new Thread(bdd);
        const deleteThread = await thread.deleteThread(req.body);
        res.json({ deleteThread });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
