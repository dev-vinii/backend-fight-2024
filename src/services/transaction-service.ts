import { db } from "@/db/database";
import { clients, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";

interface CreateTransactionData {
  value: number;
  type: "c" | "d";
  description: string;
}

export async function createTransaction(
  clientId: string,
  { value, type, description }: CreateTransactionData
) {
  const client = await db.query.clients.findFirst({
    where: eq(clients.id, clientId),
  });

  if (!client) throw new Error("Client not found");

  if (type === "c") {
    client.balance += value;
  }

  if (type === "d") {
    const newBalance = client.balance - value;
    if (newBalance < -client.limit) throw new Error("Insufficient balance");
    client.balance = newBalance;
  }

  await db.insert(transactions).values({
    clientId,
    value,
    type,
    description,
  });

  return { limit: client.limit, balance: client.balance };
}
