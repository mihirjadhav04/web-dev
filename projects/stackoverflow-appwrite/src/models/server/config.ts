import {Client, Avatars, Users, Databases, Storage} from "node-appwrite";
import env from "@/app/env";
let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey) // Your secret API key
;

const database = new Databases(client);
const avatar = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client);


export { client, database, avatar, storage, users}