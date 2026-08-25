import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'alex-runner',
        email: 'alex.runner@mergington.edu',
        name: 'Alex Rivera',
        profile: { grade: 10, fitnessLevel: 'intermediate' },
      },
      {
        username: 'jamie-lifts',
        email: 'jamie.lifts@mergington.edu',
        name: 'Jamie Chen',
        profile: { grade: 11, fitnessLevel: 'advanced' },
      },
      {
        username: 'taylor-walks',
        email: 'taylor.walks@mergington.edu',
        name: 'Taylor Brooks',
        profile: { grade: 9, fitnessLevel: 'beginner' },
      },
    ]);

    await Team.create([
      { name: 'Cardio Captains', members: [users[0]._id, users[2]._id] },
      { name: 'Strength Squad', members: [users[1]._id] },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'running', duration: 30, points: 300 },
      { userId: users[1]._id, type: 'strength training', duration: 45, points: 450 },
      { userId: users[2]._id, type: 'walking', duration: 25, points: 125 },
    ]);

    await LeaderboardEntry.create([
      { userId: users[0]._id, points: 300 },
      { userId: users[1]._id, points: 450 },
      { userId: users[2]._id, points: 125 },
    ]);

    await Workout.create([
      {
        name: 'Energizing Run',
        description: 'A steady run to build cardio endurance.',
        difficulty: 'intermediate',
        exercises: [{ name: 'Run', durationMinutes: 30 }],
      },
      {
        name: 'Full-Body Basics',
        description: 'A beginner-friendly strength circuit.',
        difficulty: 'beginner',
        exercises: [
          { name: 'Squats', repetitions: 12 },
          { name: 'Push-ups', repetitions: 8 },
          { name: 'Plank', durationSeconds: 30 },
        ],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
