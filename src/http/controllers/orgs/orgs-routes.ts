import { FastifyInstance } from "fastify";
import { registerOrgController } from "./register-org-controller";
import { authenticateOrgController } from "./authenticate-org-controller";
import { searchOrgController } from "./search-org-controller";
import { refresh } from "./refresh-controller";


export async function orgsRoutes(app:FastifyInstance) {
  app.post('/', registerOrgController)
  app.post('/authenticate', authenticateOrgController)

  app.patch('/token/refresh', refresh)
  
  app.get('/search', searchOrgController)
}