import { db } from "@/db/database";
import { clients, transactions } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";

export async function generateStatement(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const clientId = request.params.id;

    const client = await db.query.clients.findFirst({
      where: eq(clients.id, clientId),
    });

    if (!client) {
      return reply.status(404).send({ error: "Client not found" });
    }

    const clientTransactions = await db.query.transactions.findMany({
      where: eq(transactions.clientId, clientId),
      orderBy: desc(transactions.realizedAt),
    });

    const { balance, limit } = client;

    return reply.status(200).send({
      balance: {
        total: balance,
        date: new Date().toISOString(),
        limit,
      },
      last_transactions: clientTransactions?.map((transaction) => ({
        value: transaction.value,
        type: transaction.type,
        description: transaction.description,
        realizedAt: transaction.realizedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Error generating statement:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}
