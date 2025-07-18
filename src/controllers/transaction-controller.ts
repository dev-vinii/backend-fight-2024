import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "@/db/database";
import { clients, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";

interface CreateTransactionData {
  value: number;
  type: "c" | "d";
  description: string;
}

interface TransactionParams {
  id: string;
}

export async function createTransaction(
  request: FastifyRequest<{
    Params: TransactionParams;
    Body: CreateTransactionData;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const { value, type, description } = request.body;

    const client = await db.query.clients.findFirst({
      where: eq(clients.id, id),
    });

    if (!client) {
      return reply.status(404).send({ error: "Client not found" });
    }

    if (type === "c") {
      client.balance += value;
    }

    if (type === "d") {
      const newBalance = client.balance - value;
      if (newBalance < -client.limit) {
        return reply.status(422).send({ error: "Insufficient balance" });
      }
      client.balance = newBalance;
    }

    await db
      .update(clients)
      .set({ balance: client.balance })
      .where(eq(clients.id, id));

    await db.insert(transactions).values({
      clientId: id,
      value,
      type,
      description,
    });

    reply.send({ limit: client.limit, balance: client.balance });
  } catch (error) {
    reply.status(500).send({ error: "Internal server error" });
  }
}