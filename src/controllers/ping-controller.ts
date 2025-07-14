import { FastifyReply, FastifyRequest } from "fastify";

export class PingController {
  async ping(request: FastifyRequest, reply: FastifyReply) {
    reply.send({ message: "pong" });
  }
}
