import { sendEmailVerification } from '@/services/email.service';
import { sendResponse } from '@/utils/response';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import * as factoryService from '@/services/factory.service';
import * as otpService from '@/services/otp.service';
import { MODEL } from '@/models';
const UserModel = MODEL.User;
const OtpModel = MODEL.Otp;

export const sendEmailOtp = async (req: Request, res: Response) => {
  const { email, isSignup } = req.body;
  const user = await factoryService.findOneDoc(UserModel, { email });

  if (isSignup && user) {
    sendResponse(res, HttpStatusCode.BadRequest, 'User already exists');
    return;
  }
  await factoryService.deleteManyDocs(OtpModel, { email });
  const otp = await otpService.createOtp({ email });
  await sendEmailVerification(email, otp);
  sendResponse(res, HttpStatusCode.Ok, 'Otp sent successfully');
};

export const verifyEmailOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  await otpService.verifyOtp({ email }, otp);
  sendResponse(res, HttpStatusCode.Ok, 'Email verified successfully');
};

export const sendPhoneOtp = async (req: Request, res: Response) => {
  sendResponse(res, HttpStatusCode.Ok, 'OTP sent successfully');
};

export const verifyPhoneOtp = async (req: Request, res: Response) => {
  sendResponse(res, HttpStatusCode.Ok, 'Phone verified successfully');
};
