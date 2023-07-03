const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// List of users
exports.findAll = (req, res) => {
    const userName = req.query.userName;
    var condition = userName ? {
        userName: {
            [Op.like]: `%${userName}%`
        }
    } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while getting users"
            });
        });
};

// get single users
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: "Error occured while getting user with id=" + id,
                error: err.stack
            });
        });
};

// create user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName && !req.body.lastName) {
        res.status(400).send({
            message: "User name can't be empty!"
        });
        return;
    }

    const userName = `${req.body.firstName} ${req.body.lastName}`

    const userObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: userName,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender
    };

    User.create(userObj)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating user"
            });
        });
};

// update single user
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, { where: { id: id } })
        .then(response => {
            if (response == 1) {
                res.send({
                    message: "User updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error occured while updating user with id=" + id
            });
        });
};

// delete single user
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
            where: { id: id }
        })
        .then(response => {
            if (response == 1) {
                res.send({
                    message: "User deleted successfully!"
                });
            } else {
                res.send({
                    message: `Error occured while deleting the user with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};