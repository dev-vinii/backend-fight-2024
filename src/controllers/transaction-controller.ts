import { FastifyReply, FastifyRequest } from "fastify";

export async function transaction(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.send({ message: "pong" });
}
