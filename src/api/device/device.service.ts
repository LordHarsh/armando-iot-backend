import database from "../../loaders/database";
import config from "../../config";

export const handleChangeSettings = async (email: string): Promise<unknown> => {
    const prefer_collection = (await database()).collection('preference');
    const device_collection = (await database()). collection('devices');
    const user = await prefer_collection.findOne({email});
    if(!user){
        throw new Error('Preferences not found');
    }
    const preferences = user.preferences;
    preferences.map(async (preference) => {
        await device_collection.updateOne({ip: preference.device_ip}, {$set: {settings: preference.settings}})
    })
    return preferences;
};

export const handleChangeOneSetting = async (name: string, setting: unknown): Promise<unknown> => {
    const device_collection = (await database()). collection('devices');
    device_collection.updateOne({name: name}, {$set: {settings: setting}})
    if (name === 'ac' &&  setting)
        setting['temperature'] = 25;
    device_collection.updateOne({name: name}, {$set: {settings: setting}})
    console.log(name);
    console.log(setting);
    return setting;
}