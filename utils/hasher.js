const bcrypt = require('bcryptjs');

const make = async (string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(string, salt);

    return hash;
}

const compare = async (string, hash) => {
    return await bcrypt.compare(string, hash);
}

module.exports = {make, compare};