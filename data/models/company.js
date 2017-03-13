import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      'company name is required'
    ]
  },
  token: {
    type: String
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
      'Please fill a valid email address'
    ],
    required: [
      true,
      'email is required'
    ]
  },
  password: {
    type: String,
    required: [
      true,
      'password is required'
    ]
  }
})

CompanySchema.pre('save', function(callback) {
  var company = this

  if (!company.isModified('password')) {
    return callback()
  } else {
    bcrypt.genSalt(20160701, (err, salt) => {
      if (err) 
        return callback(err)

      bcrypt.hash(company.password, salt, null, (err, hash) => {
        if (err) 
          return callback(err)

        company.password = hash
        callback()
      })
    })
  }
})

CompanySchema.path('email').validate(function(email, callback) {
  let query = { email: email }
  if (this._id) 
    query._id = { '$ne': this._id }

  mongoose.models['Company'].findOne(query, (err, company) => {
    if (company)
      callback(false)
    else
      callback(true)
  })
}, 'email already exists')

export default mongoose.model('Company', CompanySchema)