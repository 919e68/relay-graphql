import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

import Company from './company'

let ManagerSchema = new Schema({
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
  phoneNumber: {
    type: String,
    required: [
      true,
      'phone number is required'
    ]
  },
  company: {
    type: String,
    required: [
      true,
      'company name is required'
    ]
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: [
      true,
      'company id is required'
    ]
  },
  token: {
    type: String
  }
})

ManagerSchema.pre('save', function(callback) {
  var manager = this

  if (!manager.isModified('password')) {
    return callback()
  } else {
    bcrypt.genSalt(20160701, (err, salt) => {
      if (err) 
        return callback(err)

      bcrypt.hash(manager.password, salt, null, (err, hash) => {
        if (err) 
          return callback(err)

        manager.password = hash
        callback()
      })
    })
  }
})

ManagerSchema.path('email').validate(function(email, callback) {
  let query = { email: email }
  if (this._id) 
    query._id = { '$ne': this._id }

  mongoose.models['Manager'].findOne(query, (err, manager) => {
    if (manager)
      callback(false)
    else
      callback(true)
  })
}, 'email already exists')

ManagerSchema.path('companyId').validate((id, callback) => {
  Company.findById(id, (err, company) => {
    if (!company)
      callback(false)
    else
      callback(true)
  })
}, 'company id does not exists')

export default mongoose.model('Manager', ManagerSchema)

