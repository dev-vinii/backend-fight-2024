// import { FastifyInstance } from "fastify";

// export default async function statementRoutes(fastify: FastifyInstance) {
//   const clientParamsSchema = {
//     type: "object",
//     required: ["clientId"],
//     properties: {
//       clientId: { type: "string" },
//     },
//   };

//   fastify.get(
//     "/clients/:clientId/statement",
//     {
//       schema: {
//         description: "Get the statement of a client",
//         tags: ["Statements"],
//         params: clientParamsSchema,
//         response: {
//           200: {
//             type: "object",
//             properties: {
//               transactions: {
//                 type: "array",
//                 items: {
//                   type: "object",
//                   properties: {
//                     value: { type: "number" },
//                     type: { type: "string", enum: ["c", "d"] },
//                     description: { type: "string" },
//                     date: { type: "string", format: "date-time" },
//                   },
//                 },
//               },
//               balance: { type: "number" },
//             },
//           },
//           404: {
//             type: "object",
//             properties: {
//               error: { type: "string" },
//             },
//           },
//         },
//       },
//     },
//   }
