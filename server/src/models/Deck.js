const { DataTypes, Model, db } = require ('../db/config.js') 

class Deck extends Model {}

Deck.init({
   name: DataTypes.STRING,
   xp: DataTypes.INTEGER
},{
    sequelize: db
})



module.exports = { Deck }