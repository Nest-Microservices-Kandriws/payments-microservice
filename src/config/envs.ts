import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    NODE_ENV: string;
    STRIPE_SECRET_KEY: string;
    PAYMENT_PROVIDER: string;
}

const envVarsSchema = joi.object({
    NODE_ENV: joi
        .string()
        .valid('development', 'production', 'test')
        .required(),
    PORT: joi.number().required(),
    STRIPE_SECRET_KEY: joi.string().required(),
    PAYMENT_PROVIDER: joi.string().required()
}).unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    PORT: envVars.PORT,
    NODE_ENV: envVars.NODE_ENV,
    STRIPE_SECRET_KEY: envVars.STRIPE_SECRET_KEY,
    PAYMENT_PROVIDER: envVars.PAYMENT_PROVIDER
};