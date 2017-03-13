import mongoose, { Schema } from 'mongoose'

const OwnerSchema = new Schema({
  email: {
    type: String,
    unique: true,
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
  address: {
    type: String,
    required: [
      true,
      'address is required'
    ]
  },
  paymentAmount: {
    type: Number,
    required: [
      true,
      'payment amount is required'
    ]
  },
  isTest: {
    type: Boolean,
    default: false
  }
})

OwnerSchema.path('email').validate(function(email, callback) {
  let query = { email: email }
  if (this._id) 
    query._id = { '$ne': this._id }

  mongoose.models['Owner'].findOne(query, (err, owner) => {
    if (owner)
      callback(false)
    else
      callback(true)
  })
}, 'email already exists')

export default mongoose.model('Owner', OwnerSchema)