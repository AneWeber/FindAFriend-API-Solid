import { FastifyInstance } from "fastify";
import { register } from "./register-org.controller";
import { authenticate } from "./authenticate-org.controller";


export async function orgsRoutes(app:FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
}