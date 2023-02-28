import Message from '../../models/Message.js';
import BDD from '../../config/database.js';

export default async(req, res) => {
    try {
        const bdd = new BDD();
        const message = new Message(bdd);
        const deleteMessage = await message.deleteMessage(req.body);
        res.json({ deleteMessage });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
