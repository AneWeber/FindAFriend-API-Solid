import { PetsRepository } from "../pets-repository";
import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      environment: data.environment,
      org_id: data.org_id,
    }
    this.items.push(pet)

    return pet
  }
  
  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id) 

    if (!pet) {
      return null
    }
    
    return pet
  }

  async findManyByOrgId(orgId: string, page: number): Promise<Pet[] | null> {
    return this.items
    .filter((pet) => pet.org_id === orgId)
    .slice((page -1) *20, page *20)
  }

}