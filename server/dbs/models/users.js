import mongoose from 'mongoose'
const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
})
export default mongoose.model('Users', usersSchema)
