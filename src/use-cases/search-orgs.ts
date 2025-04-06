import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface SearchOrgsUseCaseRequest {
  city: string
  page: number
}

interface SearchOrgsUseCaseResponse {
  orgs: Org[]
}

export class SearchOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    city,
    page,
  }: SearchOrgsUseCaseRequest): Promise<SearchOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyByCity(city, page)

    return { orgs }
  }
}