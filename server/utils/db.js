import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return
  }

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/progrowth'
    
    // Set mongoose options
    mongoose.set('strictQuery', false)
    
    // Disconnect if already connected but in wrong state
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect()
    }
    
    // Remove deprecated options
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    
    isConnected = true
    console.log('MongoDB connected successfully')
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
      isConnected = false
    })
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected')
      isConnected = false
    })
    
  } catch (error) {
    console.error('MongoDB connection error:', error)
    isConnected = false
    throw error
  }
}

export const disconnectDB = async () => {
  if (isConnected) {
    await mongoose.disconnect()
    isConnected = false
  }
}