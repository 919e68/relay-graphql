import mongoose, { Schema } from 'mongoose'
import Owner from './owner'

const StationSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: [
      true,
      'owner id is required'
    ]
  },
  brand: {
    type: String,
    required: [
      true,
      'brand is required'
    ]
  },
  geohash: {
    type: String,
    index: true,
    required: [
      true,
      'geo hash is required'
    ]
  },
  products: {
    type: [
      {
        pumpId: { 
          type: Number,
          required: [
            true,
            'pump id is required'
          ]
        },
        name: { 
          type: String,
          required: [
            true,
            'pump name is required'
          ]
        },
        price: {
          type: Number,
          required: [
            true,
            'price is required'
          ]
        },
        updatedAt: {
          type: Date,
          required: [
            true,
            'product update date is required'
          ]
        }
      }
    ],
    required: [
      true,
      'products are required'
    ]
  },
  pumpIds: {
    type: [Number],
    required: [
      true,
      "pump ids are required"
    ]
  },
  currency: {
    type: String,
    required: [
      true,
      'currency is required'
    ]
  }, 
  phoneNumber: {
    type: String,
    required: [
      true,
      'phone number is required'
    ]
  },
  address: {
    type: String,
    required: [
      true,
      'address is required'
    ]
  },
  fullAddress: {
    type: String
  },
  lat: {
    type: Number,
    required: [
      true,
      'latitude is required'
    ]
  },
  lng: {
    type: Number,
    required: [
      true,
      'longitude is required'
    ]
  },
  updatedAt: {
    type: Date,
    required: [
      true,
      'station update date is required'
    ]
  },
  zipline: {
    storeId: {
      type: Number
    }
  },
  readyForSale: {
    type: Boolean,
    default: false,
    required: [
      true,
      'ready for sale status is required'
    ]
  },
  isTest: {
    type: Boolean,
    default: false
  }
})

StationSchema.path('ownerId').validate((id, callback) => {
  Owner.findById(id, (err, owner) => {
    if (!owner)
      callback(false)
    else
      callback(true)
  })
}, 'owner id does not exists')

export default mongoose.model('Station', StationSchema)