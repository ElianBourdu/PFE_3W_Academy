import Topic from '../../models/Topic.js';
import BDD from '../../config/database.js';

export default async(req, res) => {
    try {
        const bdd = new BDD();
        const topic = new Topic(bdd);
        const data = {
            profil_picture: req.body.files,
            ...req.body
        };
        console.log(req.body);
        const update = await topic.updateTopic(data);
        res.json({ update });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
