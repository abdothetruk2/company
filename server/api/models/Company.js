import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  industry: {
    type: String,
    required: true
  },
  companySize: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  subscription: {
    status: {
      type: String,
      enum: ['inactive', 'active', 'expired', 'cancelled'],
      default: 'inactive'
    },
    plan: {
      type: String,
      enum: ['trial', 'business'],
      default: 'trial'
    },
    startDate: Date,
    endDate: Date,
    paymentIntentId: String,
    amount: Number
  }
}, {
  timestamps: true
})

export default mongoose.models.Company || mongoose.model('Company', companySchema)