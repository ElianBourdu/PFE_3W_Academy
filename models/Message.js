export default class Message {
    constructor(bdd) {
        this.pool = bdd.pool;
        this.asyncQuery = bdd.asyncQuery;
    }

    async createMessage(data) {
        // create dynamic request and param list to add message
        const { content, user__id, thread__id, quoted_message__id } = data;

        if (!content.trim()) return { response: 'you are trying to create empty message' };

        let sql = "";
        const paramsSql = [content, user__id, thread__id];
        if (quoted_message__id) {
            sql = "INSERT INTO message (content, user__id, thread__id, quoted_message__id) VALUES (?,?,?,?)";
            paramsSql.push(quoted_message__id);
        } else {
            sql = "INSERT INTO message (content, user__id, thread__id) VALUES (?,?,?)";
        }

        try {
            const result = await this.asyncQuery(sql, paramsSql);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async readAllMessage() {
        const sql = "SELECT * FROM message";

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
        const sql = "SELECT content FROM message WHERE id = ?";

        try {
            const result = await this.asyncQuery(sql, [id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async updateMessage({ content, id }) {
        const sql = "UPDATE message SET content = ? WHERE id = ?";
        try {
            const result = await this.asyncQuery(sql, [content, id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }

    async deleteMessage({ id }) {
        console.log(id);
        const sql = "DELETE FROM message WHERE id = ?";
        try {
            const result = await this.asyncQuery(sql, [id]);
            return result;
        }
        catch (err) {
            console.log(err);
            if (err) throw err;
        }
    }
    
    async vote({ vote, id}) {
        let sql = "";
        if (vote === 1) sql = "UPDATE message set like_count = like_count + 1 WHERE id = ?";
        if (vote === -1) sql = "UPDATE message set dislike_count = dislike_count - 1 WHERE id = ?";
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