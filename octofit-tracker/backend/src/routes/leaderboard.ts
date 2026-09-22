import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const entries = await Leaderboard.find().sort({ points: -1, rank: 1 }).populate('user');
    response.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  try {
    const entry = await Leaderboard.create(request.body);
    response.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

export default router;
