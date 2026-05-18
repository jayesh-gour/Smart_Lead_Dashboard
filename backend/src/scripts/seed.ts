import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { Lead } from '../models/Lead';

dotenv.config();

const SALT = 10;

const sampleLeads = [
  { name: 'Rahul Sharma', email: 'rahul@example.com', status: 'Qualified' as const, source: 'Instagram' as const },
  { name: 'Priya Patel', email: 'priya@example.com', status: 'New' as const, source: 'Website' as const },
  { name: 'Amit Kumar', email: 'amit@example.com', status: 'Contacted' as const, source: 'Referral' as const },
  { name: 'Sneha Reddy', email: 'sneha@example.com', status: 'Lost' as const, source: 'Website' as const },
  { name: 'Vikram Singh', email: 'vikram@example.com', status: 'Qualified' as const, source: 'Referral' as const },
  { name: 'Ananya Iyer', email: 'ananya@example.com', status: 'New' as const, source: 'Instagram' as const },
  { name: 'Karan Mehta', email: 'karan@example.com', status: 'Contacted' as const, source: 'Website' as const },
  { name: 'Divya Nair', email: 'divya@example.com', status: 'Qualified' as const, source: 'Instagram' as const },
  { name: 'Rohan Das', email: 'rohan@example.com', status: 'New' as const, source: 'Referral' as const },
  { name: 'Meera Joshi', email: 'meera@example.com', status: 'Contacted' as const, source: 'Website' as const },
  { name: 'Arjun Pillai', email: 'arjun@example.com', status: 'Lost' as const, source: 'Instagram' as const },
  { name: 'Isha Gupta', email: 'isha@example.com', status: 'Qualified' as const, source: 'Website' as const },
];

const run = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is required');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected — seeding...');

  await Lead.deleteMany({});
  await User.deleteMany({});

  const adminPass = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@123';
  const salesPass = process.env.SEED_SALES_PASSWORD ?? 'Sales@123';

  const admin = await User.create({
    name: 'Admin User',
    email: process.env.SEED_ADMIN_EMAIL ?? 'admin@smartleads.com',
    password: await bcrypt.hash(adminPass, SALT),
    role: 'Admin',
  });

  const sales = await User.create({
    name: 'Sales Rep',
    email: process.env.SEED_SALES_EMAIL ?? 'sales@smartleads.com',
    password: await bcrypt.hash(salesPass, SALT),
    role: 'Sales',
  });

  const adminLeads = sampleLeads.map((l) => ({ ...l, createdBy: admin._id }));
  const salesLeads = sampleLeads.slice(0, 4).map((l, i) => ({
    ...l,
    name: `${l.name} (Sales)`,
    email: `sales.${i}.${l.email}`,
    createdBy: sales._id,
  }));

  await Lead.insertMany([...adminLeads, ...salesLeads]);

  console.log('Seed complete.');
  console.log(`Admin: ${admin.email} / ${adminPass}`);
  console.log(`Sales: ${sales.email} / ${salesPass}`);
  await mongoose.disconnect();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
