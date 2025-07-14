import { FastifyInstance } from "fastify";
import { PingController } from "../controllers/ping-controller";

export default async function pin(fastify: FastifyInstance) {
  const pingController = new PingController();

  fastify.get("/", pingController.ping.bind(pingController));
}
