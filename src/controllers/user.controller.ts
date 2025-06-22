import { MODEL } from '@/models';
import { IUser } from '@/types/models';
import { Request, Response } from 'express';
import * as factoryService from '@/services/factory.service';
import { sendResponse } from '@/utils/response';
import ApiError from '@/utils/apiError';
import { HttpStatusCode } from 'axios';
import { encrypt } from '@/utils/encryption';
import exclude from '@/utils/exclude';
const UserModel = MODEL.User;

const excludeUserFields: (keyof IUser)[] = ['password'];

export const createUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  const isUserAlreadyExists = await factoryService.findOneDoc(UserModel, {
    email,
  });
  if (isUserAlreadyExists) {
    throw new ApiError(HttpStatusCode.BadRequest, 'User already exists');
  }
  const user = await factoryService.createOneDoc(UserModel, {
    email,
    password: await encrypt(password),
    isVerified: true,
    role,
  });

  sendResponse(res, HttpStatusCode.Ok, 'User created successfully', {
    //TODO: Add token
    tokens: null,
    user: { ...exclude(user, excludeUserFields) },
  });
};
