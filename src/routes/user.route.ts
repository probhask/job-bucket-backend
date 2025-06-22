import { createUser } from '@/controllers/user.controller';
import validate from '@/middlewares/validate';
import { createUserValidation } from '@/validations/user.validation';
import { Router } from 'express';

const router = Router();

router.post('/signup', validate(createUserValidation), createUser);
export default router;
