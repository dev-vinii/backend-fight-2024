import { generateStatement } from "@/controllers/statement-controller";
import { FastifyInstance } from "fastify";

export default async function statementRoutes(fastify: FastifyInstance) {
  const clientParamsSchema = {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  };

  fastify.get(
    "/clients/:id/statement",
    {
      schema: {
        description: "Get the statement of a client",
        tags: ["Statements"],
        params: clientParamsSchema,
        response: {
          200: {
            type: "object",
            properties: {
              balance: {
                type: "object",
                properties: {
                  total: { type: "number" },
                  date: { type: "string", format: "date-time" },
                  limit: { type: "number" },
                },
              },
              last_transactions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    value: { type: "number" },
                    type: { type: "string", enum: ["c", "d"] },
                    description: { type: "string" },
                    realizedAt: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
          404: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
    generateStatement
  );
}
