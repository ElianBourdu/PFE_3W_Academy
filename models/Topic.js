export default class Topic {
    constructor(bdd) {
        this.pool = bdd.pool;
        this.asyncQuery = bdd.asyncQuery;
    }

    async _titleExist(title) {
        try {
            const sql = "SELECT * FROM topic WHERE title = ?";
            const response = await this.asyncQuery(sql, [title]);
            if (response.length > 0) return response;
            return false;
        }
        catch (err) {
            return;
        }
    }

    async createTopic(data) {
        const { title } = data;
        const sql = "INSERT INTO topic (title) VALUES (?)";

        if (title.length <= 4) return { response: 'title too short, the length must be 4 or more' };

        try {
            // check duplicate mail in BDD
            const titlePresent = await this._titleExist(title);

            // check occurring error
            if (titlePresent === undefined) return { response: 'Error occurred while checking'};

            // title already in BDD 
            if (titlePresent === true) return { response: 'Title already exist' };

            // create param list to add topic
            const paramsSql = [title];

            // request bdd
            const createTopic = await this.asyncQuery(sql, paramsSql);

            // return request
            return { response: createTopic };
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async readAllTopic() {
        const sql = "SELECT * FROM topic";

        try {
            const result = await this.asyncQuery(sql);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async readByID({ id }) {
        const sql = "SELECT title FROM topic WHERE id = ?";

        try {
            const result = await this.asyncQuery(sql, [id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async updateTopic({ title, id }) {
        const sql = "UPDATE topic SET title = ? WHERE id = ?";
        try {
            const result = await this.asyncQuery(sql, [title, id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async deleteTopic({ id }) {
        console.log(id);
        const sql = "DELETE FROM topic WHERE id = ?";
        try {
            const result = await this.asyncQuery(sql, [id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

}
