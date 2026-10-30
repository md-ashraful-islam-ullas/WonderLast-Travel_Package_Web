import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("WonderLast");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autosignIn: false,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
