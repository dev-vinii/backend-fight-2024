import { relations } from "drizzle-orm";
import { clients } from "./clients";
import { transactions } from "./transactions";

export const clientsRelations = relations(clients, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  client: one(clients, {
    fields: [transactions.clientId],
    references: [clients.id],
  }),
}));