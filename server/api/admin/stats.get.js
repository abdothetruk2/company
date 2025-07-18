import { connectDB } from '../utils/db.js'
import User from '../models/User.js'

export default defineEventHandler(async (event) => {
  try {
    await connectDB()

    // Get total users
    const totalUsers = await User.countDocuments()

    // Get users registered this month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: startOfMonth }
    })

    // Get assessment completion stats
    const personalityCompleted = await User.countDocuments({
      'assessments.personality.completed': true
    })

    const knowledgeCompleted = await User.countDocuments({
      'assessments.knowledge.completed': true
    })

    const softSkillsCompleted = await User.countDocuments({
      'assessments.softSkills.completed': true
    })

    // Get subscription stats
    const activeSubscriptions = await User.countDocuments({
      'subscription.status': 'active'
    })

    const premiumUsers = await User.countDocuments({
      'subscription.plan': 'premium'
    })

    // Get recent users
    const recentUsers = await User.find()
      .select('name email createdAt subscription.plan')
      .sort({ createdAt: -1 })
      .limit(10)

    return {
      success: true,
      stats: {
        totalUsers,
        newUsersThisMonth,
        assessmentCompletions: {
          personality: personalityCompleted,
          knowledge: knowledgeCompleted,
          softSkills: softSkillsCompleted
        },
        subscriptions: {
          active: activeSubscriptions,
          premium: premiumUsers
        }
      },
      recentUsers
    }

  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to get admin stats'
    })
  }
})