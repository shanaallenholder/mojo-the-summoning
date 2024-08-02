
const { afterEach, beforeAll, describe, expect, it } = require('@jest/globals')
const { Deck, User, Card } = require('./index.js')
const { db } = require('../db/config.js')

beforeAll(async () => {
  await db.sync({ force: true })
})

afterEach(async () => {
  await db.truncate({ cascade: true })
})

describe('The Deck model', () => {
  it('Creates a deck', async () => {
    const deck = await Deck.create({ name: 'Water', xp: 75 })
    expect(deck).toBeInstanceOf(Deck)
    expect(deck.name).toBe('Water')
    expect(deck.xp).toBe(75)
  })

  it('Finds a deck', async () => {
    await Deck.create({ name: 'Grass', xp: 25 })

    const deck = await Deck.findOne({
      where: {
        name: 'Grass',
        xp: 25
      }
    })

    expect(deck).toBeInstanceOf(Deck)
    expect(deck.name).toBe('Grass')
    expect(deck.xp).toBe(25)
  })

  it('Updates a deck', async () => {
    let deck = await Deck.create({ name: 'Electric', xp: 50 })
    deck = await deck.update({ xp: 150 })
    expect(deck.xp).toBe(150)
  })

  it('Deletes a deck', async () => {
    let deck = await Deck.create({ name: 'Bug', xp: 15 })

    await deck.destroy()
    deck = await Deck.findByPk(deck.id)

    expect(deck).toBeNull()
  })

  it('Has exactly one user', async () => {
    let deck = await Deck.create({ name: 'Fire', xp: 150 })

    const user0 = await User.create({ username: 'gandalf' })
    const user1 = await User.create({ username: 'dumbledore' })

    await deck.setUser(user0)
    await deck.setUser(user1)

    deck = await Deck.findByPk(deck.id)
    const finalUser = await deck.getUser()

    expect(finalUser.toJSON()).toEqual(user1.toJSON())
  })
  
  it('Has many cards', async () => {
    // Arrange
     const deck = await Deck.create({ name: 'Grass', xp: 25 })
     const cards = await Card.bulkCreate([
      {
        name: 'Arcturus Spellweaver',
        mojo: 100,
        stamina: 10,
        imgUrl: 'http://localhost:5000/img/arcturus-spellweaver.jpg'
      },
      {
        name: 'Nimue Mistral',
        mojo: 100,
        stamina: 10,
        imgUrl: 'http://localhost:5000/img/nimue-mistral.jpg'
      },
      {
        name: 'Theron Thunderstrike',
        mojo: 100,
        stamina: 10,
        imgUrl: 'http://localhost:5000/img/theron-thunderstrike.jpg'
      },
      {
        name: 'Lirien Moonshadow',
        mojo: 100,
        stamina: 10,
        imgUrl: 'http://localhost:5000/img/lirien-moonshadow.jpg'
      },
      {
        name: 'Alaric Flamecaller',
        mojo: 100,
        stamina: 10,
        imgUrl: 'http://localhost:5000/img/alaric-flamecaller.jpg'
      }
    ])
     
    
    // Act
    await deck.setCards(cards)
     deck = await Deck.findByPk(deck.id)
    // Asset
    const foundCards = await deck.getCards()
    // expect(foundCards.map(card => card.toJson())).toEqual(cards.map(card => card.))
     expect(foundCards.ever)
  })

})