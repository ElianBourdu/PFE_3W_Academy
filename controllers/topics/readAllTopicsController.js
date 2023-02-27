import Topic from '../../models/Topic.js';
import BDD from '../../config/database.js';

export default async(req, res) => {
    try {
        const bdd = new BDD();
        const topic = new Topic(bdd);
        const allTopics = await topic.readAllTopic();
        res.json({ allTopics });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};