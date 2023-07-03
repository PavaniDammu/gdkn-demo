module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // get all users
    router.get("/", users.findAll);

    // get user by id
    router.get("/:id", users.findOne);

    // create new user
    router.post("/", users.create);

    // update user by id
    router.put("/:id", users.update);

    // delete user by id
    router.delete("/:id", users.delete);

    app.use('/api/users', router);
};