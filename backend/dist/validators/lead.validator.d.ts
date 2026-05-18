import { z } from 'zod';
export declare const createLeadSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["New", "Contacted", "Qualified", "Lost"]>>;
    source: z.ZodEnum<["Website", "Instagram", "Referral"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    source: "Website" | "Instagram" | "Referral";
    status?: "New" | "Contacted" | "Qualified" | "Lost" | undefined;
}, {
    name: string;
    email: string;
    source: "Website" | "Instagram" | "Referral";
    status?: "New" | "Contacted" | "Qualified" | "Lost" | undefined;
}>;
export declare const updateLeadSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["New", "Contacted", "Qualified", "Lost"]>>;
    source: z.ZodOptional<z.ZodEnum<["Website", "Instagram", "Referral"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "New" | "Contacted" | "Qualified" | "Lost" | undefined;
    name?: string | undefined;
    email?: string | undefined;
    source?: "Website" | "Instagram" | "Referral" | undefined;
}, {
    status?: "New" | "Contacted" | "Qualified" | "Lost" | undefined;
    name?: string | undefined;
    email?: string | undefined;
    source?: "Website" | "Instagram" | "Referral" | undefined;
}>, {
    status?: "New" | "Contacted" | "Qualified" | "Lost" | undefined;
    name?: string | undefined;
    email?: string | undefined;
    source?: "Website" | "Instagram" | "Referral" | undefined;
}, {
    status?: "New" | "Contacted" | "Qualified" | "Lost" | undefined;
    name?: string | undefined;
    email?: string | undefined;
    source?: "Website" | "Instagram" | "Referral" | undefined;
}>;
export declare const leadListQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<["New", "Contacted", "Qualified", "Lost"]>>;
    source: z.ZodOptional<z.ZodEnum<["Website", "Instagram", "Referral"]>>;
    search: z.ZodOptional<z.ZodString>;
    sort: z.ZodOptional<z.ZodEnum<["latest", "oldest"]>>;
}, "strip", z.ZodTypeAny, {
    sort?: "latest" | "oldest" | undefined;
    status?: "New" | "Contacted" | "Qualified" | "Lost" | undefined;
    search?: string | undefined;
    source?: "Website" | "Instagram" | "Referral" | undefined;
    page?: number | undefined;
}, {
    sort?: "latest" | "oldest" | undefined;
    status?: "New" | "Contacted" | "Qualified" | "Lost" | undefined;
    search?: string | undefined;
    source?: "Website" | "Instagram" | "Referral" | undefined;
    page?: number | undefined;
}>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
//# sourceMappingURL=lead.validator.d.ts.map