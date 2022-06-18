const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(token === null)
        res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.error(err);

        if(err)
            return res.sendStatus(403);
        req.userId = user.id;
        console.log(user);
        next()
    })
}

module.exports = authentication;