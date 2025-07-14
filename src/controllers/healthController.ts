import { FastifyReply, FastifyRequest } from "fastify";

export class HealthController {
  async healthCheck(request: FastifyRequest, reply: FastifyReply) {
    reply.send({ message: "Hello from Fastify with TypeScript!" });
  }
}