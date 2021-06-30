const { User } = require('../database/models');
const paginate = require('../helpers/paginate');

exports.createUser = async payload => {
    const newUser = await User.create(payload);
    return newUser;
}

exports.findUserById = async uuid => {
    const user = await User.findOne({
        where:{
            uuid
        }
    })

    return user;
}

exports.findUserByUsername = async username => {
    const user = await User.findOne({
        where:{
            username
        }
    })

    return user;
}

exports.findAllUsers = async (page, size) => {
    const users = await User.findAll({
            ...paginate({page, size})
    });

    return users;
}

exports.findByIdAndDelete = async uuid => {
    const user = await User.findOne({
        where: {
            uuid,
        },
    });

    user.destroy();
}