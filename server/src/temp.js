const { db } = require('./db/config.js')
const {Card, Attack} = require('./models/index.js')

async function temp () {
    await db.sync({ force: true})
    const scratch = await Attack.create({
        title: 'Scratch',
        mojoCost: 100,
        staminaCost: 50
    })

    const ember = await Attack.create({
        title: 'Ember',
        mojoCost: 60,
        staminaCost: 50
    })

    const pickachu = await Card.create({
        title: 'Pikachu',
        mojoCost: 200,
        staminaCost: 100,
        imgUrl: ''
    })


    const blastoise = await Card.create({
        title: 'Blastoise',
        mojoCost: 300,
        staminaCost: 200,
        imgUrl: ''
    })
    
    pickachu.addAttacks([scratch, ember])
    blastoise.addAttacks([scratch, ember])
    
}