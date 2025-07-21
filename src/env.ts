import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  HOST: z.string().default("localhost"),
  RABBITMQ_URL: z.string().min(1, "RABBITMQ_URL is required"),
  MONGODB_URL: z.string().min(1, "MONGODB_URL is required"),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
