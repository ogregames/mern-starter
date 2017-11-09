import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const commentSchema = new Schema({
  name: { type: 'String', required: true },
  content: { type: 'String', required: true },
  rating: { type: 'Number', default: 0, required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Comment', commentSchema);
// export default commentSchema;
