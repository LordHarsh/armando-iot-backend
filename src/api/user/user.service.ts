import database from '../../loaders/database';
import { userType } from './user.schema';
import { s3 } from '../../shared/utils/aws';      
import config from '../../config';

export const handleGetUser = async (email: string): Promise<unknown> => {
  const collection = (await database()).collection('users');
  return await collection.findOne({ email }, { projection: { password: 0 } });
};

export const handleDeleteUser = async (email: string): Promise<void> => {
  const collection = (await database()).collection('users');
  const user = await collection.findOne({ email });
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }
  await collection.updateOne({ email }, { $set: { isDeleted: true } });
};

export const handleGetUsers = async (): Promise<unknown> => {
  const collection = (await database()).collection('users');
  return await collection.find({}, { projection: { password: 0 } }).toArray();
};

export const handleUpdateUser = async (file: Express.Multer.File, user: userType): Promise<void> => {
  if (file) {
    const fileContent = file.buffer;
    const params = {
      Bucket: config.AWS.bucketName,
      Key: `${Date.now()}_${file.originalname}`,
      Body: fileContent,
      ContentType: file.mimetype,
    };
    const uploadObject = await s3.upload(params).promise();
    user.image = uploadObject.Location;
  } else if (user.image.length === 0) {
    user.image = `https://avatars.dicebear.com/api/bottts/${user.firstName}.svg`;
  }
  const collection = (await database()).collection('users');
  await collection.updateOne({ email: user.email }, { $set: user });
};
