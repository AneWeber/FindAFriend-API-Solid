import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";
import { FindAllParams, PetsRepository } from "../pets-repository";
import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

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

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) => (params.energy_level ? item.energy_level === params.size : true))
      .filter((item) => (params.environment ? item.environment === params.size : true))

      return pets
  }

}