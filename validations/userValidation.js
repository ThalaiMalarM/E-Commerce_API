const { z } = require("zod");

const userRegisterSchemaZod = z.object({
    full_name: z
    .string({required_error: "Name is required"})
    .min(3, { message: "Name should be atleast 3 characters" })
    .max(15, { message: "Name is allowed maximum 15 characters" }),
    email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
    password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&?]{6,15}$/, {
        message: "Password must be atleast 6 characters and maximum 15 characters length and must contain atleast one letter, one digit and one special character"
    }),
    phone: z
    .string()
    .regex(/^\+\d{12}$/, {
        message: "Mobile number must be started with + followed by 2-digit country code and 10-digit phone number"
    }),
});

const userLoginSchemaZod = z.object({
    email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
    password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&?]{6,15}$/, {
        message: "Password must be atleast 6 characters and maximum 15 characters length and must contain atleast one letter, one digit and one special character"
    }),
});

module.exports = { userRegisterSchemaZod, userLoginSchemaZod };
