import env from "@/app/env";
import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId); // Your project ID


const database = new Databases(client);
const avatar = new Databases(client);
const storage = new Databases(client);
const account = new Account(client);


export { client, database, avatar, storage, account}