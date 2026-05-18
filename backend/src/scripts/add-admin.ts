import path from 'path';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/User';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const SALT = 10;

const run = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is required');
    process.exit(1);
  }

  const email = process.env.ADMIN_EMAIL ?? 'gopala@gmail.com';
  const password = process.env.ADMIN_PASSWORD ?? 'gopala@123';
  const name = process.env.ADMIN_NAME ?? 'Gopala';

  await mongoose.connect(uri);

  const hashed = await bcrypt.hash(password, SALT);
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { name, email: email.toLowerCase(), password: hashed, role: 'Admin' },
    { upsert: true, new: true }
  );

  console.log(`Admin ready: ${user.email} (role: ${user.role})`);
  await mongoose.disconnect();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
