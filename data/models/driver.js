import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

import Company from './company'

const DriverSchema = new Schema({
  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
      'please fill a valid email address'
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
  },
  phoneNumber: {
    type: String,
    required: [
      true,
      'phone number is required'
    ]
  },
  firstName: {
    type: String,
    required: [
      true,
      'first name is required'
    ]
  },
  lastName: {
    type: String,
    required: [
      true,
      'last name is required'
    ]
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: [
      true,
      'company is required'
    ]
  }
})

DriverSchema.pre('save', function(callback) {
  var driver = this

  if (!driver.isModified('password')) {
    return callback()
  } else {
    bcrypt.genSalt(20160701, (err, salt) => {
      if (err) 
        return callback(err)

      bcrypt.hash(driver.password, salt, null, (err, hash) => {
        if (err) 
          return callback(err)

        driver.password = hash
        callback()
      })
    })
  }
})

DriverSchema.path('email').validate(function(email, callback) {
  let query = { email: email }
  if (this._id) 
    query._id = { '$ne': this._id }

  mongoose.models['Driver'].findOne(query, (err, driver) => {
    if (driver)
      callback(false)
    else
      callback(true)
  })
}, 'email already exists')

DriverSchema.path('companyId').validate((id, callback) => {
  Company.findById(id, (err, company) => {
    if (!company)
      callback(false)
    else
      callback(true)
  })
}, 'company id does not exists')

export default mongoose.model('Driver', DriverSchema)

