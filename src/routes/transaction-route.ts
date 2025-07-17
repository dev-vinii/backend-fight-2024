import { createTransaction } from "@/services/transaction-service";
import { FastifyInstance } from "fastify";

const transactionSchema = {
  type: "object",
  required: ["value", "type", "description"],
  properties: {
    value: { type: "number", minimum: 1 },
    type: { type: "string", enum: ["c", "d"] },
    description: { type: "string", minLength: 1, maxLength: 10 },
  },
};

const clientParamsSchema = {
  type: "object",
  required: ["clientId"],
  properties: {
    clientId: { type: "string" },
  },
};

export default async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/clients/:clientId/transaction",
    {
      schema: {
        description: "Create a new transaction for a client",
        tags: ["Transactions"],
        params: clientParamsSchema,
        body: transactionSchema,
        response: {
          200: {
            type: "object",
            properties: {
              limit: { type: "number" },
              balance: { type: "number" },
            },
          },
          404: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
          422: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { clientId } = request.params as { clientId: string };
        const { value, type, description } = request.body as {
          value: number;
          type: "c" | "d";
          description: string;
        };

        const result = await createTransaction(clientId, {
          value,
          type,
          description,
        });
        reply.send(result);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Client not found") {
            return reply.status(404).send({ error: "Client not found" });
          }
          if (error.message === "Insufficient balance") {
            return reply.status(422).send({ error: "Insufficient balance" });
          }
          return reply.status(500).send({ error: "Internal server error" });
        }
      }
    }
  );
}
