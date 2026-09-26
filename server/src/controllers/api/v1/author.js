const AbstractEntity = require('../AbstractEntity');

class Author extends AbstractEntity {
    constructor() {
        super('authors');
    }
}

module.exports = new Author();
