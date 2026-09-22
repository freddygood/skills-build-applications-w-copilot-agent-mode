import { connectDatabase, disconnectDatabase } from '../config/database';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        avatar: 'https://i.pravatar.cc/150?img=12',
      },
      {
        name: 'Morgan Lee',
        email: 'morgan.lee@example.com',
        avatar: 'https://i.pravatar.cc/150?img=32',
      },
      {
        name: 'Taylor Smith',
        email: 'taylor.smith@example.com',
        avatar: 'https://i.pravatar.cc/150?img=47',
      },
    ]);

    const [alex, morgan, taylor] = users;

    await Team.insertMany([
      {
        name: 'OctoFit Champions',
        members: [alex._id, morgan._id],
      },
      {
        name: 'Weekend Warriors',
        members: [taylor._id],
      },
    ]);

    await Activity.insertMany([
      { user: alex._id, type: 'Running', duration: 30, points: 300, date: new Date('2026-09-20') },
      { user: morgan._id, type: 'Cycling', duration: 45, points: 450, date: new Date('2026-09-20') },
      { user: taylor._id, type: 'Strength training', duration: 40, points: 400, date: new Date('2026-09-19') },
    ]);

    await Leaderboard.insertMany([
      { user: morgan._id, points: 1250, rank: 1 },
      { user: alex._id, points: 1100, rank: 2 },
      { user: taylor._id, points: 950, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Energy',
        description: 'A quick full-body workout to start the day.',
        difficulty: 'Beginner',
        exercises: ['Jumping jacks', 'Bodyweight squats', 'Push-ups'],
      },
      {
        title: 'Cardio Builder',
        description: 'Build endurance with intervals and steady-state cardio.',
        difficulty: 'Intermediate',
        exercises: ['High knees', 'Mountain climbers', 'Burpees'],
      },
      {
        title: 'Strength Focus',
        description: 'A strength session using controlled bodyweight movements.',
        difficulty: 'Advanced',
        exercises: ['Lunges', 'Plank shoulder taps', 'Pike push-ups'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
  }
}

void seedDatabase();
