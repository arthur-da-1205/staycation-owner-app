import { Encryptor } from '@libraries/encryptor';

const instance = new Encryptor(import.meta.env.VITE_ENCRYPT_KEY);

export const encrypt = (payload: any) => {
  return instance.encrypt(payload);
};

export const decrypt = (payload: string) => {
  return instance.decrypt(payload);
};
