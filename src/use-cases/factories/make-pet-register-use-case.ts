import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PetRegisterUseCase } from "../pet-register";

export function makePetRegisterUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  
  const petRegisterUseCase = new PetRegisterUseCase(petsRepository, orgsRepository)

  return petRegisterUseCase
}