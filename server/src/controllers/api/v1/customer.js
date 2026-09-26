const AbstractEntity = require('../AbstractEntity');

class Customer extends AbstractEntity {
    constructor() {
        super('customers');
    }
}

module.exports = new Customer();
