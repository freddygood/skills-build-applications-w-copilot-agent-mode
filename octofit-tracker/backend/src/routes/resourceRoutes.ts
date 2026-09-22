import { Router } from 'express';
import { Model } from 'mongoose';

export function createResourceRouter<T>(resource: Model<T>): Router {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const documents = await resource.find().sort({ createdAt: -1 });
      response.json(documents);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const document = await resource.findById(request.params.id);
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(document);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const document = await resource.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
