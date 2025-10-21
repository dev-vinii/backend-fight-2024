import { env } from "@/env";
import fastifyAutoload from "@fastify/autoload";
import fastifyMongoDB from "@fastify/mongodb";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import fastifyRabbit from "fastify-rabbitmq";
import { join } from "path";
import { logger } from "./utils/logger";

const fastify = Fastify({
  logger: true,
});

fastify
  .register(fastifyRabbit, {
    connection: env.RABBITMQ_URL,
  })
  .after((err) => {
    if (err) {
      return logger.error(`❌ RabbitMQ connection failed: ${err.message}`);
    }
    return logger.info("✅ RabbitMQ connected successfully");
  });

fastify
  .register(fastifyMongoDB, {
    forceClose: true,
    url: env.MONGODB_URL,
  })
  .after((err) => {
    if (err) {
      return logger.error(`❌ MongoDB connection failed: ${err.message}`);
    }
    return logger.info("✅ MongoDB connected successfully");
  });

fastify.register(fastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "🥊 Backend Fight 2024 API",
      description: "API para a Rinha de Backend 2024",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Development server",
      },
    ],
  },
});

fastify.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
});

fastify.register(fastifyAutoload, {
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
