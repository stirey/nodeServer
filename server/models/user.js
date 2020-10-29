// email store string null = false
// password store string null = false

module.exports = function (sequelize, DataTypes) {
//sequelize.define is what is building our table out, table is named user, and email/password are the columns
    const User = sequelize.define('user', {

        email: {
            type: DataTypes.STRING, //this is defining the column
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return User;
};