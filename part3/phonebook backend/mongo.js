const mongoose = require('mongoose')
require('dotenv').config();

const uri = process.env.MONGO_DB

mongoose.connect(uri)
  .then(() => {
    console.log('database connected')
  }).catch(error => {
    console.log(error)
  })

      // const person = new Person({
    //   name: 'natalita',
    //   number: '123131'
    // })
    // console.log(`${person.name} created`)
  
    // person.save().then(result => {
    //   console.log('person saved!')
    // })
    
    // Person.find({}).then(result => {
    //   result.forEach(person => {
    //     console.log(person)
    //   })
    //   mongoose.connection.close()
    // })
