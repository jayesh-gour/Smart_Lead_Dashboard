import { LeadQueryParams, LeadStatus, PaginationMeta, UserRole } from '../types';
import { CreateLeadInput, UpdateLeadInput } from '../validators/lead.validator';
export declare const createLead: (input: CreateLeadInput, userId: string) => Promise<{
    id: import("mongoose").Types.ObjectId;
    name: string;
    email: string;
    status: LeadStatus;
    source: import("../types").LeadSource;
    createdBy: import("mongoose").Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getLeads: (query: LeadQueryParams, userId: string, role: UserRole) => Promise<{
    leads: {
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        status: LeadStatus;
        source: import("../types").LeadSource;
        createdBy: import("mongoose").Types.ObjectId;
        createdAt: Date;
        updatedAt: Date;
    }[];
    meta: PaginationMeta;
}>;
export declare const getLeadById: (id: string, userId: string, role: UserRole) => Promise<{
    id: import("mongoose").Types.ObjectId;
    name: string;
    email: string;
    status: LeadStatus;
    source: import("../types").LeadSource;
    createdBy: import("mongoose").Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateLead: (id: string, input: UpdateLeadInput, userId: string, role: UserRole) => Promise<{
    id: import("mongoose").Types.ObjectId;
    name: string;
    email: string;
    status: LeadStatus;
    source: import("../types").LeadSource;
    createdBy: import("mongoose").Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteLead: (id: string, userId: string, role: UserRole) => Promise<void>;
export declare const getLeadStats: (userId: string, role: UserRole) => Promise<{
    total: number;
    byStatus: Record<LeadStatus, number>;
}>;
export declare const exportLeadsCsv: (query: LeadQueryParams, userId: string, role: UserRole) => Promise<string>;
//# sourceMappingURL=lead.service.d.ts.map