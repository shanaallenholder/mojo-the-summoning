// create your User model here
const { Model, db, DataTypes } = require('../db/config.js')

class User extends Model {};

User.init({
  
username: DataTypes.STRING
}, {
    sequelize: db

})

module.exports = { User }