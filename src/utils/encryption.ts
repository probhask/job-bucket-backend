import bcrypt from 'bcryptjs';

export const encrypt = async (stringToEncrypt: string): Promise<string> => {
  return await bcrypt.hash(stringToEncrypt, 10);
};

export const decrypt = async (
  normalString: string,
  encryptedString: string,
): Promise<boolean> => {
  return await bcrypt.compare(normalString, encryptedString);
};
