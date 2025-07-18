import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)
  
  const testHash = '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
  const isValid = await bcrypt.compare(password, testHash)
  
  return {
    password,
    hash: testHash,
    isValid,
    newHash: await bcrypt.hash(password, 12)
  }
})
