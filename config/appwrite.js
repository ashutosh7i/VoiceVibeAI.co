import { Client, Databases, Account } from "appwrite";

export const config = {
  APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
};

const client = new Client();

client
  .setEndpoint(config.APPWRITE_ENDPOINT)
  .setProject(config.APPWRITE_PROJECT);

export const account = new Account(client);
export const database = new Databases(client);
