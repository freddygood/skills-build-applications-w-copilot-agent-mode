import { Router } from 'express';
import { User } from '../models/User';
import { createResourceRouter } from './resourceRoutes';

const router: Router = createResourceRouter(User);
router.get('/profile/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      response.status(404).json({ error: 'User not found' });
      return;
    }
    response.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
