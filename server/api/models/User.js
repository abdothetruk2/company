import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"]
  },
  age: {
    type: Number,
    required: true
  },
  university: {
    type: String,
    default: ""
  },
  idCardPath: {
    type: String,
    required: true
  },
  assessments: {
    personality: {
      completed: { type: Boolean, default: false },
      progress: { type: Number, default: 0 },
      results: {
        mbtiType: String,
        riasecCode: String,
        personalityTraits: [String],
        completedAt: Date
      }
    },
    knowledge: {
      completed: { type: Boolean, default: false },
      progress: { type: Number, default: 0 },
      results: {
        technicalSkills: [{
          skill: String,
          level: Number
        }],
        domains: [String],
        completedAt: Date
      }
    },
    softSkills: {
      completed: { type: Boolean, default: false },
      progress: { type: Number, default: 0 },
      results: {
        communication: Number,
        leadership: Number,
        problemSolving: Number,
        teamwork: Number,
        adaptability: Number,
        completedAt: Date
      }
    }
  },
  subscription: {
    status: {
      type: String,
      enum: ["inactive", "active", "expired", "cancelled"],
      default: "inactive"
    },
    plan: {
      type: String,
      enum: ["free", "premium"],
      default: "free"
    },
    startDate: Date,
    endDate: Date,
    paymentIntentId: String,
    amount: Number
  },
  careerAnalysis: {
    personalityType: String,
    interests: [String],
    suitableFields: [String],
    skillsToImprove: [String],
    recommendedCourses: [{
      title: String,
      provider: String,
      url: String,
      difficulty: String,
      duration: String,
      description: String
    }],
    generatedAt: Date
  }
}, {
  timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User