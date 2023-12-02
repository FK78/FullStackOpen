const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fso:${password}@part3.ae3tiz5.mongodb.net/phonebook?retryWrites=true&w=majority`

const phoneName = process.argv[3]
const phoneNumber = process.argv[4]

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneRecord = mongoose.model('Number', phonebookSchema)

if (phoneName !== undefined && phoneNumber !== undefined) {
  const phoneRecord = new PhoneRecord({
    name: phoneName,
    number: phoneNumber,
  })

  phoneRecord.save().then(() => {
    console.log(`added ${phoneName} number ${phoneNumber} to phonebook`)
    mongoose.connection.close()
  })
} else {
  PhoneRecord.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((record) => {
      console.log(record.name, record.number)
    })
    mongoose.connection.close()
  })
}
