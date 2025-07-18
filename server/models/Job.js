import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Job title cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true
  },
  requirements: {
    type: String,
    required: [true, 'Job requirements are required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Job type is required'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    default: 'Full-time'
  },
  experience: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'],
    default: 'Entry Level'
  },
  salary: {
    min: {
      type: Number,
      required: false
    },
    max: {
      type: Number,
      required: false
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  skills: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  department: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  applicationDeadline: {
    type: Date
  },
  applicationsCount: {
    type: Number,
    default: 0
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'closed', 'expired'],
    default: 'published'
  }
}, {
  timestamps: true
})

// Indexes for better performance
jobSchema.index({ title: 'text', description: 'text', skills: 'text' })
jobSchema.index({ companyId: 1 })
jobSchema.index({ location: 1 })
jobSchema.index({ type: 1 })
jobSchema.index({ experience: 1 })
jobSchema.index({ isActive: 1 })
jobSchema.index({ createdAt: -1 })

// Prevent model overwrite error
export default mongoose.models.Job || mongoose.model('Job', jobSchema)