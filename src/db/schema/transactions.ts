import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientId: uuid("client_id").notNull(),
  value: integer("value").notNull(),
  type: varchar("type", { length: 1 }).notNull(),
  realizedAt: timestamp("realized_at").notNull().defaultNow(),
  description: varchar("description", { length: 10 }).notNull(),
});
