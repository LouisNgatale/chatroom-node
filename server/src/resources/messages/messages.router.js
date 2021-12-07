import { Router } from 'express';
import { init } from './messages.controller.js';
const router = Router();

router.get('/:roomId', init);

export default router;


