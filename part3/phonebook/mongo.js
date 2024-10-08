const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://gcosta815:${password}@cluster0.ohf3q.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const generateId = () => {
    return Math.floor(Math.random() * 10000)
  }

  const person = new Person({
    id: generateId(),
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    process.exit(0)
  })
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
    process.exit(0)
  })
}

