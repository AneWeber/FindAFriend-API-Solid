import { FastifyInstance } from "fastify";
import { registerOrgController } from "./register-org-controller";
import { authenticateOrgController } from "./authenticate-org-controller";
import { searchOrgController } from "./search-org-controller";


export async function orgsRoutes(app:FastifyInstance) {
  app.post('/', registerOrgController)
  app.post('/sessions', authenticateOrgController)

  app.get('/search', searchOrgController)
}