import { FastifyInstance } from "fastify";

import { registerPetController } from "./register-pet-controller";
import { searchPetController } from "./search-pet-controller";
import { getPetController } from "./get-pet-controller";

export async function petsRoutes(app:FastifyInstance) {
  app.post('/orgs/pets', registerPetController)
  app.get('/orgs/pets', searchPetController)
  app.get('/orgs/pets/:id', getPetController)
}