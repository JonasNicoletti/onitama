import { Client, Functions } from 'appwrite';

export const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_FUNCTION_PROJECT_ID || '');


export const functions = new Functions(client);
export { ID } from 'appwrite';
