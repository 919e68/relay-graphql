import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

import Sms from '../utils/sms'
import Email from '../utils/mail'

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: Number
  },
  countryCode: {
    type: String,
  },
  verification: {
    phoneVerified: {
      type: Boolean,
      default: false
    },
    phoneDigits: {
     type: Number, 
    },
    phoneTimestamp: {
     type: Number,
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    emailVerificationToken:{
      type: Number, 
    }
  },
  token: {
    type: String,
    required: true
  },
  local: {
    email: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
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
    }
  },
  facebook: {
    id: {
      type: String,
      match: [/\w+/, 'Invalid Facebook ID'],
    },
  },
  picture: {
    url: String,
  },
  dwollaCustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    name: String,
  },
  fleetCompany: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
  },
  paymentPIN: String,
  autoRefillEnabled: {
    type:Boolean,
    default: true,
  },
  topupTier: {
    amount: Number,
    saving: Number,
  },
  currentBalance: {
    type: Number,
    default: 0
  },
  cutoffBalance: {
    type: Number,
    default: 0
  },
  cutoffAt: Date,
  isTest: {
    type: Boolean,
    default: false
  }
})

UserSchema.pre('save', function(callback) {
  var user = this

  if (!user.isModified('local.password')) {
    return callback()
  } else {
    bcrypt.genSalt(20160701, (err, salt) => {
      if (err) 
        return callback(err)

      bcrypt.hash(user.local.password, salt, null, (err, hash) => {
        if (err) 
          return callback(err)

        user.password = hash
        callback()
      })
    })
  }
})

UserSchema.methods.verifyPassword = function(password) {
  var user = this

  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, user.local.password, function(err, res) {
      if(err)
        reject(err)

      resolve(res)
    })
  })
}

UserSchema.methods.userPhoneVerification = function(countryCode, phoneNumber, code, callback) {
  var message = 'Your verification code is:' + code
  Sms.sendMessage(countryCode, phoneNumber, message, function(result) {
   return callback(result)
  })
}

UserSchema.methods.userEmailVerification = function(userData , token , cb) {
  var hostname = 'http://localhost:1337/'
  var url = hostname + 'verifyEmail?email='+userData.local.email+'&token='+ token

  var message = {
    "html": "<p>Hi "+userData.firstName+" <br><p>Please Click on the link to verify your email:</p><p>"+url+"</p></p>",
    "subject": "Please confirm emailId",
    "from_email": "asha.singh@exit7c.com",
    "from_name": "Asha",
    "to": [
      {
        "email":userData.local.email,
        "name": userData.firstName,
        "type": "to"
      }
    ],
    "important": true,
  }

  return Email.sendVerificationMail(message , function(result) {
    return cb(result)
  })
}

UserSchema.methods.getPaymentAccounts = function() {
  var paymentAccounts = {personal: []};
  if(this.fleetCompany) {
    paymentAccounts.business = this.fleetCompany.name;
  }
  if(this.accounts) {
    paymentAccounts.personal = this.accounts.map(function(account) {
      return {
        name: (account.displayName || "") + "   " + account.accountNumber.slice(-4),
        accountType: account.accountType,
      }
    })
  }
  paymentAccounts.hasPIN = this.paymentPIN && this.paymentPIN.length > 0 ? true : false;
  return paymentAccounts
}

UserSchema.methods.calcTopupTier = function() {
  if (this.currentBalance >= 90) {
    this.topupTier = {
      amount: 90,
      saving: 6,
    }
  } else if (this.currentBalance >= 60) {
    this.topupTier = {
      amount: 60,
      saving: 4,
    }
  } else if (this.currentBalance >= 30) {
    this.topupTier = {
      amount: 30,
      saving: 2,
    }
  }
}

export default mongoose.model('User', UserSchema)
