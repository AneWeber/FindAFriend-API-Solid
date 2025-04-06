import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { SearchOrgsUseCase } from "../search-orgs"; 

export function makeSearchOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const searchOrgsUseCase = new SearchOrgsUseCase(orgsRepository)

  return searchOrgsUseCase
}