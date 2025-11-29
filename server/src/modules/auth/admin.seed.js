import { User } from './user.model.js'

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gadgetzone.com'
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'GZ@admin123'

export const ensureDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({ email: DEFAULT_ADMIN_EMAIL })
  if (existingAdmin) {
    return existingAdmin
  }

  const admin = await User.create({
    name: 'Gadget Zone Admin',
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASSWORD,
    role: 'admin',
  })

  console.log('Default admin seeded:', admin.email)
  return admin
}
