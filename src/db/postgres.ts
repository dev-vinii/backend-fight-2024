import { env } from "@/env";
import { logger } from "@/utils/logger";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

logger.info("✅ Connecting to PostgreSQL...");

export const db = drizzle(env.DATABASE_URL, { schema });

logger.info("✅ PostgreSQL connection established");
