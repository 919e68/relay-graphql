import mongoose, { Schema } from 'mongoose'

const Todo = new Schema({
  todo: String,
  completed: Boolean,
  user: String
})

export default mongoose.model('Todo', Todo)