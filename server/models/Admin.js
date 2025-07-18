import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'super_admin']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  permissions: [{
    type: String,
    enum: [
      'manage_companies',
      'manage_jobs',
      'manage_users',
      'view_analytics',
      'manage_admins',
      'system_settings'
    ]
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  },
  profileImage: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Set default permissions based on role
adminSchema.pre('save', function(next) {
  if (this.role === 'super_admin') {
    this.permissions = [
      'manage_companies',
      'manage_jobs',
      'manage_users',
      'view_analytics',
      'manage_admins',
      'system_settings'
    ]
  } else if (this.role === 'admin' && this.permissions.length === 0) {
    this.permissions = [
      'manage_companies',
      'manage_jobs',
      'view_analytics'
    ]
  }
  next()
})

// Remove password from JSON output
adminSchema.methods.toJSON = function() {
  const admin = this.toObject()
  delete admin.password
  return admin
}

// Prevent model overwrite error
export default mongoose.models.Admin || mongoose.model('Admin', adminSchema)