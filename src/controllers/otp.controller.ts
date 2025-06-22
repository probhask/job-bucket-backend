import { sendEmailVerification } from '@/services/email.service';
import { sendResponse } from '@/utils/response';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';

export const sendEmailOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  await sendEmailVerification({ email, otp: '123456' });
  sendResponse(res, HttpStatusCode.Ok, 'Email sent successfully');
};

export const verifyEmailOtp = async (req: Request, res: Response) => {
  sendResponse(res, HttpStatusCode.Ok, 'Email OTP verified successfully');
};

export const sendPhoneOtp = async (req: Request, res: Response) => {
  sendResponse(res, HttpStatusCode.Ok, 'Phone OTP sent successfully');
};

export const verifyPhoneOtp = async (req: Request, res: Response) => {
  sendResponse(res, HttpStatusCode.Ok, 'Phone OTP verified successfully');
};
