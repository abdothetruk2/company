import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  assessments: {
    personality: {
      completed: { type: Boolean, default: false },
      progress: { type: Number, default: 0 },
      results: { type: mongoose.Schema.Types.Mixed, default: {} }
    },
    knowledge: {
      completed: { type: Boolean, default: false },
      progress: { type: Number, default: 0 },
      results: { type: mongoose.Schema.Types.Mixed, default: {} }
    },
    softSkills: {
      completed: { type: Boolean, default: false },
      progress: { type: Number, default: 0 },
      results: { type: mongoose.Schema.Types.Mixed, default: {} }
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'expired'],
      default: 'active'
    },
    startDate: Date,
    endDate: Date
  },
  profile: {
    bio: String,
    skills: [String],
    experience: String,
    education: String,
    location: String,
    phone: String
  }
}, {
  timestamps: true
})

// Don't add duplicate email index since unique: true already creates one
// userSchema.index({ email: 1 }) // Remove this line
userSchema.index({ name: 'text' })

// Prevent model overwrite error
export default mongoose.models.User || mongoose.model('User', userSchema)