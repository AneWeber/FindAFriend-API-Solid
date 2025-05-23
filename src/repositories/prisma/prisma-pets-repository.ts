import { prisma } from "@/lib/prisma";
import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { FindAllParams } from "../pets-repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
    return pet
  }

  async findManyByOrgId(orgId: string, page: number): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: orgId,
      },
      skip: (page -1) * 20,
      take: 20,
    })
    
    return pets
  }

  async findAll(parms: FindAllParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        name: parms.name,
        age: parms.age,
        size: parms.size,
        energy_level: parms.energy_level,
        environment: parms.environment,
        org: {
          city: {
            contains: parms.city,
            mode: 'insensitive'
          }
        }
      }
    })
    return pets
  }
  
}