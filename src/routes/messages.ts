import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  await fastify.ready();

  const consumer = fastify.rabbitmq.createConsumer(
    {
      queue: "transactions",
      queueOptions: { durable: true },
    },
    async (msg: any) => {
      console.log("📨 Received message:", msg);
    }
  );
}
