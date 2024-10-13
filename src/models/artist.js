import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  artistName: { type: String, required: true },
  artistEmail: { type: String, required: true },
  requestDate: { type: Date, default: Date.now },
  profileStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  skills: [{ type: String }],  
  title: {
    type: String,
    enum: ['Musician', 'Painter', 'Sculptor', 'Photographer', 'Designer'], 
    required: true,
  },
  isReviewed: { type: Boolean, default: false },
  workStartDate: { type: Date },
  initialApprovalDate: { type: Date },
},{
  timestamps:true
});

export const Artist = mongoose.model("Artist", artistSchema);
