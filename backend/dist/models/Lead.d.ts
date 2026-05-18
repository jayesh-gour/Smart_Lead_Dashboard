import mongoose, { Document, Types } from 'mongoose';
import { LeadSource, LeadStatus } from '../types';
export interface ILead extends Document {
    name: string;
    email: string;
    status: LeadStatus;
    source: LeadSource;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Lead: mongoose.Model<ILead, {}, {}, {}, mongoose.Document<unknown, {}, ILead, {}, {}> & ILead & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Lead.d.ts.map