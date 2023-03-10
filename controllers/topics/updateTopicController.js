import Topic from '../../models/Topic.js';
import BDD from '../../config/database.js';

export default async(req, res) => {
    try {
        const bdd = new BDD();
        const topic = new Topic(bdd);
        const update = await topic.updateTopic(req.body);
        res.json({ update });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
