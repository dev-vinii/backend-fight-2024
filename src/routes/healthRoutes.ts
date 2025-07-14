import { FastifyInstance } from "fastify";
import { HealthController } from "../controllers/healthController";

export default async function healthRoutes(fastify: FastifyInstance) {
  const healthController = new HealthController();

  fastify.get("/", healthController.healthCheck.bind(healthController));
}
