"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Lead_1 = require("../models/Lead");
dotenv_1.default.config();
const SALT = 10;
const sampleLeads = [
    { name: 'Rahul Sharma', email: 'rahul@example.com', status: 'Qualified', source: 'Instagram' },
    { name: 'Priya Patel', email: 'priya@example.com', status: 'New', source: 'Website' },
    { name: 'Amit Kumar', email: 'amit@example.com', status: 'Contacted', source: 'Referral' },
    { name: 'Sneha Reddy', email: 'sneha@example.com', status: 'Lost', source: 'Website' },
    { name: 'Vikram Singh', email: 'vikram@example.com', status: 'Qualified', source: 'Referral' },
    { name: 'Ananya Iyer', email: 'ananya@example.com', status: 'New', source: 'Instagram' },
    { name: 'Karan Mehta', email: 'karan@example.com', status: 'Contacted', source: 'Website' },
    { name: 'Divya Nair', email: 'divya@example.com', status: 'Qualified', source: 'Instagram' },
    { name: 'Rohan Das', email: 'rohan@example.com', status: 'New', source: 'Referral' },
    { name: 'Meera Joshi', email: 'meera@example.com', status: 'Contacted', source: 'Website' },
    { name: 'Arjun Pillai', email: 'arjun@example.com', status: 'Lost', source: 'Instagram' },
    { name: 'Isha Gupta', email: 'isha@example.com', status: 'Qualified', source: 'Website' },
];
const run = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('MONGODB_URI is required');
        process.exit(1);
    }
    await mongoose_1.default.connect(uri);
    console.log('Connected — seeding...');
    await Lead_1.Lead.deleteMany({});
    await User_1.User.deleteMany({});
    const adminPass = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@123';
    const salesPass = process.env.SEED_SALES_PASSWORD ?? 'Sales@123';
    const admin = await User_1.User.create({
        name: 'Admin User',
        email: process.env.SEED_ADMIN_EMAIL ?? 'admin@smartleads.com',
        password: await bcryptjs_1.default.hash(adminPass, SALT),
        role: 'Admin',
    });
    const sales = await User_1.User.create({
        name: 'Sales Rep',
        email: process.env.SEED_SALES_EMAIL ?? 'sales@smartleads.com',
        password: await bcryptjs_1.default.hash(salesPass, SALT),
        role: 'Sales',
    });
    const adminLeads = sampleLeads.map((l) => ({ ...l, createdBy: admin._id }));
    const salesLeads = sampleLeads.slice(0, 4).map((l, i) => ({
        ...l,
        name: `${l.name} (Sales)`,
        email: `sales.${i}.${l.email}`,
        createdBy: sales._id,
    }));
    await Lead_1.Lead.insertMany([...adminLeads, ...salesLeads]);
    console.log('Seed complete.');
    console.log(`Admin: ${admin.email} / ${adminPass}`);
    console.log(`Sales: ${sales.email} / ${salesPass}`);
    await mongoose_1.default.disconnect();
};
run().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map