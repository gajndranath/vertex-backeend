import mongoose from "mongoose";
import dns from "node:dns";
import path from "path";
import dotenv from "dotenv";
import Blog from "./models/Blog.model";

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function publishAll() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const res = await Blog.updateMany({}, { published: true });
    console.log(`Updated ${res.modifiedCount} blogs to be published.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
publishAll();
