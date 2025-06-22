import { MODEL } from '@/models';
import * as factoryService from './factory.service';
import { decrypt, encrypt } from '@/utils/encryption';
import moment from 'moment';
import { OTP_EXPIRATION_MINUTES } from '@/constants';
import config from '@/config/config';
import ApiError from '@/utils/apiError';
import { HttpStatusCode } from 'axios';
interface OtpCondition {
  userId?: string;
  email?: string;
  phone?: string;
}
const OtpModel = MODEL.Otp;

const createOtp = async (condition: OtpCondition): Promise<string> => {
  const isOtpExits = await factoryService.findOneDoc(OtpModel, condition);
  const otp = generateOtp();
  const encryptedOtp = await encrypt(otp);
  if (isOtpExits) {
    await factoryService.updateOneDoc(OtpModel, condition, {
      expiresAt: moment().add(OTP_EXPIRATION_MINUTES, 'minutes').toDate(),
      otp: encryptedOtp,
    });
    return otp;
  }
  await factoryService.createOneDoc(OtpModel, {
    ...condition,
    otp: encryptedOtp,
    expiresAt: moment().add(OTP_EXPIRATION_MINUTES, 'minutes').toDate(),
  });
  return otp;
};

const verifyOtp = async (
  condition: OtpCondition,
  otp: string,
): Promise<boolean> => {
  if (otp === config.masterOtp) {
    return true;
  }

  const otpData = await factoryService.findOneDoc(OtpModel, condition);
  if (!otpData) {
    throw new ApiError(HttpStatusCode.BadRequest, 'Invalid OTP');
  }

  const isOtpExpired = moment().isAfter(otpData.expiresAt);
  if (isOtpExpired) {
    throw new ApiError(HttpStatusCode.BadRequest, 'OTP has expired');
  }

  const isOtpMatch = await decrypt(otp, otpData.otp);
  if (!isOtpMatch) {
    throw new ApiError(HttpStatusCode.BadRequest, 'Invalid OTP');
  }

  await factoryService.deleteOneDoc(OtpModel, condition, { _id: 1 });
  return true;
};

export { createOtp, verifyOtp };
