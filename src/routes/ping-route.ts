import { FastifyInstance } from "fastify";

export default async function ping(fastify: FastifyInstance) {
  fastify.get(
    "/ping",
    {
      schema: {
        description: "Health check endpoint",
        tags: ["Health"],
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      reply.send({ message: "pong" });
    }
  );
}
