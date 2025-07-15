import "dotenv/config";
import Fastify from "fastify";
import { join } from "path";
import { env } from "@/env";

const fastify = Fastify({
  logger: true,
});

// Auto-load routes
fastify.register(import("@fastify/autoload"), {
  dir: join(__dirname, "routes"),
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: env.PORT, host: env.HOST });
    console.log(`Server listening on ${env.HOST}:${env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
