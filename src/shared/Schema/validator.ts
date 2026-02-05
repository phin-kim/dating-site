import * as z from 'zod';
/**
 * shared auth schemas used in BOTH frontend + backend
 */
export const registerBaseSchema = z.object({
    displayName: z.string().trim().min(2, 'Name must be atleast 2 characters'),
    email: z
        .string()
        .trim()
        .pipe(z.email({ error: 'Invalid email address' })),
    password: z
        .string()
        .min(8, { error: 'Password must be atleast 8 characters' }),
});

export const registerSchemaFrontend = registerBaseSchema
    .extend({
        confirmPassword: z.string().min(1, 'PLease confrim your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password dont match',
        path: ['confimPassword'],
    });
export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .pipe(z.email({ error: 'Invalid email address' })),
    password: z.string().min(1, 'Password is required'),
});
export type RegisterFormInput = z.infer<typeof registerSchemaFrontend>;
export type RegisterRequestInput = z.infer<typeof registerBaseSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
