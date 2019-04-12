

const db = require('../data/dbConfig')

module.exports = {
    getUser,
    add,
    getBy
};

function getUser() {
    return db('user');
};

function getById(id) {
    return db('user').where({ id }).first()
}


function getBy(filter) {
    return db('user').where(filter).first()
}


function add(user) {
    return db('user')
    .insert(user)
    .then(ids => {
        return getById(ids[0]);
      });
}


