const { DataTypes, Model, db } = require ('../db/config.js') 


class Card extends Model {}

Card.init({
  name: DataTypes.STRING,
  mojo: DataTypes.INTEGER,
  stamina: DataTypes.INTEGER,
  imgUrl: DataTypes.STRING

}, {
    sequelize: db
})



module.exports = { Card }