const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card, Attack } = require('./index.js')
const {db} = require('../db/config.js')

// clear db and create new user before tests
beforeAll(async () => { // any code in here will run before the test is run 
    await db.sync({ force: true })
  })
  
  afterEach(async () => {
    await db.truncate({ cascade: true})
  })

  describe('The Card model', () => {
  it('Creates a card', async () => {
    //Arrange
    const card = await Card.create({ name: 'Lizard Wizard', mojo: ''  , stamina: '' , imgUrl: '' })
    expect(card).toBeInstanceOf(Card)
    expect(card.name).toBe('Lizard Wizard')
  })
  
  it('Finds a card', async () => {
    //Arrange
    await Card.create({ name: 'Bulk Brogan'})

    //Act
    const card = await Card.findOne({
        where: {
            name: 'Bulk Brogan',

        }
    })
   
    it('Updates a card')
    

    // Assert
    expect(card).toBeInstanceOf(Card)
    expect(card.name).toBe('Bulk Brogan')
  })

  it('Deletes a card', async () => {
    //Arrange
    let card = await Card.create({ name: 'Lighting Leaopard'})

    //Act
    await card.destroy()
    card = await Card.findByPk(card.id)

    // Assert
    expect(card).toBeNull()
  })
  
   











//     it(' Each Card may have many Attacks', async () => {
//     // Arrange 
//    const card1 = await Card.create({ name: 'Lizard Wizard' })
//    const card2 = await Card.create({ name: 'Lizard Wizard' })
//    const attack1 = await Attack.create({title: 'Charge' })
//    const attack2 = await Attack.create({ title: 'Thunderbolt'})
  
//     // Act 
//     await card1.addAttack(attack1)
//     await card1.addAttack(attack2)
//     await card1.addAttack(attack1)
  
  
//     // Assert 
    
//    })
    
  
  })

  
 