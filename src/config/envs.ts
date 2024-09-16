import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    NODE_ENV: string;
    STRIPE_SECRET_KEY: string;
    PAYMENT_PROVIDER: string;
    STRIPE_SUCCESS_URL: string;
    STRIPE_CANCEL_URL: string;
    STRIPE_ENDPOINT_SECRET: string;
    NATS_SERVERS: string[];
}

const envVarsSchema = joi.object({
    NODE_ENV: joi
        .string()
        .valid('development', 'production', 'test')
        .required(),
    PORT: joi.number().required(),
    STRIPE_SECRET_KEY: joi.string().required(),
    PAYMENT_PROVIDER: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().uri({ scheme: ['http', 'https'] }).required(),
    STRIPE_CANCEL_URL: joi.string().uri({ scheme: ['http', 'https'] }).required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required()
}).unknown(true);

const { error, value } = envVarsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    PORT: envVars.PORT,
    NODE_ENV: envVars.NODE_ENV,
    STRIPE_SECRET_KEY: envVars.STRIPE_SECRET_KEY,
    PAYMENT_PROVIDER: envVars.PAYMENT_PROVIDER,
    STRIPE_SUCCESS_URL: envVars.STRIPE_SUCCESS_URL,
    STRIPE_CANCEL_URL: envVars.STRIPE_CANCEL_URL,
    STRIPE_ENDPOINT_SECRET: envVars.STRIPE_ENDPOINT_SECRET,
    NATS_SERVERS: envVars.NATS_SERVERS
};