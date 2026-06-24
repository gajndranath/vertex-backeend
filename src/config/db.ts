import mongoose from 'mongoose';
import dns from 'node:dns';

// Force Node.js to use Google and Cloudflare DNS to bypass local ISP SRV blocks
dns.setServers(['8.8.8.8', '1.1.1.1']);

export async function connectDB() {
  try {
    mongoose.set('strictQuery', true);
    
    // Standard connection without any DNS hacks, using recommended ServerApi
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });

    console.log(`Successfully connected to MongoDB Atlas at ${conn.connection.host}`);
  } catch (error) {
    console.error('Failed to establish initial MongoDB connection:', error);
  }
}

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection disconnected');
});
