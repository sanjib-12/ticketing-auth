import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;
beforeAll(async () => {
   process.env.JWT_KEY = 'asdf';
   
   mongo = await MongoMemoryServer.create(); //start an in-memory MongoDB server
   const mongoUri = mongo.getUri(); // Get the connection URI

   await mongoose.connect(mongoUri, {}); //Connect MOngoose to the in-memory MongoDB
});


beforeEach(async () => {
   if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections(); //Get all collections
      
      for (let collection of collections) {
         await collection.deleteMany({}); // clear each collection
      }
   }
});

afterAll(async () => {
   if (mongo) {
      await mongo.stop(); //stop the in-memory MongoDB server
   }
   await mongoose.connection.close(); // close the Mongoose connection
});