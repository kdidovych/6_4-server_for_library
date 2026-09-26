const db = require('../../databases/pg');
const ResponseError = require('../../errors/ResponseError');

/** General "Abstract" Controller to handle all similar entities CRUD requests */
class AbstractEntity {
    table;
    LIMIT = 10000;

    constructor(table) {
        if (this.constructor === AbstractEntity) {
            const e = new Error("Abstract class cannot be instantiated directly.");
        }
        if (!table) {
            throw new Error("'table' properties should be provided to parent constructor");
        }
        this.table = table;
    }

    getAll = async (req, res, next) => {
        const client = db.client();
        try {
            await client.connect();
            const result = await client.query(`SELECT * FROM ${this.table} LIMIT ${this.LIMIT}`);
            res.send({result: result.rows});
        } catch (error) {
            next(error);
        } finally {
            await client.end();
        }
    }

    getById = async (req, res, next) => {
        const client = db.client();
        try {
            await client.connect();
            const result = await client.query(`SELECT * FROM ${this.table} WHERE "id"=$1::numeric`, [req.params.id]);
            res.send({result: result.rows});
        } catch (error) {
            next(error);
        } finally {
            await client.end();
        }
    }

    createOne = async (req, res, next) => {
        const client = db.client();
        try {
            await client.connect();
            const rowData = req.body.data;
            const columns = Object.keys(rowData).map((val)=>`"${val}"`).join(', ');
            const bindValues = Object.values(rowData);
            const bindVars = Array.from(
                {length: bindValues.length},
                (_, i) => `$${i + 1}`
            ).join(', ');
            const result = await client.query(
                `INSERT INTO ${this.table}(${columns}) VALUES (${bindVars}) RETURNING *`,
                bindValues
            );
            res.send({result: result.rows});
        } catch (error) {
            next(error);
        } finally {
            await client.end();
        }
    }

    updateOne = async (req, res, next) => {
        const client = db.client();
        try {
            await client.connect();
            const rowData = {...req.body.data};
            const id = rowData.id;
            delete rowData.id;
            const updateBinding = Object
                .keys(rowData)
                .map((name, i)=>`"${name}"=$${i+2}`) // should start from 2. $1 is reserved for id
                .join(', ');
            const bindValues = Object.values(rowData);
            const result = await client.query(
                `UPDATE ${this.table} SET ${updateBinding} WHERE "id"=$1::numeric RETURNING *`,
                [id, ...bindValues]
            );
            if (!result.rows.length) {
                return next(new ResponseError(`Item with id=${id} was not found`, {code: 400, shouldBeLogged: true}));
            }
            res.send({result: result.rows});
        } catch (error) {
            next(error);
        } finally {
            await client.end();
        }
    }

    deleteById = async (req, res, next) => {
        const client = db.client();
        try {
            const id = req.params.id;
            await client.connect();
            const result = await client.query(`DELETE FROM ${this.table} WHERE "id"=$1::numeric`, [id]);
            res.send({result: {deletedRows: result.rowCount}});
        } catch (error) {
            next(error);
        } finally {
            await client.end();
        }
    }
}

module.exports = AbstractEntity;
