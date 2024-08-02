const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { User, Deck } = require('./index.js')
const {db} = require('../db/config.js')


// clear db and create new user before tests
beforeAll(async () => { // any code in here will be run before the test is run 
  await db.sync({ force: true })
})

afterEach(async () => {
  await db.truncate({ cascade: true})
})

describe('The User model', () => {
  it('Creates a user', async () => {
   const user = await User.create({ username: 'dumbledore' })
   expect(user).toBeInstanceOf(User)
   expect(user.username).toBe('dumbledore')
  })

  it('Finds a user', async () => {
    //Arrange
    await User.create({ username: 'gandalf' })

    // Act
    const user = await User.findOne({
      where: {
         username: 'gandalf'
      }
    })
     
    // Assert
    expect(user).toBeInstanceOf(User)
    expect(user.username).toBe('gandalf')
      
  })

it('Updates a user', async () => {
  // Arrange
  let user = await User.create({ username: 'merlyn' }) // using let so we can reassign it 

  // Act
  user = await user.update({ username: 'merlin'})

  // Assert
  expect( user.username).toBe('merlin')
})


 it('Deletes a user', async () => {
  //Arrange
  let user = await User.create({ username: 'grindelwald'})

  // Act 
  await user.destroy()
  user = await User.findByPk(user.id)

  // Assert
  expect(user).toBeNull()
 })


 
 it(' Has exactly one deck', async () => {
  // Arrange 
  let user = await User.create({ username: 'ancano'})

  const deck0 = await Deck.create({ name: 'Fire', xp: 100})
  const deck1 = await Deck.create({ name: 'Water', xp: 75})

  // Act 
  // Tried to assign both decks to the user 
  await user.setDeck(deck0)
  await user.setDeck(deck1)
  user = await User.findByPk(user.id)
  const finalDeck = await user.getDeck()

  // Assert 
  expect(finalDeck.toJSON()).toEqual(deck1.toJSON())
 })
  

})
