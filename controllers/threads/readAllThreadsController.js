import Thread from '../../models/Thread.js';
import BDD from '../../config/database.js';

export default async(req, res) => {
    try {
        const bdd = new BDD();
        const thread = new Thread(bdd);
        const allThreads = await thread.readAllThread();
        res.json({ allThreads });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};