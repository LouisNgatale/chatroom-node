import { Router } from 'express';
import { init } from './messages.controller.js';
const router = Router();

router.get('/', init);

export default router;


