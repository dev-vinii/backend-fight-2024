import Fastify from "fastify";
import { join } from "path";

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
    const port = 8080;
    await fastify.listen({ port, host: "localhost" });
    console.log(`Server listening on port: ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
