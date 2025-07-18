import mongoose from 'mongoose'
import { connectDB } from './db.js'

export const resetIndexes = async () => {
  await connectDB()
  
  try {
    // Reset indexes for all collections
    const collections = ['companies', 'users', 'jobs']
    
    for (const collectionName of collections) {
      try {
        // Drop all indexes except _id
        await mongoose.connection.db.collection(collectionName).dropIndexes()
        console.log(`Dropped all indexes for ${collectionName} collection`)
        
        // Recreate necessary indexes
        if (collectionName === 'companies' || collectionName === 'users') {
          await mongoose.connection.db.collection(collectionName).createIndex(
            { email: 1 }, 
            { unique: true }
          )
          console.log(`Recreated email index for ${collectionName} collection`)
        }
      } catch (error) {
        if (error.message.includes('ns not found')) {
          console.log(`Collection ${collectionName} does not exist yet`)
        } else {
          console.error(`Error resetting indexes for ${collectionName}:`, error)
        }
      }
    }
    
  } catch (error) {
    console.error('Error resetting indexes:', error)
  }
}

// Run this if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  resetIndexes().then(() => {
    console.log('Index reset complete')
    process.exit(0)
  }).catch((error) => {
    console.error('Index reset failed:', error)
    process.exit(1)
  })
}