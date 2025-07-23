import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../db/schema";

declare module "fastify" {
  interface FastifyInstance {
    db: ReturnType<typeof drizzle<typeof schema>>;
  }
}