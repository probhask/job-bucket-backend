import {
  sendEmailOtp,
  sendPhoneOtp,
  verifyEmailOtp,
  verifyPhoneOtp,
} from '@/controllers/otp.controller';
import validate from '@/middlewares/validate';
import {
  sendEmailOtpSchema,
  sendPhoneOtpSchema,
  verifyEmailOtpSchema,
  verifyPhoneOtpSchema,
} from '@/validations/otp.validation';
import { Router } from 'express';

const router = Router();
const emailRouter = Router();
const phoneRouter = Router();

emailRouter.post('/send', validate(sendEmailOtpSchema), sendEmailOtp);
emailRouter.post('/verify', validate(verifyEmailOtpSchema), verifyEmailOtp);

phoneRouter.post('/send', validate(sendPhoneOtpSchema), sendPhoneOtp);
phoneRouter.post('/verify', validate(verifyPhoneOtpSchema), verifyPhoneOtp);

router.use('/email', emailRouter);
router.use('/phone', phoneRouter);

export default router;
