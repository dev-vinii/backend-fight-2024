import { FastifyInstance } from "fastify";

export default async function ping(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    reply.send({ message: "pong" });
  });
}
