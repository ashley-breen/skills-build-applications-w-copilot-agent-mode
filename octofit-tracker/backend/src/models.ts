import mongoose, { Schema } from 'mongoose';

const timestamps = true;

export const User = mongoose.model('User', new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  profile: { type: Schema.Types.Mixed, default: {} },
}, { timestamps }), 'users');

export const Team = mongoose.model('Team', new Schema({
  name: { type: String, required: true, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps }), 'teams');

export const Activity = mongoose.model('Activity', new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  duration: { type: Number, required: true, min: 0 },
  points: { type: Number, required: true, min: 0, default: 0 },
  completedAt: { type: Date, default: Date.now },
}, { timestamps }), 'activities');

export const LeaderboardEntry = mongoose.model('LeaderboardEntry', new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true, min: 0, default: 0 },
}, { timestamps }), 'leaderboard');

export const Workout = mongoose.model('Workout', new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  exercises: { type: [Schema.Types.Mixed], default: [] },
}, { timestamps }), 'workouts');