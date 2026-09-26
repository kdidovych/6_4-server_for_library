const AbstractEntity = require('../AbstractEntity');

class Book extends AbstractEntity {
    constructor() {
        super('books');
    }
}

module.exports = new Book();
