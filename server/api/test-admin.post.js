import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  
  const ADMIN_EMAIL = 'admin@progrowth.com'
  const ADMIN_PASSWORD_HASH = '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
  
  const emailMatch = email === ADMIN_EMAIL
  const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
  
  return {
    email,
    password,
    emailMatch,
    passwordMatch,
    expectedEmail: ADMIN_EMAIL,
    hash: ADMIN_PASSWORD_HASH
  }
})