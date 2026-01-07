import z from 'zod';

const registrationsSchema = z.object({
    firstName: z.string().nonempty('First name is required'),

    lastName: z.string().nonempty('Last name is required'),

    username: z.string().nonempty("Username is required")
        .regex(/^[A-Za-z0-9_]+$/, 'Username may only contain letters, numbers, and underscores'),

    email: z.email('Invalid email address'),

    password: z.string().min(8, 'Password must be at least 8 characters long')
        .regex(/[A-ZÆØÅ]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-zæøå]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().nonempty('Please confirm your password'),

    birthday: z.coerce.date({
        invalid_type_error: 'Birthday is required',
    }).refine(date => {
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const month = today.getMonth() - date.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < date.getDate())) {
            age--;
        }

        return age >= 18;
    }, {
        message: 'You must be at least 18 years old',
    }),

    phone: z.string().refine(value => !value || /^[0-9]{8}$/.test(value), {
        message: 'Phone number must be 8 digits',
    }),
})
.superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            path: ['confirmPassword'],
            message: 'Passwords do not match',
        })
    }
})

export default registrationsSchema;