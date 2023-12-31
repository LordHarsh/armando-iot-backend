import database from '../../loaders/database';
import config from '../../config';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { settings } from 'cluster';

export const handleAnswer = async (user_email: string, prompt: string): Promise<unknown> => {
  const openai = new OpenAI();
  const collection = (await database()).collection('chat');
  const conversation = await collection.findOne({ user: user_email }, { projection: { _id: 0, conversation: 1 } });
  const device_collection = (await database()). collection('devices');
  const devices = await device_collection.find({}, {projection: {_id: 0, ip: 0}}).toArray();
  prompt = prompt.concat("\n\nDevice Settings:\n".concat(JSON.stringify(devices)))
  console.log((prompt));
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  console.log(conversation.conversation)
  const messages: ChatCompletionMessageParam[] = [
    ...conversation.conversation,
    { role: 'user', content: prompt },
  ];
  console.log(messages);
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
  const model_message = completion.choices[0].message['content'];
  // await collection.updateOne( {user: user_id },{ $push: { "achieve": {$each : [77,49,83 ]} } })
  const keyword = "Device Settings:\n";
  const msg_arr = model_message.split(keyword);
  const new_settings = JSON.parse(msg_arr[1]);
  new_settings.map(async (setting) => {
    await device_collection.updateOne({name:setting.name}, {$set: {settings: setting.settings}});
  })
  console.log(await device_collection.find().toArray());
  return msg_arr[0];
};

export const handleCreateChat = async (user_email: string): Promise<void> => {
  const collection = (await database()).collection('chat');
  const chat = {
    user: user_email,
    conversation: [
      {
        role: 'system',
        content:
          'You are a HAB (Home automation bot). Depending on device status or prompts that I tell you you should assume where I am. Note that you cannot adjust the actual devices but just turn them on or off. Intuitively depending on the task turn off/on specific devices. Depending on if im heading out, at home or heading home you should adjust the device status. If im heading out/going out anywhere(work, gym school etc etc) you should turn  off all the devices to conserve power. Increase p score(variance) to 1. After every statement, you must sent the device settings irrespective of changes made.',
      },
    ],
  };
  const c = await collection.insertOne(chat);
  console.log(c);
};

export const handleGetChat = async (user_email: string): Promise<unknown> => {
  const collection = (await database()).collection('chat');
  const conversation = await collection.findOne({ user: user_email }, { projection: { _id: 0, conversation: 1 } });
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  return conversation.conversation;
}