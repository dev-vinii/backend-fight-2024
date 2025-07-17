import { db } from "@/db/database";
import { clients, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";

export async function generateStatement(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  const client = await db.query.clients.findFirst({
    where: eq(clients.id, request.params.id),
  });

  if (!client) {
    return reply.status(404).send({ error: "Client not found" });
  }

  const clientTransactions = await db.query.transactions.findMany({
    where: eq(transactions.clientId, request.params.id),
    orderBy: (t) => t.realizedAt,
  });
}

// {
//   "saldo": {
//     "total": -9098,
//     "data_extrato": "2024-01-17T02:34:41.217753Z",
//     "limite": 100000
//   },
//   "ultimas_transacoes": [
//     {
//       "valor": 10,
//       "tipo": "c",
//       "descricao": "descricao",
//       "realizada_em": "2024-01-17T02:34:38.543030Z"
//     },
//     {
//       "valor": 90000,
//       "tipo": "d",
//       "descricao": "descricao",
//       "realizada_em": "2024-01-17T02:34:38.543030Z"
//     }
//   ]
// }
