// MODULE AGGREGATION / BARRELL MODULE 

const { User } = require('./User.js')
const { Deck } = require('./Deck.js')
const { Card } = require('./Card.js')
const { Attack } = require('./Attack.js')
// import the rest of your models above

// set up the associations here

// One-to-One
User.hasOne(Deck)
Deck.belongsTo(User)

// One-to-many
Deck.hasMany(Card)
Card.belongsTo(Deck)

// Many-to-many
Card.belongsToMany(Attack, {through: "CardAttacks"})
Attack.belongsToMany(Card, {through: "CardAttacks"});


// and then export them all below
module.exports = { User, Deck, Card, Attack }
