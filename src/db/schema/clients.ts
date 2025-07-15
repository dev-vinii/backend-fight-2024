import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  balance: integer("balance").notNull().default(0),
  limit: integer("limit").notNull().default(0),
  realized_at: timestamp("realized_at").notNull().defaultNow(),
});
