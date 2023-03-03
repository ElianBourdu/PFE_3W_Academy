export default class Thread {
    constructor(bdd) {
        this.pool = bdd.pool;
        this.asyncQuery = bdd.asyncQuery;
    }

    async _titleExist(title) {
        try {
            const sql = "SELECT * FROM thread WHERE title = ?";
            const response = await this.asyncQuery(sql, [title]);
            if (response.length > 0) return response;
            return false;
        }
        catch (err) {
            return;
        }
    }

    async createThread(data) {
        const { title, topic__id, group__id } = data;
        // create dynamic request and param list to add thread
        let sql = "";
        const paramsSql = [title];
        if (topic__id) {
            sql = "INSERT INTO thread (title, topic__id) VALUES (?,?)";
            paramsSql.push(topic__id);
        }
        if (group__id) {
            sql = "INSERT INTO thread (title, group__id) VALUES (?,?)";
            paramsSql.push(group__id);
        }

        if (title.length <= 4) return { response: 'title too short, the length must be more than 4' };

        try {
            // check duplicate mail in BDD
            const titlePresent = await this._titleExist(title);
            // check occurring error
            if (titlePresent === undefined) return { response: 'Error occurred while checking' };

            // title already in BDD 
            if (titlePresent) return { response: 'Title already exist' };

            // request bdd
            const createThread = await this.asyncQuery(sql, paramsSql);

            // return request
            return { response: createThread };
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async readAllThread() {
        const sql = "SELECT * FROM thread";

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
        const sql = "SELECT title FROM thread WHERE id = ?";

        try {
            const result = await this.asyncQuery(sql, [id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async updateThread({ title, id }) {
        const sql = "UPDATE thread SET title = ? WHERE id = ?";
        try {
            const result = await this.asyncQuery(sql, [title, id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async deleteThread({ id }) {
        const sql = "DELETE FROM thread WHERE id = ?";
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
