import Joi from "joi";

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "any.required": "Name is required",
    }),

    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),

    age: Joi.number().min(0).messages({
        "number.base": "Age must be a number",
        "number.min": "Age cannot be negative",
    }),
})

export const getUserSchema = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        "string.length": "Invalid user ID",
        "string.hex": "Invalid user ID",
        "any.required": "User ID is required",
    }),
})

