import {
  sendEmailOtp,
  sendPhoneOtp,
  verifyEmailOtp,
  verifyPhoneOtp,
} from '@/controllers/otp.controller';
import { Router } from 'express';

const router = Router();
const emailRouter = Router();
const phoneRouter = Router();

emailRouter.post('/send', sendEmailOtp);
emailRouter.post('/verify', verifyEmailOtp);

phoneRouter.post('/send', sendPhoneOtp);
phoneRouter.post('/verify', verifyPhoneOtp);

router.use('/email', emailRouter);
router.use('/phone', phoneRouter);

export default router;
