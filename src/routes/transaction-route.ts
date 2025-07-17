import { FastifyInstance } from "fastify";
import { createTransaction } from "@/controllers/transaction-controller";

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
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};

export default async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/clients/:id/transaction",
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
    createTransaction
  );
}
