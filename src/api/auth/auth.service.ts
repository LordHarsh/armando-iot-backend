import database from '../../loaders/database';
import bcrypt from 'bcrypt';
import generateToken from '../../shared/jwt';
import { ERRORS } from '../../shared/errors';
import { get } from 'http';

export const handleCreateUser = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
): Promise<void> => {
  const collection = (await database()).collection('users');
  const user = await collection.findOne({ email });
  if (user) {
    throw {
      statusCode: ERRORS.USER_ALREADY_EXISTS_ERROR.code,
      message: ERRORS.USER_ALREADY_EXISTS_ERROR.message.error_description,
    };
  }
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  await collection.insertOne({
    firstname,
    lastname,
    email,
    password: hash,
    isDeleted: false,
  });
  const chat_collection = (await database()).collection('chat');
  const chat = {
    user: email,
    conversation: [
      {
        role: 'system',
        content:
          'You are a HAB (Home automation bot). Depending on device status or prompts that I tell you you should assume where I am. Note that you cannot adjust the actual devices but just turn them on or off. Intuitively depending on the task turn off/on specific devices. Depending on if im heading out, at home or heading home you should adjust the device status. If im heading out/going out anywhere(work, gym school etc etc) you should turn  off all the devices to conserve power. Increase p score(variance) to 1. After every statement reply with device status irrespective of changes made.',
      },
    ],
  };
  await chat_collection.insertOne(chat);
};

export const handleLoginUser = async (email: string, password: string): Promise<unknown> => {
  const data = await (await database()).collection('users').findOne({ email: email });
  if (!data) {
    throw { statusCode: 404, message: 'User Does Not Exist' };
  }

  const res = await bcrypt.compare(password, data.password);
  if (!res) {
    throw { statusCode: 401, message: 'Incorrect Password / Not Allowed' };
  }

  return generateToken(email);
};
