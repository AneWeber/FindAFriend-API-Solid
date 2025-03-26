import { PetsRepository } from "@/repositories/pets-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgNotFoundError } from "./errors/org-not-found-error"; 
import { Pet } from "@prisma/client";

interface PetRegisterUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  environment: string
  org_id: string
}

interface PetRegisterUseCaseResponse {
  pet: Pet
}

export class PetRegisterUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute ({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    org_id,
  }: PetRegisterUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      org_id,
    })

    return {
      pet,
    }
  }
}