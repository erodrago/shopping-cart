const { User, CartSession } = require('../database/models');
const paginate = require('../helpers/paginate')

exports.createUser = async (req, res) => {
    const { firstName, lastName, username, password, phoneNumber} = req.body;
    
    // validate body
    if (!username || !password || !firstName) {
        return res.status(400).send({
            message: 'Please provide a firstname, username and a password to create a user!',
        });
    }

    // check if user exists
    let usernameExists = await User.findOne({
        where: {
            username,
        },
    });

    if (usernameExists) {
        return res.status(400).send({
            message: 'A user with the entered username already exists!',
        });
    }

    try {
        let newUser = await User.create({
            firstName,
            lastName,
            username,
            password,
            phoneNumber
        });

        await CartSession.create({
            totalAmount: 0,
            user_id: newUser.id
        });

        return res.send(newUser);
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.getAllUsers = async (req, res) => {
    const {page, size} = req.query;

    if(!page || !size){
        return res.status(400).send({
            message: 'Requires page and size request params',
        });
    }

    try {
        const users = await User.findAll({
            ...paginate({page, size})
        });

        return res.send(users);
    } catch(err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
}

exports.getUserById = async (req, res) => {
    const { uuid } = req.params;

    const user = await User.findOne({
        where: {
            uuid,
        },
    });

    if (!user) {
        return res.status(404).send({
            message: `No user found with the id ${uuid}`,
        });
    }

    return res.send(user);
};

exports.deleteUser = async (req, res) => {
    const { uuid } = req.params;

    if (!uuid) {
        return res.status(400).send({
            message: 'Please provide ID of user to delete',
        });
    }

    const user = await User.findOne({
        where: {
            uuid,
        },
    });

    if (!user) {
        return res.status(404).send({
            message: `No user found with the id ${uuid}`,
        });
    }

    try {
        await user.destroy();
        return res.send({
            message: `User ${uuid} has been deleted!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};

exports.updateUser = async (req, res) => {

    const { firstName, lastName, username, password, phoneNumber} = req.body;

    const { uuid } = req.params;

    const user = await User.findOne({
        where: {
            uuid,
        },
    });

    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${uuid}`,
        });
    }

    try {
        if(firstName) {
            user.firstName = firstName;
        }
        if(lastName) {
            user.lastName = lastName;
        }
        if(phoneNumber) {
            user.phoneNumber = phoneNumber;
        }
        if(username) {
            user.username = username;
        }
        if(password) {
            user.password = password;
        }

        user.save();
        return res.send({
            message: `User ${uuid} has been updated!`,
        });
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`,
        });
    }
};