const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card, Attack } = require('./index.js')
const {db} = require('../db/config.js')

// clear db and create new user before tests
beforeAll(async () => { // any code in here will be run before the test is run 
    await db.sync({ force: true })
  })
  
  afterEach(async () => {
    await db.truncate({ cascade: true})
  })

  describe('The Attack model', () => {
    it(' Each Attack may belong to many Cards', async () => {
    // Arrange 
   
  
    // Act 
    // Tried to assign both decks to the user 
  
  
    // Assert 
    
   })
    
  
  })